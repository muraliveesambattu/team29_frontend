# Complete Guide to ES6 (ECMAScript 2015) 🚀

ECMAScript 2015 (commonly known as **ES6**) was the most substantial update to the JavaScript language since its creation in 1995. It modernized the language with cleaner syntax, robust object-oriented features, native asynchronous primitives, and modular architecture.

---

## 📑 Table of Contents
1. [Block-Scoped Declarations: `let` and `const`](#1-block-scoped-declarations-let-and-const)
2. [Arrow Functions (`=>`)](#2-arrow-functions-)
3. [Template Literals & Tagged Templates](#3-template-literals--tagged-templates)
4. [Destructuring Assignment](#4-destructuring-assignment)
5. [Enhanced Object Literals](#5-enhanced-object-literals)
6. [Default Parameters, Rest Parameters & Spread Operator](#6-default-parameters-rest-parameters--spread-operator)
7. [Classes & Object-Oriented Programming](#7-classes--object-oriented-programming)
8. [Promises & Asynchronous Programming](#8-promises--asynchronous-programming)
9. [ES6 Modules (`import` / `export`)](#9-es6-modules-import--export)
10. [`for...of` Loop & Iterable Protocol](#10-forof-loop--iterable-protocol)
11. [Generators (`function*` and `yield`)](#11-generators-function-and-yield)
12. [Collections: `Set`, `Map`, `WeakSet`, `WeakMap`](#12-collections-set-map-weakset-weakmap)
13. [The `Symbol` Primitive Type](#13-the-symbol-primitive-type)
14. [Metaprogramming: `Proxy` and `Reflect`](#14-metaprogramming-proxy-and-reflect)
15. [Built-in Method Additions (Array, Object, String, Number, Math)](#15-built-in-method-additions)
16. [ES5 vs ES6 Quick Comparison Reference](#16-es5-vs-es6-quick-comparison-reference)

---

## 1. Block-Scoped Declarations: `let` and `const`

In ES5, variables declared with `var` were **function-scoped** and hoisted to the top of the function, often causing unintentional variable leaks and bugs inside loops.

### Key Rules
* **`let`**: Block-scoped, re-assignable variable.
* **`const`**: Block-scoped, immutable variable binding (the variable cannot be reassigned, though object properties can still be mutated).
* **Temporal Dead Zone (TDZ)**: Unlike `var`, accessing `let` or `const` before declaration throws a `ReferenceError`.

```javascript
// Function Scope (ES5) vs Block Scope (ES6)
if (true) {
    var oldVar = "I leak outside this block";
    let newLet = "I am confined to this block";
    const newConst = "I am also confined and cannot be reassigned";
}

console.log(oldVar);   // "I leak outside this block"
// console.log(newLet);   // ReferenceError: newLet is not defined
// console.log(newConst); // ReferenceError: newConst is not defined

// const prevents reassignment, but objects/arrays remain mutable:
const person = { name: "John" };
person.name = "Jane"; // ✅ Allowed (property mutation)
// person = { name: "Bob" }; // ❌ TypeError: Assignment to constant variable.
```

---

## 2. Arrow Functions (`=>`)

Arrow functions provide a concise syntax for writing function expressions and solve the notorious `this` binding issue in JavaScript.

### Key Characteristics
1. **Shorter Syntax**: Omit `function`, `{}` and `return` for single-expression implicit returns.
2. **Lexical `this`**: Inherits `this` from the enclosing execution context (never binds its own `this`, `arguments`, `super`, or `new.target`).
3. **Cannot be used as constructors**: Cannot be invoked with `new`.

```javascript
// ES5
var add = function (a, b) {
    return a + b;
};

// ES6: Implicit return for single expressions
const add = (a, b) => a + b;

// ES6: Multi-line arrow function
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Lexical 'this' solving the timer/callback problem:
function Timer() {
    this.seconds = 0;
    
    // In ES5, we needed: var self = this;
    setInterval(() => {
        this.seconds++; // 'this' automatically refers to the Timer instance
    }, 1000);
}
```

---

## 3. Template Literals & Tagged Templates

Template literals use backticks (`` ` ``) instead of single or double quotes.

### Features
* **String Interpolation**: Embed expressions using `${expression}`.
* **Multi-line Strings**: Write multi-line strings without `\n` or string concatenation (`+`).
* **Tagged Templates**: Parse template literals with custom functions.

```javascript
const name = "Alice";
const role = "Admin";
const itemsCount = 3;

// Basic Interpolation & Multi-line
const message = `
    User Profile:
    Name: ${name}
    Role: ${role.toUpperCase()}
    Status: ${itemsCount > 0 ? "Active Cart" : "Empty"}
`;

// Tagged Template function
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => 
        `${acc}${str}<strong>${values[i] || ""}</strong>`, "");
}

const taggedResult = highlight`User ${name} has ${itemsCount} items.`;
// Output: "User <strong>Alice</strong> has <strong>3</strong> items."
```

---

## 4. Destructuring Assignment

Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

### Object Destructuring
```javascript
const product = {
    id: 101,
    title: "Wireless Mouse",
    price: 29.99,
    dimensions: { width: 10, height: 5 }
};

// Basic + Renaming + Default Values + Nested
const { 
    id, 
    title: productName,                 // Rename 'title' to 'productName'
    price, 
    inStock = true,                     // Default value if undefined
    dimensions: { width, height }       // Nested destructuring
} = product;

console.log(productName); // "Wireless Mouse"
console.log(width);       // 10
```

### Array Destructuring
```javascript
const rgb = [255, 128, 0];

// Destructuring with skipping and defaults
const [red, green, blue, alpha = 1.0] = rgb;

// Swapping variables without a temporary variable
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

### Parameter Destructuring
```javascript
function displayUser({ name, email, role = "User" }) {
    console.log(`${name} (${email}) - ${role}`);
}
displayUser({ name: "Bob", email: "bob@example.com" });
```

---

## 5. Enhanced Object Literals

ES6 streamlines object creation with shorthand syntax:

```javascript
const id = 12;
const username = "developer";

const user = {
    // 1. Property Shorthand (instead of id: id)
    id,
    username,

    // 2. Method Shorthand (instead of greet: function() {})
    greet() {
        return `Hello, ${this.username}`;
    },

    // 3. Computed Property Names (expressions inside brackets)
    ["role_" + id]: "SuperAdmin"
};

console.log(user.greet());       // "Hello, developer"
console.log(user.role_12);       // "SuperAdmin"
```

---

## 6. Default Parameters, Rest Parameters & Spread Operator

### Default Parameters
Assign default values to parameters if they are `undefined` or omitted:
```javascript
function greet(name = "Guest", greeting = "Welcome") {
    return `${greeting}, ${name}!`;
}
greet(); // "Welcome, Guest!"
```

### Rest Parameters (`...rest`)
Gathers multiple arguments into a true Array, replacing the old `arguments` object:
```javascript
function sum(...numbers) {
    // 'numbers' is a real Array with all array methods (.reduce, .map, etc.)
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10
```

### Spread Operator (`...spread`)
Expands arrays or objects into individual elements:
```javascript
// Array merging and cloning
const fruits = ["apple", "banana"];
const veggies = ["carrot", "spinach"];
const food = [...fruits, ...veggies, "bread"]; // ["apple", "banana", "carrot", "spinach", "bread"]

// Math functions with arrays
const scores = [88, 92, 79, 95];
const highest = Math.max(...scores); // 95

// Object merging and cloning
const baseProduct = { id: 1, name: "Shirt", price: 20 };
const discounted = { ...baseProduct, discount: 5, price: 15 };
```

---

## 7. Classes & Object-Oriented Programming

ES6 introduced syntactical sugar over JavaScript’s existing prototype-based inheritance.

### Class Syntax, Constructor, Methods & Getters/Setters
```javascript
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._odometer = 0; // Private convention
    }

    // Instance Method
    start() {
        return `${this.make} ${this.model} is running.`;
    }

    // Getter
    get mileage() {
        return `${this._odometer} miles`;
    }

    // Setter
    set mileage(val) {
        if (val >= this._odometer) {
            this._odometer = val;
        }
    }

    // Static Method (called on class, not instances)
    static compareMakes(v1, v2) {
        return v1.make === v2.make;
    }
}
```

### Inheritance: `extends` and `super`
```javascript
class ElectricCar extends Vehicle {
    constructor(make, model, batteryCapacity) {
        super(make, model); // Must call parent constructor before accessing 'this'
        this.batteryCapacity = batteryCapacity;
    }

    // Method Overriding
    start() {
        return `${super.start()} (Silently powered by ${this.batteryCapacity}kWh battery)`;
    }
}

const tesla = new ElectricCar("Tesla", "Model 3", 75);
console.log(tesla.start());
```

---

## 8. Promises & Asynchronous Programming

Promises provide a standardized way to handle asynchronous computations without callback hell.

### Promise States
* **Pending**: Initial state, neither fulfilled nor rejected.
* **Fulfilled**: Operation completed successfully (`resolve()`).
* **Rejected**: Operation failed (`reject()`).

```javascript
// Creating a Promise
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Sarah" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 500);
    });
}

// Consuming with .then(), .catch(), .finally()
fetchUserData(1)
    .then(user => {
        console.log("Fetched User:", user.name);
        return user.id;
    })
    .catch(err => {
        console.error("Error:", err.message);
    })
    .finally(() => {
        console.log("Fetch operation finished");
    });

// Combinators: Promise.all, Promise.race
const p1 = Promise.resolve(10);
const p2 = new Promise(resolve => setTimeout(() => resolve(20), 200));

Promise.all([p1, p2]).then(([res1, res2]) => {
    console.log(res1 + res2); // 30
});
```

---

## 9. ES6 Modules (`import` / `export`)

ES6 replaced proprietary module patterns (CommonJS `require`, AMD) with native browser and runtime module support.

### Named Exports & Imports
```javascript
// mathUtils.js
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}

// main.js
import { PI, add as sum } from './mathUtils.js';
console.log(sum(2, 3));
```

### Default Exports & Imports
```javascript
// Logger.js
export default class Logger {
    log(msg) { console.log(`[LOG]: ${msg}`); }
}

// app.js
import Logger from './Logger.js';
const logger = new Logger();
```

---

## 10. `for...of` Loop & Iterable Protocol

The `for...of` statement loops through values of **iterable objects** (Arrays, Strings, Sets, Maps, NodeLists).

```javascript
// Iterating over an Array
const colors = ["red", "green", "blue"];
for (const color of colors) {
    console.log(color); // "red", "green", "blue"
}

// Iterating over a String
for (const char of "ES6") {
    console.log(char); // "E", "S", "6"
}

// Custom Iterable using Symbol.iterator
const range = {
    start: 1,
    end: 3,
    [Symbol.iterator]() {
        let current = this.start;
        const last = this.end;
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3
}
```

---

## 11. Generators (`function*` and `yield`)

Generators are functions that can be exited and later re-entered. Their context (variable bindings) is saved across re-entrances.

```javascript
// Generator Function
function* idMaker() {
    let index = 1;
    while (true) {
        yield `USER-${index++}`;
    }
}

const gen = idMaker();
console.log(gen.next().value); // "USER-1"
console.log(gen.next().value); // "USER-2"
console.log(gen.next().value); // "USER-3"
```

---

## 12. Collections: `Set`, `Map`, `WeakSet`, `WeakMap`

### `Set`
An ordered collection of **unique** values of any type.
```javascript
const set = new Set([1, 2, 2, 3, 4, 4]);
set.add(5);
console.log(set.has(2)); // true
console.log([...set]);   // [1, 2, 3, 4, 5] (Duplicate removal made easy!)
```

### `Map`
Keyed collection where keys can be **any data type** (including objects or functions).
```javascript
const map = new Map();
const keyObj = { id: 1 };

map.set(keyObj, "Metadata for object 1");
map.set("active", true);

console.log(map.get(keyObj)); // "Metadata for object 1"
console.log(map.size);        // 2
```

### `WeakSet` and `WeakMap`
* Objects are held **weakly** (garbage collection can clean up the entries if no other references exist).
* Non-enumerable (no `.size`, no `.keys()`, no looping).
* Keys must be **objects only**.

---

## 13. The `Symbol` Primitive Type

`Symbol` is a new unique and immutable primitive data type introduced in ES6, often used as private or collision-free object property keys.

```javascript
const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log(sym1 === sym2); // false (Every Symbol is completely unique)

// Use as hidden/safe property keys:
const SECRET_KEY = Symbol("apiKey");
const config = {
    env: "production",
    [SECRET_KEY]: "98234-xyz"
};

console.log(config[SECRET_KEY]);  // "98234-xyz"
console.log(Object.keys(config)); // ["env"] (Symbols are non-enumerable in normal iterations)
```

---

## 14. Metaprogramming: `Proxy` and `Reflect`

### `Proxy`
Enables wrapping an object to intercept and redefine fundamental operations (property reading, assignment, deletion, function calls).

```javascript
const target = { name: "Laptop", price: 999 };

const handler = {
    // Intercept property reading
    get(obj, prop) {
        return prop in obj ? obj[prop] : "Not Available";
    },
    // Intercept property writing
    set(obj, prop, value) {
        if (prop === "price" && value < 0) {
            throw new RangeError("Price cannot be negative!");
        }
        obj[prop] = value;
        return true;
    }
};

const proxyProduct = new Proxy(target, handler);
console.log(proxyProduct.stock); // "Not Available"
// proxyProduct.price = -50;     // Throws: RangeError: Price cannot be negative!
```

### `Reflect`
Provides interceptable methods for JavaScript operations matching Proxy handlers:
```javascript
Reflect.has(target, "name");               // Equivalent to: "name" in target
Reflect.set(target, "price", 1050);        // Equivalent to: target.price = 1050
```

---

## 15. Built-in Method Additions

ES6 enriched standard built-in objects with dozens of utility methods:

### Array Additions
* **`find(callback)`**: Returns first element matching predicate.
* **`findIndex(callback)`**: Returns index of first element matching predicate.
* **`Array.from(iterable)`**: Converts array-like or iterable objects to true arrays.
* **`Array.of(...items)`**: Creates a new Array with variable number of arguments.
* **`fill(value, start, end)`**: Fills elements with a static value.
* **`entries()`, `keys()`, `values()`**: Returns array iterators.

```javascript
// Array.from with map function
const squares = Array.from([1, 2, 3], x => x * x); // [1, 4, 9]

// find and findIndex
const users = [{ id: 1, active: false }, { id: 2, active: true }];
const activeUser = users.find(u => u.active); // { id: 2, active: true }
```

### Object Additions
* **`Object.assign(target, ...sources)`**: Copies own enumerable properties to a target object.
* **`Object.is(v1, v2)`**: Accurate value equality check (correctly handles `NaN === NaN` and `+0 !== -0`).

### String Additions
* **`includes(searchString)`**: Returns boolean if substring is present.
* **`startsWith(searchString)`**: Checks prefix.
* **`endsWith(searchString)`**: Checks suffix.
* **`repeat(count)`**: Repeats a string `count` times.

```javascript
"JavaScript".includes("Script"); // true
"ES6".startsWith("ES");          // true
"★".repeat(5);                   // "★★★★★"
```

### Number & Math Additions
* **`Number.isInteger(num)`**: Checks if a value is an integer.
* **`Number.isNaN(val)`**: Robust NaN check (does not coerce non-numbers).
* **`Math.trunc(x)`**: Returns integer portion by truncating decimals.
* **`Math.sign(x)`**: Returns `1`, `-1`, or `0`.

---

## 16. ES5 vs ES6 Quick Comparison Reference

| Feature | ES5 Approach | ES6 Modern Standard |
|:---|:---|:---|
| **Variables** | `var` (function-scoped, hoisted) | `const` (immutable) & `let` (block-scoped) |
| **Functions** | `function (a, b) { return a + b; }` | `(a, b) => a + b` |
| **Strings** | `'Hello ' + user + '!'` | `` `Hello ${user}!` `` |
| **OOP** | Prototype objects & constructor functions | `class`, `constructor`, `extends`, `super` |
| **Objects** | `{ a: a, b: function() {} }` | `{ a, b() {} }` |
| **Array Copying** | `arr.slice()` or `[].concat(arr)` | `[...arr]` |
| **Arguments** | `arguments` pseudo-array object | `(...args)` Rest parameters |
| **Async Tasks** | Nested callbacks | `Promise` (`.then()`, `.catch()`) |
| **Modules** | IIFE, CommonJS (`require`), AMD | Native `import` and `export` |
| **Unique Lists** | Manual `indexOf` duplicate filtering | `new Set(array)` |
| **Keyed Dict** | Object `{}` with string keys | `new Map()` with any key type |
| **Looping** | `for (var i = 0; ...)` or `.forEach` | `for (const item of iterable)` |
