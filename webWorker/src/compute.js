let output = document.getElementById('output');
let loader = document.getElementById('loader');

// let worker = new Worker('worker.js');

function start() {
    let limit = document.getElementById('limit').value;
    this.output.innerHTML = '';

    // this.regularCall(limit);
    // this.workerCall(limit);
}

function regularCall(limit) {
    this.loader.style.visibility = 'visible';

    // Simple javascript DOM manipulation
    console.time("Generate Primes");
    let primes = this.generatePrimeList(limit);
    console.timeEnd("Generate Primes");

    console.time("Print Primes");
    this.output.appendChild(toHTMLList(primes));
    console.timeEnd("Print Primes");

    this.loader.style.visibility = 'hidden';
}

/**
 * Blocked on chrome
 */
function workerCall(limit) {
    let list = worker.postMessage({ command: 'calculatePrimes', limit: limit });
    worker.postMessage({ command: 'printList', outputElement: this.output, primesList: list });
}

function reset() {
    this.loader.style.visibility = 'hidden';
    this.output.innerHTML = '';
}

/**
 * 
 * @param {Array<number>} limit 
 * Generates a List of prime numbers upto the limit
 */
function generatePrimeList(limit) {
    let listOfPrimes = [2, 3];
    let divisor, notPrime;

    for (let num = 5; num <= limit; num++) {
        if (isPrime(num)) {
            listOfPrimes.push(num);
        }
    }

    return listOfPrimes;
}

/**
 * 
 * @param {number} num 
 * Checks if given number is prime or not
 */
function isPrime(num) {
    if (num % 2 == 0 || num % 3 == 0) {
        return false;
    }

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return false;
        }
    }

    return true;
}


/**
 * 
 * @param {Array<number>} numList 
 * Converts list to html list element
 */
function toHTMLList(numList) {
    let htmlList = document.createElement('ul');
    numList.forEach(element => {

        let listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(element));
        htmlList.appendChild(listItem);

    });

    return htmlList;
}