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
            if (numList.length == 0) {
                reject(new Error('Array is Empty'))
            }
            resolve(numList.reduce((a, b) => a + b, 0));
        }, 4000);
    })
}







/**<--------------------------------------------   function call-------------------------------------------------> */

const markList = [20,30,40]

async function playAll() {
    //var _total=await total([]).catch(e=>{console.log(e.message);});
    try {
        var _total = await total(markList).catch(e => { console.log(e.message); /* throw e will move to outer try  catch*/ });
        console.log('Total', _total);
        var _avg = await average(_total, 0).catch(e => { console.log(e.message); throw e });
        console.log('avg', _avg);
    } catch (e) { console.log('lower Try catch', e.message) }

}

playAll();