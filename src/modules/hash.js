import { SHA256 } from 'crypto-js';

export default (data) => SHA256(JSON.stringify(data)).toString();
