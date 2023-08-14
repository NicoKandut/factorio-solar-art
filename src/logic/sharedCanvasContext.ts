export const sharedCanvas = document.createElement("canvas");
const _context = sharedCanvas.getContext("2d", { willReadFrequently: true });

if (!_context) {
  throw new Error("Failed to create canvas context");
}

export const sharedCanvasContext = _context;
