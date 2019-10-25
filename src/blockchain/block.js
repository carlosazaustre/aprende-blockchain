import { SHA256 } from 'crypto-js';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, previousHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  static get genesis() {
    const timestamp = new Date(2000, 0, 1).getTime();
    return new this(timestamp, undefined, 'g3n3s1s-ha$h', 'i like ramen.');
  }

  static mine(previousBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    let hash;
    let nonce = 0;
    let timestamp;

    do {
      timestamp = Date.now();
      nonce += 1;
      hash = Block.hash(timestamp, previousHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, previousHash, hash, data);
  }
 
  static hash(timestamp, previousHash, data, nonce) {
    return SHA256(`${timestamp}${previousHash}${data}${nonce}`).toString();
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce,
    } = this;

    return `Block -
      timestamp       : ${timestamp}
      previousHash    : ${previousHash}
      hash            : ${hash}
      data            : ${data}
      nonce           : ${nonce}
    `;
  }
}

export default Block;
