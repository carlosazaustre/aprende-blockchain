import PKG from './package.json';
import Block from './src/blockchain/block';

const { name, version } = PKG;
console.log(`${name} v${version}`);

const { genesis } = Block;
console.log(genesis.toString());

const block = new Block(Date.now(), genesis.hash, 'h4$h', 'd4t4');
console.log(block.toString());

const block_2 = new Block(Date.now(), block.hash, 'h4$h-2', 'd4t4-2');
console.log(block_2.toString());
