import { RanobeTop } from '../types/ranobe';

const groupIntoChunks = (array: RanobeTop[], chunkSize: number): Array<RanobeTop[]> => {
  const output: RanobeTop[][] = [];
  let currentChunk: RanobeTop[] = [];

  array.forEach((item, index) => {
    currentChunk.push(item);

    if ((index + 1) % chunkSize === 0 || index === array.length - 1) {
      output.push(currentChunk);
      currentChunk = [];
    }
  });

  return output;
};

export default groupIntoChunks;
