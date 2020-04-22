import axios, { AxiosInstance } from 'axios';

export function getClient(api_base_url: string) {
  return axios.create({
    baseURL: api_base_url,
    timeout: 10000,
    headers: { 'X-LiskDexUI-Version': '0.2' }
  });
}

export async function getOrderbook(instance: AxiosInstance) {
  const [{data: bids}, {data: asks}] = await Promise.all([
    instance.get('/orders/bids?sort=price:desc'),
    instance.get('/orders/asks?sort=price:asc')
  ]);
  return bids.concat(asks);
}

export async function getBidsFromWallet(instance: AxiosInstance, sourceWalletAddress: string) {
  return (await instance.get(`/orders/bids?sourceWalletAddress=${sourceWalletAddress}&sort=price:desc`)).data;
}

export async function getAsksFromWallet(instance: AxiosInstance, sourceWalletAddress: string) {
  return (await instance.get(`/orders/asks?sourceWalletAddress=${sourceWalletAddress}&sort=price:asc`)).data;
}

export async function getPendingTransfers(instance: AxiosInstance, targetAssetSymbol: string, recipientId: string) {
  return (await instance.get(`/transfers/pending?targetChain=${targetAssetSymbol}&recipientId=${recipientId}&sort=timestamp:desc`)).data;
}

export async function getProcessedHeights(instance: AxiosInstance) {
  const status: any = (await instance.get(`/status`)).data;
  return status.processedHeights;
}

export async function getConfig(instance: AxiosInstance) {
  return (await instance.get(`/config.json`)).data;
}