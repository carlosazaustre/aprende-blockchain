import { SHA256 } from 'crypto-js';
import adjustDifficulty from './modules/adjustDifficulty';
import genHash from '../modules/hash';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = new Date(2000, 0, 1).getTime();
    return new this(timestamp, undefined, 'g3n3s1s-ha$h', 'i like ramen.', 0, DIFFICULTY);
  }

  static mine(previousBlock, data) {
    const { hash: previousHash } = previousBlock;
    let hash;
    let nonce = 0;
    let timestamp;
    let { difficulty } = previousBlock;

    do {
      timestamp = Date.now();
      nonce += 1;
      difficulty = adjustDifficulty(previousBlock, timestamp);
      hash = Block.hash(timestamp, previousHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, previousHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, previousHash, data, nonce, difficulty) {
    return genHash(`${timestamp}${previousHash}${data}${nonce}${difficulty}`);
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce, difficulty,
    } = this;

    return `Block -
      timestamp       : ${timestamp}
      previousHash    : ${previousHash}
      hash            : ${hash}
      data            : ${data}
      nonce           : ${nonce}
      difficulty      : ${difficulty}
    `;
  }
}

export { DIFFICULTY };
export default Block;
