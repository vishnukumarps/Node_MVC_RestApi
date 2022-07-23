//call back examples
const average = (total, number, _callback) => {
    setTimeout(() => {
        if (number == 0) {
            _callback(null, new Error('Division by Zero is not possible'));
        }
        else {
            console.log('inside average');
            _callback(total / number, null)
        }
    }, 300); // mimics the delay
}

const total=(numList, callback)=> {
    setTimeout(() => {
        callback(numList.reduce((a, b) => a + b, 0));
    }, 2000);
}







/**<--------------------------------------------   function call-------------------------------------------------> */

// average(10, 2, function _averag(response, error) {
//     if (error) {
//         console.log(error.message);
//     }
//     console.log(response);
// })

// average(10, 2, (response, error)=> {
//     if (error) {
//         console.log(error.message);
//     }
//     console.log(response);
// })

const markList = [50, 40, 100]
total(markList, (total, error) => {
    average(total, markList.length, (avg, _error) => {
        console.log('average', avg);
    });
});
