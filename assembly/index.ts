export const IMAGE_DATA_ID = idof<Uint8Array>();

export function processImage(data: Uint8Array, width: i32, height: i32): void {

  const gray = new Uint8Array(width * height);

  // 1️⃣ Convert to grayscale
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // stronger grayscale contrast
    gray[j] = <u8>((0.3 * r + 0.59 * g + 0.11 * b) as i32);
  }

  // 2️⃣ Strong Sobel edge detection
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {

      const i = y * width + x;

      const gx =
        -gray[i - width - 1] - 2 * gray[i - 1] - gray[i + width - 1] +
         gray[i - width + 1] + 2 * gray[i + 1] + gray[i + width + 1];

      const gy =
        -gray[i - width - 1] - 2 * gray[i - width] - gray[i - width + 1] +
         gray[i + width - 1] + 2 * gray[i + width] + gray[i + width + 1];

      let magnitude = Mathf.abs(gx) + Mathf.abs(gy);  // stronger than sqrt

      // 🔥 Boost contrast
      magnitude = magnitude * 2;

      if (magnitude > 255) magnitude = 255;

      // 🎯 Apply threshold to make lines darker
      let color: u8;

      if (magnitude > 80) {
        color = 0;      // strong edge → black
      } else {
        color = 255;    // background → white
      }

      const pixelIndex = i * 4;

      data[pixelIndex]     = color;
      data[pixelIndex + 1] = color;
      data[pixelIndex + 2] = color;
      // keep alpha unchanged
    }
  }
}