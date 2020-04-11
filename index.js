class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  get isAllowed() { // only for withdrawals for now
    return (this.value < 0 && this.account.balance < this.amount) ? false : true;
  }

  commit() {
    if (this.isAllowed) {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
    }
    return false;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let tally = 0;
    for (let actions of this.transactions) {
      tally += actions.value;
    }
    return tally;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount1 = new Account("snow-patrol");
console.log(myAccount1.balance);

t1 = new Withdrawal(50.25, myAccount1);
t1.commit();
console.log('Transaction 1:', t1);
console.log(t1.value);

t2 = new Withdrawal(9.99, myAccount1);
t2.commit();
console.log('Transaction 2:', t2);
console.log(t2.value);

t3 = new Deposit(120.00, myAccount1);
t3.commit();
console.log('Transaction 3:', t3);
console.log(myAccount1);
console.log('Balance:', myAccount1.balance);

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t4 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t4.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t5 = new Deposit(9.99, myAccount);
console.log('Commit result:', t5.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t6 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t6.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);

