// globals.d.ts
import { ExternalProvider } from '@ethersproject/providers';

interface Ethereum extends ExternalProvider {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}
