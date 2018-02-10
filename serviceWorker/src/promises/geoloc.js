// function getCurrentPositionPromise() {
//     new Promise((fulfill, reject) => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             fulfill(position);
//         }, (error) => {
//             reject(error.message);
//         });
//     });
// };

function getCurrentPositionPromise() {
    new Promise((fulfill, reject) => {
        navigator.geolocation.getCurrentPosition(fulfill, reject);
    });
};

getCurrentPositionPromise()
    .then(r => console.log(r.coords) || r)
    .catch(r => console.log(r.message));