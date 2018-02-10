self.addEventListener('message', (event) => {
    if (event.data.command === 'calculatePrimes') {
        let listOfPrimes = this.generatePrimeList(event.data.limit);
        self.postMessage(primes);
    }

    if (event.data.command === 'printList') {
        let outputElement = event.data.outputElement;
        let htmlList = this.toHTMLList(event.data.primesList);
        outputElement.appendChild(htmlList);
    }
}, false);


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
};

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
};

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
};