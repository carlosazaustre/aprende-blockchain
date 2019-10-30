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

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('inputs the sender address of the wallet', () => {
    expect(transaction.input.address).toEqual(wallet.publicKey);
  });

  it('inputs has a signature usign the wallet', () => {
    expect(typeof transaction.input.signature).toEqual('object');
    expect(transaction.input.signature).toEqual(wallet.sign(transaction.outputs));
  });
});
