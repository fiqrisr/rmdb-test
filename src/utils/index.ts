import { FastAverageColor } from "fast-average-color";

export const getImageDominantColor = async (imageUrl: string) => {
  const fac = new FastAverageColor();

  try {
    return await fac.getColorAsync(imageUrl);
  } catch (e) {
    console.error(e);
  }
};
