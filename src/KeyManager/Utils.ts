const Web3Utils = require('web3-utils');

export default class Utils {

  static isValidAddress(address: string):boolean {
    return Web3Utils.isAddress(address);
  }

  static getImagePathForSymbol(symbol: string):string {
    if (symbol) {
      symbol = symbol.toLowerCase();
      if (symbol === 'st' || symbol === 'ost') {
        return 'ost.jpg'
      }
      if (symbol === 'eth') {
        return 'ethereum.png';
      }
      if (symbol === 'weth') {
        return 'ethereum.png'
      }
    }
    return 'ost.jpg'
  }
}
