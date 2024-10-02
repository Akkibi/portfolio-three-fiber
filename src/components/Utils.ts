import { LocationState } from "../Types";

export function progressScale(progress: number) {
  return Math.atan(-1 * progress ** 2) * 0.5 + 2;
}

export function progressNavScale(progress: number) {
  return Math.atan(-0.1 * progress ** 2) * 10 + 20;
}

export const progressPosition = (progress: number) => {
  return Math.atan(progress) * 8 + progress * 0.5;
};

export const isOpenFunction = (location: LocationState, name: string) => {
  return location.pathname.split("/")[1] == name;
};
