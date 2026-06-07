import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import sharp from "sharp";
import { storagePut } from "../storage";

// Supported image formats
const IMAGE_FORMATS = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "ico"] as const;
type ImageFormat = (typeof IMAGE_FORMATS)[number];

// Supported document formats (placeholder - not yet implemented)
const DOCUMENT_FORMATS = ["pdf", "docx", "doc", "xlsx", "xls", "pptx", "ppt", "txt", "rtf", "odt"] as const;
type DocumentFormat = (typeof DOCUMENT_FORMATS)[number];

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/tiff",
  "image/x-icon",
];

/**
 * Validate base64 string
 */
function isValidBase64(str: string): boolean {
  try {
    return Buffer.from(str, "base64").toString("base64") === str;
  } catch {
    return false;
  }
}

/**
 * Sanitize filename to prevent directory traversal and invalid characters
 */
function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 255);
}

/**
 * Attempt to recover from image format issues by converting to PNG first
 */
async function recoverImageBuffer(buffer: Buffer): Promise<Buffer> {
  try {
    // Try to convert to PNG as an intermediate format
    // This helps with HEIF, corrupted, or unsupported formats
    const recovered = await sharp(buffer)
      .png({ progressive: true })
      .toBuffer();
    return recovered as Buffer;
  } catch (error) {
    console.error("[Image Recovery] Failed to convert to PNG:", error);
    throw new Error(`Unable to process image: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export const fileConverterRouter = router({
  // Convert image to another format
  convertImage: publicProcedure
    .input(
      z.object({
        fileData: z.string(), // Base64 encoded file data
        fileName: z.string().min(1).max(255),
        targetFormat: z.enum(IMAGE_FORMATS),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate base64 input
        if (!isValidBase64(input.fileData)) {
          throw new Error("Invalid base64 encoding");
        }

        // Decode base64 to buffer
        let buffer = Buffer.from(input.fileData, "base64");

        // Check file size
        if (buffer.length > MAX_FILE_SIZE) {
          throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        if (buffer.length === 0) {
          throw new Error("File is empty");
        }

        // Try to detect format issues early and recover
        let sharpInstance: sharp.Sharp;
        try {
          sharpInstance = sharp(buffer);
          // Try to get metadata to detect format issues
          await sharpInstance.metadata();
        } catch (metadataError) {
          // If metadata detection fails, attempt recovery
          console.warn(
            "[Image Conversion] Metadata detection failed, attempting format recovery",
            metadataError instanceof Error ? metadataError.message : "Unknown error"
          );
          try {
            buffer = (await recoverImageBuffer(buffer)) as any;
            sharpInstance = sharp(buffer);
          } catch (recoveryError) {
            console.error("[Image Conversion] Recovery failed:", recoveryError);
            throw new Error(
              `Unable to process image format: ${recoveryError instanceof Error ? recoveryError.message : "Unknown error"}`
            );
          }
        }

        // Convert using sharp
        let convertedBuffer: Buffer;

        switch (input.targetFormat) {
          case "jpg":
          case "jpeg":
            convertedBuffer = await sharpInstance
              .jpeg({ quality: 90, progressive: true })
              .toBuffer();
            break;
          case "png":
            convertedBuffer = await sharpInstance
              .png({ progressive: true })
              .toBuffer();
            break;
          case "webp":
            convertedBuffer = await sharpInstance
              .webp({ quality: 90 })
              .toBuffer();
            break;
          case "gif":
            convertedBuffer = await sharpInstance
              .gif()
              .toBuffer();
            break;
          case "bmp":
            // BMP conversion via PNG then buffer
            convertedBuffer = await sharpInstance
              .png()
              .toBuffer();
            break;
          case "tiff":
            // TIFF conversion
            convertedBuffer = await sharpInstance
              .tiff({ compression: "lzw" })
              .toBuffer();
            break;
          case "ico":
            // ICO conversion via PNG
            convertedBuffer = await sharpInstance
              .resize(32, 32)
              .png()
              .toBuffer();
            break;
          default:
            throw new Error(`Unsupported format: ${input.targetFormat}`);
        }

        // Sanitize filename
        const sanitizedFileName = sanitizeFileName(input.fileName);

        // Upload to storage
        const fileKey = `conversions/${Date.now()}_${sanitizedFileName}.${input.targetFormat}`;
        const { url } = await storagePut(fileKey, convertedBuffer, `image/${input.targetFormat}`);

        return {
          success: true,
          url,
          fileName: `${sanitizedFileName}.${input.targetFormat}`,
          fileSize: convertedBuffer.length,
        };
      } catch (error) {
        console.error("[Image Conversion Error]", error);
        throw new Error(`Failed to convert image: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Convert document to PDF (not yet implemented)
  convertDocumentToPdf: publicProcedure
    .input(
      z.object({
        fileData: z.string(),
        fileName: z.string(),
        sourceFormat: z.enum(DOCUMENT_FORMATS),
      })
    )
    .mutation(async () => {
      throw new Error("Document conversion is coming soon. This feature is not yet available.");
    }),

  // Convert document between formats (not yet implemented)
  convertDocument: publicProcedure
    .input(
      z.object({
        fileData: z.string(),
        fileName: z.string(),
        sourceFormat: z.enum(DOCUMENT_FORMATS),
        targetFormat: z.enum(DOCUMENT_FORMATS),
      })
    )
    .mutation(async () => {
      throw new Error("Document conversion is coming soon. This feature is not yet available.");
    }),

  // Get supported formats
  getSupportedFormats: publicProcedure.query(() => {
    return {
      imageFormats: IMAGE_FORMATS,
      documentFormats: DOCUMENT_FORMATS,
      maxFileSize: MAX_FILE_SIZE,
      status: {
        imageConversion: "supported",
        documentConversion: "coming_soon",
      },
    };
  }),
});
