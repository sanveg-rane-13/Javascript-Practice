process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function simplestSum(k, a, b) {
    let sum = 0;
    let prev_sum = 0;
    
    for(let n = a ; n <= b; n++) {
        let sum_temp = sumEquation(k, n);
        
        if(prev_sum !== sum_temp) {
            console.log(sum_temp + ' -> ' + n);
            prev_sum = sum_temp;
        }
        
        sum += sum_temp;
    }
    
    return sum;
}

function sumEquation(k, n) {
    sum = 0;
    for(let i = 0; i <= n; i++) {
        sum += i;
        i *= k;
    }
    return sum;
}

function complexSum(k, a, b) {
    if( k >= b ) {
        return (b - a) + 1;
    } else {
        if(k >= a) {
            let initSum = (k - a) + 1;
            a = k + 1;
            return initSum + ((b - a + 1) * sumEquation(k, a));
        } else {
            return (b - a + 1) * sumEquation(k, a);
        }
    }
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var k_temp = readLine().split(' ');
        var k = parseInt(k_temp[0]);
        var a = parseInt(k_temp[1]);
        var b = parseInt(k_temp[2]);
        
        var result1 = (simplestSum(k, a, b) % (Math.pow(10,9) + 7));
        process.stdout.write("simplestSum: " + result1 + "\n");
        
        var result2 = (complexSum(k, a, b) % (Math.pow(10,9) + 7));
        process.stdout.write("complexSum: " + result2 + "\n");
    }

}

/*
Test
1
1000 1000000 30000000
*/