const readLine = require("readline");
const async = require('async');

const reader = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.on('line', (input) => {
    console.log(`received input: ${input}`);
});

reader.on('pause', () => {
    console.log("Reader paused");
});

reader.on('resume', () => {
    console.log("Reader resumed");
});

reader.question('Enter your name: ', (input) => {
    console.log(`Welcome ${input}`);
    reader.question('Enter your age: ', (input) => {
        console.log(`You are ${input} years old`);
        reader.close();
    });
});

async.series([
    (callback) => {
        reader.question('Enter your name: ', (input) => {
            console.log(`Welcome ${input}`);
        });
    },
    (callback) => {
        reader.question('Enter your age: ', (input) => {
            console.log(`You are ${input} years old`);
        });
    }
], () => {
    reader.close();
    console.log("Async requests completed");
});
