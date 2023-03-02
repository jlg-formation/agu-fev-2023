import { v4 } from 'uuid';

export const generateId = () => {
  return v4();
};

export const sleep = (delayMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
};
