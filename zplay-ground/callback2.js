//call back examples
function average(total, number, _callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number == 0) {
                //_callback(null, new Error('Division by Zero is not possible'));
                reject(new Error('Division by Zero is not possible'))
            }
            else {
                resolve(total / number);
                //_callback(total / number, null)
            }
        }, 3000);
    })
}

const total = (numList, callback) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(numList.reduce((a, b) => a + b, 0));
        }, 4000);
    })
}







/**<--------------------------------------------   function call-------------------------------------------------> */

const markList = [50, 40, 100]

total(markList).then((total) => {
    average(total, 3).then((result2) => {
        console.log(result2);
    }).catch((err) => {
        console.log(err.message);
    });
}).catch((err) => {
    console.log(err.message);
});

