import CurrencyAPI from 'src/CurrencyAPI.ts';

export default class CurrencyAPIFake implements CurrencyAPI {
  convert(amount: number, currency: string): number {
    return amount * 5;
  }
}
