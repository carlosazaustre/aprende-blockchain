import Wallet, { INITIAL_BALANCE } from './wallet';

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('it is a healthy wallet', () => {
    expect(wallet.balance).toEqual(INITIAL_BALANCE);
    expect(typeof wallet.keyPair).toEqual('object');
    expect(typeof wallet.publicKey).toEqual('string');
    expect(wallet.publicKey.length).toEqual(130);
  });

  it('use sign()', () => {
    const dummyData = 'h3ll0';
    const signature = wallet.sign(dummyData);
    expect(typeof signature).toEqual('object');
    expect(signature).toEqual(wallet.sign(dummyData));
  });
});
