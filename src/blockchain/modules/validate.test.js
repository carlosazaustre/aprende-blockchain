import Blockchain from '../blockchain';
import validate from './validate';
import Block from '../block';

describe('validate()', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('validates valid chain', () => {
    blockchain.addBlock('bl0ck-1');
    blockchain.addBlock('bl0ck-2');

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'b4d-d4t4';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid Genesis block.');
  });

  it('invalidates a chain with a corrupt previousHash within a block', () => {
    blockchain.addBlock('bl0ck-1');
    blockchain.blocks[1].previousHash = 'b4d-h4sh';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid previous hash.');
  });

  it('invalidates a chain with a corrupt hash within a block', () => {
    blockchain.addBlock('bl0ck-1');
    blockchain.blocks[1].hash = 'b4d-h4sh';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid hash.');
  });
});
