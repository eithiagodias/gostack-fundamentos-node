import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    if(!title || !value || !type) {
      throw Error('Fields empty');
    }

    const balance = this.transactionsRepository.getBalance();
    if(type === 'outcome' && balance.total < value) {
      throw Error('Transaction not allowed');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
