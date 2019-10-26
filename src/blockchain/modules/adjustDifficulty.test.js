import adjustDifficulty from './adjustDifficulty';

describe('adjustDifficulty()', () => {
  let block;

  beforeEach(() => {
    block = { timestamp: Date.now(), difficulty: 3 };
  });

  it('lowers the difficulty for slowly mined blocks', () => {
    expect(adjustDifficulty(block, block.timestamp + 60000)).toEqual(block.difficulty - 1);
  });

  it('increases the difficulty for quick mined blocks', () => {
    expect(adjustDifficulty(block, block.timestamp + 1000)).toEqual(block.difficulty + 1);
  });
});
