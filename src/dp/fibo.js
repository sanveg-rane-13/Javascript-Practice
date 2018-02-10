/**
 * Function to calculate sum of nth fibonacci number
 * 
 * Tabulation: 0.000443 sec
 * Memorization: 0.00313 sec
 * Recurssion: 3 sec
 * 
 */

function main() {
    let num = 1400;
    let arr1 = [];
    let arr2 = [];

    console.time("calculateFiboMem");
    console.log(calculateFiboMem(num, arr1));
    console.timeEnd("calculateFiboMem");

    console.time("calculateFiboTab");
    console.log(calculateFiboTab(num, arr2));
    console.timeEnd("calculateFiboTab");

}

function calculateFiboMem(num, arr) {
    if (!arr[num]) {

        if (num <= 1) {
            arr[num] = num;
        } else {
            arr[num] = calculateFiboMem(num - 1, arr) + calculateFiboMem(num - 2, arr);
        }

    }

    return arr[num];
}

function calculateFiboTab(num, arr) {
    arr[0] = 0;
    arr[1] = 1;

    for (let i = 2; i <= num; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr[num];
}