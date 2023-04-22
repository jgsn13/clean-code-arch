import CurrencyAPI from 'src/CurrencyAPI.ts';

export default class Account {
  balance = 0;

  constructor(readonly currencyAPI: CurrencyAPI) {}

  credit(amount: number, currency?: string) {
    if (currency) {
      amount = this.currencyAPI.convert(amount, currency);
    }
    this.balance += amount;
  }

  debit(amount: number) {
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}
