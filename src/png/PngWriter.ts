import { crc32 } from "./crc32";
import { deflate } from "pako";
import { palette } from "../types/factorio";

/**
 * PNG chunk types
 * @see http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html
 */
type ChunkType = "IHDR" | "PLTE" | "IDAT" | "IEND" | "tRNS";

const strToCharCodeArray = (str: string) => {
  const result = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) {
    result[i] = str.charCodeAt(i);
  }
  return result;
};

const chunkTypeLookup: Record<ChunkType, Uint8Array> = {
  IHDR: strToCharCodeArray("IHDR"),
  PLTE: strToCharCodeArray("PLTE"),
  IDAT: strToCharCodeArray("IDAT"),
  IEND: strToCharCodeArray("IEND"),
  tRNS: strToCharCodeArray("tRNS"),
};

const paletteData = new Uint8Array(palette.length * 3);
for (let i = 0; i < palette.length; ++i) {
  paletteData[i * 3 + 0] = palette[i][0];
  paletteData[i * 3 + 1] = palette[i][1];
  paletteData[i * 3 + 2] = palette[i][2];
}

const transparencyData = new Uint8Array(palette.length);
for (let i = 0; i < palette.length; ++i) {
  transparencyData[i] = palette[i][3];
}

export class PngWriter {
  offset: number = 0;
  array: Uint8Array = new Uint8Array();

  /**
   * Return a usable url to the generated PNG
   * @returns the url to create PNG.
   */
  getUrl() {
    const blob = new Blob([this.array], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  /**
   * Generates a PNG file
   * @param width the pixel-width of the image
   * @param height the pixel-height of the image
   * @param data palette index for each pixel in the image
   * @see palette
   */
  writeImage(width: number, height: number, data: Uint8Array) {
    const imageData = new Uint8Array(data.length + height);
    let i = 0;
    for (let y = 0; y < height; ++y) {
      imageData[i++] = 0; // filter byte
      for (let x = 0; x < width; ++x) {
        imageData[i++] = data[y * width + x];
      }
    }
    const compressed = deflate(imageData);

    this.array = new Uint8Array(
      8 + // signature
        12 + // header metadata
        13 + // header
        12 + // palette metadata
        12 + // transparency metadata
        palette.length * 4 + // palette + transparency
        12 + // data metadata
        compressed.length + // data
        12 // end metadata
    );
    this.writeSignature();
    this.writeHeader(width, height);
    this.writePalette();
    this.writeTransparency();
    this.writeData(compressed);
    this.writeEnd();
  }

  private writeSignature() {
    this.array[this.offset++] = 137;
    this.array[this.offset++] = 80;
    this.array[this.offset++] = 78;
    this.array[this.offset++] = 71;
    this.array[this.offset++] = 13;
    this.array[this.offset++] = 10;
    this.array[this.offset++] = 26;
    this.array[this.offset++] = 10;
  }

  private writeHeader(width: number, height: number) {
    const headerData = new Uint8Array(13);
    headerData[0] = (width >> 24) & 255;
    headerData[1] = (width >> 16) & 255;
    headerData[2] = (width >> 8) & 255;
    headerData[3] = width & 255;
    headerData[4] = (height >> 24) & 255;
    headerData[5] = (height >> 16) & 255;
    headerData[6] = (height >> 8) & 255;
    headerData[7] = height & 255;
    headerData[8] = 8; // 8 bits for palette indices
    headerData[9] = 3; // use palette
    headerData[10] = 0;
    headerData[11] = 0;
    headerData[12] = 0;

    this.writeChunk("IHDR", headerData);
  }

  private writePalette() {
    this.writeChunk("PLTE", paletteData);
  }

  private writeTransparency() {
    this.writeChunk("tRNS", transparencyData);
  }

  private writeData(data: Uint8Array) {
    this.writeChunk("IDAT", data);
  }

  private writeEnd() {
    this.writeChunk("IEND", new Uint8Array(0));
  }

  private writeChunk(type: ChunkType, data: Uint8Array) {
    // 4 bytes for length
    this.writeUint32(data.length);

    const crcFrom = this.offset;

    // 4 bytes for type
    const typeArr = chunkTypeLookup[type];
    this.array[this.offset++] = typeArr[0];
    this.array[this.offset++] = typeArr[1];
    this.array[this.offset++] = typeArr[2];
    this.array[this.offset++] = typeArr[3];

    // data
    for (let i = 0; i < data.length; ++i) {
      this.array[this.offset++] = data[i];
    }

    // 4 bytes for crc
    const crcTo = this.offset;
    const checksum = crc32(this.array, crcFrom, crcTo - crcFrom);
    this.writeUint32(checksum);
  }

  private writeUint32(value: number) {
    this.array[this.offset++] = (value >> 24) & 255;
    this.array[this.offset++] = (value >> 16) & 255;
    this.array[this.offset++] = (value >> 8) & 255;
    this.array[this.offset++] = value & 255;
  }
}
