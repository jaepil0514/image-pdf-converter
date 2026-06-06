import { describe, it, expect, vi } from "vitest";
import { fileConverterRouter } from "./fileConverter";

describe("File Converter Router", () => {
  it("should have convertImage procedure", () => {
    expect(fileConverterRouter).toBeDefined();
    expect(fileConverterRouter._def.procedures).toHaveProperty("convertImage");
  });

  it("should have convertDocument procedure", () => {
    expect(fileConverterRouter._def.procedures).toHaveProperty("convertDocument");
  });

  it("should have convertDocumentToPdf procedure", () => {
    expect(fileConverterRouter._def.procedures).toHaveProperty("convertDocumentToPdf");
  });
});
