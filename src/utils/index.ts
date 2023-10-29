import { FastAverageColor } from "fast-average-color";

export const getImageDominantColor = async (imageUrl: string) => {
  const fac = new FastAverageColor();

  try {
    return await fac.getColorAsync(imageUrl);
  } catch (e) {
    console.error(e);
  }
};

export const calcTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
