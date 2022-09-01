"use strict";

// Constructor Function

// console.log(edison);

//Four things have happened just now

//1. New {} created
//2. the function is called, the this keyword is now the created {}
//3. {} is now linked to the prototype
//4. function automatically returns {}

// Prototypes

//Prototypal inheritance of methods

// console.log(edison.species);
// console.log(edison.hasOwnProperty("firstname"));
// console.log(Person.prototype.__proto__);

// console.dir(Person.prototype.constructor);

// console.log("------------------ ARRAYS PROTOTYPE ------------------");
// const arr = [3, 4, 6, 4, 21, 3, 8, 9, 7, 4]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__.isPrototypeOf(arr));

Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique()); //Not really a good idea

// console.log("----------- CODING CHALLENGE ONE -----------------------");

const Car = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

// const mercedes = new Car("Mercedes", 20);
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.brake();

// ES6 Classes

// console.log("------------- ES6 Classes ----------------");
// console.log(
//   "-------------- Getters and Setters ------------------------------"
// );
// class expression
// const PersonCl = class{}

// class declaration

// const walter = new PersonCl("Walter Davis");

// const jessica = new PersonCl("Jessica Davis", 2000);
// console.log(jessica);
// console.log(jessica.fullName);
// console.log(jessica);
// jessica.calcAge();
// jessica.greet();

// console.log(jessica.age);
//1. Classes are NOT hoisted. They cant be used before declaration.
//2. Classes are first-class citizens (they can be passed into functions and return from functions)
//3. Classes are executed in strict mode.

// Getters and Setters

const account = {
  owner: "Edison",
  movements: [230, 430, 100, -700, 1000],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(value) {
    //sets "latest" as a property and not just a method
    this.movements.push(value);
  },
};

// console.log(account.latest); // makes the method act like a property

account.latest = 50;
// console.log(account);

// Static Methods

//these are methods attached to the constructor itself but not the instances

// Person.hey();
// // edison.hey() // doesn't work because the method was set to the constructor itself and not to the prototype

// PersonCl.hey();
// jessica.hey() // doesn't work because the method was set to the class constructor and not to the prototype

//Object.create

const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

// Coding Challenge 2
// console.log("--------------- CODING CHALLENGE 2 --------------------");

// class CarCl {
//   constructor(make, speed) {
//     (this.make = make), (this.speed = speed);
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} going at ${this.speed}km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} going at ${this.speed}km/h`);
//   }
//   get speedUS() {
//     console.log(this.speed / 1.6);
//     return `${this.speed / 1.6} mi/h`;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const mercedes = new CarCl("Mercedes", 40);

// Inheritance between Classes (Constructor functions)

// const Person = function (firstName, birthYear) {
//   (this.firstname = firstName), (this.birthYear = birthYear);

//   //Never create methods inside the constructor. Instead create through the prototype property of the constructor
//   // this.calcAge = function(){
//   //     console.log(2022 - this.birthYear)
//   // }
// };

// const Student = function (firstName, birthYear, course) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   this.course = course;
// };

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and i'm studying ${this.course}`);
// };

// Person.prototype.calcAge = function () {
//   console.log(2022 - this.birthYear);
// };

// const mike = new Student("Mike", 1992, "Computer Science");

// console.log(mike);
// mike.introduce()

//Inheritance between classes (ES6 classes)

class PersonCl {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }

  // Methods will be added to .prototype property of the Class automatically
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  // Setting a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    // else alert(`${name} is not full Name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there coming from the Person class");
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // Always do this first

    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and i'm studying ${this.course}`);
  }

  calcAge() {
    //overriding the calcAge method from the parent class
    console.log(`I'm ${2022 - this.birthYear} years old`);
  }
}

const edison = new PersonCl("Chimdi Mgbeokwere", 2000);
const martha = new StudentCl("Martha Davis", 1992, "Computer Science");
// console.log(martha);
// martha.introduce();
// edison.calcAge(); // from the Person Class
// martha.calcAge(); // from the Student Class

class Account {
  //locale and movements will be created in each instance so they can be declared outside the constructor method

  // Public fields
  locale = navigator.language;
  // Private fields
  #movements = [];
  #pin; // the # denotes private fields that can only be manipulated within the class
  constructor(owner, currency, pin) {
    (this.owner = owner),
      (this.currency = currency),
      (this.#pin = pin), // the # signifies a protected property by convention
      console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public Interface of our objects
  deposit(amount) {
    this.#movements.push(amount);
    return this;
  }
  withdraw(amount) {
    this.deposit(-amount);
    return this;
  }
  getMovements() {
    return this.#movements;
  }
  _approveLoan(amount) {
    //_ denotes private method just as a convention
    return true;
  }

  requestLoan(amount) {
    if (this._approveLoan(amount)) {
      this.deposit(amount);

      console.log("Loan Approved");
      return this;
    }
  }
}

const acc1 = new Account("Edison", "NGR", 1111);

// acc1.deposit(300);
// acc1.withdraw(400);
// acc1.requestLoan(1000);

console.log(acc1);

acc1.deposit(300).deposit(400).requestLoan(1000).withdraw(700)

console.log(acc1)