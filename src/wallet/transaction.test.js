import Transaction from './transaction';
import Wallet from './wallet';

describe('Transaction', () => {
  let wallet;
  let transaction;
  let amount;
  let recipientAddress;

  beforeEach(() => {
    wallet = new Wallet();
    recipientAddress = 'r3c1p13nt4ddr3ss';
    amount = 5;
    transaction = Transaction.create(wallet, recipientAddress, amount);
  });

  it('outputs the `amount` substracted from the wallet balance', () => {
    const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
    expect(output.amount).toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` added to the recipient', () => {
    const output = transaction.outputs.find(({ address }) => address === recipientAddress);
    expect(output.amount).toEqual(amount);
  });

  describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 500;
      transaction = undefined;
    });

    it('does not create the transaction', () => {
      expect(() => {
        transaction = Transaction.create(wallet, recipientAddress, amount);
      }).toThrowError(`Amount: ${amount} exceeds balance.`);
    });
  });
});
