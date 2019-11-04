import MemoryPool from './memoryPool';
import Wallet, { Transaction } from '../wallet';

describe('MemoryPool', () => {
  let memoryPool;
  let wallet;
  let transaction;

  beforeEach(() => {
    memoryPool = new MemoryPool();
    wallet = new Wallet();
    transaction = Transaction.create(wallet, 'r4nd0m-4ddr3ss', 5);
    memoryPool.addOrUpdate(transaction);
  });

  it('has one transaction', () => {
    expect(memoryPool.transactions.length).toEqual(1);
  });

  it('adds a transaction to memory pool', () => {
    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(found).toEqual(transaction);
  });

  it('updates a transaction in the memory pool', () => {
    const txOld = JSON.stringify(transaction);
    const txNew = transaction.update(wallet, '0th3r-4ddr3ss', 10);

    memoryPool.addOrUpdate(txNew);
    expect(memoryPool.transactions.length).toEqual(1);

    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(JSON.stringify(found)).not.toEqual(txOld);
    expect(txNew).toEqual(found);
  });
});
