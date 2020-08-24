import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions.reduce((ac, transaction) => {
      return transaction.type === 'income' ? ac + transaction.value : ac;
    }, 0);

    const outcome = this.transactions.reduce((ac, transaction) => {
      return transaction.type === 'outcome' ? ac + transaction.value : ac;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome
    }
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
