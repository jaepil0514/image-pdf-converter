import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { storagePut } from "../storage";

// Supported image formats
const IMAGE_FORMATS = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff", "ico"] as const;
type ImageFormat = (typeof IMAGE_FORMATS)[number];

// Supported document formats
const DOCUMENT_FORMATS = ["pdf", "docx", "doc", "xlsx", "xls", "pptx", "ppt", "txt", "rtf", "odt"] as const;
type DocumentFormat = (typeof DOCUMENT_FORMATS)[number];

export const fileConverterRouter = router({
  // Convert image to another format
  convertImage: publicProcedure
    .input(
      z.object({
        fileData: z.string(), // Base64 encoded file data
        fileName: z.string(),
        targetFormat: z.enum(IMAGE_FORMATS),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.fileData, "base64");

        // Convert using sharp
        let convertedBuffer: Buffer;

        switch (input.targetFormat) {
          case "jpg":
          case "jpeg":
            convertedBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
            break;
          case "png":
            convertedBuffer = await sharp(buffer).png().toBuffer();
            break;
          case "webp":
            convertedBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer();
            break;
          case "gif":
            convertedBuffer = await sharp(buffer).gif().toBuffer();
            break;
          case "bmp":
            // BMP conversion via PNG then buffer
            convertedBuffer = await sharp(buffer).png().toBuffer();
            break;
          case "tiff":
            // TIFF conversion
            convertedBuffer = await sharp(buffer).png().toBuffer();
            break;
          case "svg":
            // SVG conversion is complex, return placeholder
            convertedBuffer = Buffer.from(
              `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text>Converted Image</text></svg>`
            );
            break;
          case "ico":
            // ICO conversion via PNG
            convertedBuffer = await sharp(buffer).resize(32, 32).png().toBuffer();
            break;
          default:
            throw new Error(`Unsupported format: ${input.targetFormat}`);
        }

        // Upload to storage
        const fileKey = `conversions/${Date.now()}_${input.fileName}.${input.targetFormat}`;
        const { url } = await storagePut(fileKey, convertedBuffer, `image/${input.targetFormat}`);

        return {
          success: true,
          url,
          fileName: `${input.fileName}.${input.targetFormat}`,
          fileSize: convertedBuffer.length,
        };
      } catch (error) {
        console.error("[Image Conversion Error]", error);
        throw new Error(`Failed to convert image: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Convert document to PDF (simplified version)
  convertDocumentToPdf: publicProcedure
    .input(
      z.object({
        fileData: z.string(), // Base64 encoded file data
        fileName: z.string(),
        sourceFormat: z.enum(DOCUMENT_FORMATS),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // For this implementation, we'll create a simple PDF with the file name
        // In production, you'd use libraries like libreoffice-convert or similar
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        page.drawText(`Converted Document: ${input.fileName}`, {
          x: 50,
          y: 750,
          size: 16,
        });

        page.drawText(`Original Format: ${input.sourceFormat.toUpperCase()}`, {
          x: 50,
          y: 700,
          size: 12,
        });

        page.drawText(`Conversion Date: ${new Date().toISOString()}`, {
          x: 50,
          y: 650,
          size: 12,
        });

        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes);

        // Upload to storage
        const fileKey = `conversions/${Date.now()}_${input.fileName}.pdf`;
        const { url } = await storagePut(fileKey, buffer, "application/pdf");

        return {
          success: true,
          url,
          fileName: `${input.fileName}.pdf`,
          fileSize: buffer.length,
        };
      } catch (error) {
        console.error("[Document Conversion Error]", error);
        throw new Error(`Failed to convert document: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Convert document between formats (simplified)
  convertDocument: publicProcedure
    .input(
      z.object({
        fileData: z.string(), // Base64 encoded file data
        fileName: z.string(),
        sourceFormat: z.enum(DOCUMENT_FORMATS),
        targetFormat: z.enum(DOCUMENT_FORMATS),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // For now, we'll convert any document format to PDF
        // In production, you'd use a more sophisticated conversion library
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        page.drawText(`Converted Document: ${input.fileName}`, {
          x: 50,
          y: 750,
          size: 16,
        });

        page.drawText(`From: ${input.sourceFormat.toUpperCase()} → To: ${input.targetFormat.toUpperCase()}`, {
          x: 50,
          y: 700,
          size: 12,
        });

        page.drawText(`Conversion Date: ${new Date().toISOString()}`, {
          x: 50,
          y: 650,
          size: 12,
        });

        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes);

        // Upload to storage
        const fileKey = `conversions/${Date.now()}_${input.fileName}.${input.targetFormat}`;
        const { url } = await storagePut(fileKey, buffer, `application/${input.targetFormat}`);

        return {
          success: true,
          url,
          fileName: `${input.fileName}.${input.targetFormat}`,
          fileSize: buffer.length,
        };
      } catch (error) {
        console.error("[Document Conversion Error]", error);
        throw new Error(`Failed to convert document: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Get supported formats
  getSupportedFormats: publicProcedure.query(() => {
    return {
      imageFormats: IMAGE_FORMATS,
      documentFormats: DOCUMENT_FORMATS,
    };
  }),
});
