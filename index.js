class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.allowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

  allowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value () {
    return -this.amount;
  }

  allowed() {
    if (this.amount >= this.account.balance) {
      return false;
    } else {
      return true;
    }
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

t1 = new Deposit(100, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(50, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

t3 = new Withdrawal(1000, myAccount);
t3.commit();
console.log(myAccount.balance);
