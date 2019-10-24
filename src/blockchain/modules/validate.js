import Block from '../block';

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;

  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Invalid Genesis block.');

  for (let i = 0; i < blocks.length; i += 1) {
    const {
      timestamp, previousHash, hash, data,
    } = blocks[i];
    const previousBlock = blockchain[i];

    if (previousHash !== previousBlock.hash) throw Error('Invalid previous hash.');
    if (hash !== Block.hash(timestamp, previousHash, data)) throw Error('Invalid hash.');
  }

  return true;
};
