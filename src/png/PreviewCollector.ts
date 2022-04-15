import { EntityType, paletteIndexOf, sizes, TileType } from "../types/factorio";

export class PreviewCollector {
  data: Uint8Array;

  constructor(private width: number, private height: number) {
    this.data = new Uint8Array(width * height);
  }

  writeRect(name: EntityType, x: number, y: number) {
    const size = sizes[name];
    for (let iy = 0; iy < size; ++iy) {
      for (let ix = 0; ix < size; ++ix) {
        this.data[(y + iy) * this.width + x + ix] = paletteIndexOf[name];
      }
    }
  }

  writePixel(name: TileType | EntityType, x: number, y: number) {
    this.data[y * this.width + x] = paletteIndexOf[name];
  }
}
