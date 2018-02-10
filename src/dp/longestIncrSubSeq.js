function main() {
    let length = 10000;
    let multiplier = length * 10;
    // let arr = [10, 22, 9, 33, 21, 50, 41, 60];
    // let arr = [1, 8, 59, 13, 73, 97, 56, 75, 78, 85];
    let arr = [];

    for (let i = 0; i < length; i++) {
        let randomNum = Math.floor(Math.random() * multiplier);
        arr.push(randomNum);
    }

    console.time("LIS");
    calculateSubsequence(arr);
    console.timeEnd("LIS");
}

function calculateSubsequence(numbers) {
    let subCount = [];
    let subSeq = [];

    for (let i = 0; i < numbers.length; i++) {
        subCount[i] = 1;
    }

    for (let i = 1; i < numbers.length; i++) {
        for (let j = 0; j < i; j++) {
            if (numbers[j] < numbers[i]) {
                subCount[i] = Math.max((subCount[j] + 1), subCount[i]);
            }
        }
    }

    console.log("Length of longest increasing subsequence: " + maxOfArr(subCount));
}

function maxOfArr(arr) {
    let max = 0;

    arr.forEach(element => {
        if (element > max) {
            max = element;
        }
    });

    return max;
}