import Block, { DIFFICULTY } from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 't3$t-d4t4';
    hash = 'h4$h';
    nonce = 128;
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.nonce).not.toEqual(0);
    expect(block.data).toEqual(data);
  });

  it('use static hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data, nonce);
    const hashOutput = 'd53e819003111e42627e9e8b85947688a63ff3df53952cfd24f4e619064e7e47';

    expect(hash).toEqual(hashOutput);
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock, data);
    console.log(block.toString());

    expect(typeof block.toString()).toEqual('string');
  });
});
