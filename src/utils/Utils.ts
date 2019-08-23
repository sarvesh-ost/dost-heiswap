export enum NetworkType {
  goerli = 'goerli',
  ropsten = 'ropsten',
  mainnet = 'main',
  private = 'private',
}

export default class Utils {

  static async getNetworkType(): Promise<string> {
     const networkType = await window.web3.eth.net.getNetworkType();
     console.log(`networkType: ${networkType}`);
     return networkType;
  }

  static async getEtherScanLink(txHash: string): Promise<string> {
    const networkType = await Utils.getNetworkType();
    let url;
    switch (networkType) {
      case NetworkType.ropsten:
        url = `https://ropsten.etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.goerli:
        url = `https://goerli.etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.mainnet:
        url = `https://etherscan.io/tx/${txHash}`;
        break;
      case NetworkType.private:
        url = `https://goerli.etherscan.io/tx/${txHash}`;
        break;
      default:
        url = txHash;
    }

    return url;
  }

  static getFormattedEvents(eventsData):any {
    const formattedEvents = {};

    for (let i = 0; i < eventsData.length; i += 1) {
      const currEvent = eventsData[i];
      const currEventName = currEvent.name ? currEvent.name : currEvent.event;
      const currEventAddr = currEvent.address;
      const currEventParams = currEvent.events
        ? currEvent.events
        : currEvent.args;

      formattedEvents[currEventName] = {address: currEventAddr};

      if (Array.isArray(currEventParams)) {
        for (let j = 0; j < currEventParams.length; j += 1) {
          const p = currEventParams[j];
          formattedEvents[currEventName][p.name] = p.value;
        }
      } else {
        formattedEvents[currEventName] = currEventParams;
      }
    }

    return formattedEvents;
  }
}