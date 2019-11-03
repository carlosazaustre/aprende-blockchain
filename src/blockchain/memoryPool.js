class MemoryPool {
  constructor() {
    this.transactions = [];
  }

  addOrUpdate(transaction) {
    const txIndex = this.transactions.findIndex(({ id }) => id === transaction.id);
    if (txIndex >= 0) this.transactions[txIndex] = transaction;
    else this.transactions.push(transaction);
  }

  find(address) {
    return this.transactions.find(({ input }) => input.address === address);
  }
}

export default MemoryPool;
