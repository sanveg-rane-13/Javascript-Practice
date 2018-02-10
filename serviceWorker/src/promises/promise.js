// Take function and wrap in promise contructor

new Promise(function example(fulfill, reject) {
    if (success) {
        fulfill(result);
    } else {
        reject(new Error("Doesn't work"));
    }
});

Promise.resolve(value); // Guranteed success
Promise.reject(error); // Guranteed failure