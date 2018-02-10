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

function winningLotteryTicket(ticketCombox) {
    var count = 0;
    var numLength = 9;
    
    ticketCombox.forEach((ticketCombo) => {
        var winning = true;
        
        if(ticketCombo.length > numLength) {
            if(checkIfAllNumberPresent(ticketCombo)) {
                count++;
            }
        }        
    });
    
    return count;
}

function removeDuplicates(inputString) {    
    var uniqueString = Array.from(new Set(inputString.split(''))).toString();
    return uniqueString.split(',').join('');
}

function checkIfAllNumberPresent(inputString) {
    for(var i = 0; i <= 9; i++) {
        if(inputString.indexOf(i) === -1) {
            return false;
        }
    }
    return true;
}

function main() {
    var n = parseInt(readLine());
    var tickets = [];
    var ticketCombos = [];
    var initialCount = 0;
    
    console.time('exec');
    console.time('removeDupes');
    for(var tickets_i = 0; tickets_i < n; tickets_i++){
        var input = removeDuplicates(readLine());
        if(checkIfAllNumberPresent(input)) {
            initialCount += (n - 1);
        } else {
            tickets[tickets_i] = input;   
        }
    }
    console.timeEnd('removeDupes');
    
    console.time('pushVal');
    for(var i = 0; i < n ; i++) {
        for(var j = i + 1; j < n; j++) {
            ticketCombos.push(tickets[i] + '' + tickets[j]);               
        }
    }
    console.timeEnd('pushVal');
    
    console.time('winning');
    var result = winningLotteryTicket(ticketCombos);
    var finalResult = result + initialCount;
    console.timeEnd('winning');
    console.timeEnd('exec');
    
    process.stdout.write("" + finalResult + "\n");

}

