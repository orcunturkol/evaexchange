export interface TransactionData {
  type: 'BUY' | 'SELL'
  shareSymbol: string
  portfolioId: string
  quantity: number
  rate: number
}
