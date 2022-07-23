var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("first");
  }, 4000);
});

var p2 = new Promise((resolve, reject) => {
  reject("second eroror");
});

var p3 = new Promise((resolve, reject) => {
  resolve("third");
});


Promise.all([p1,p2,p3]).then(m=>{
    console.log(m)
}).catch(e=>{
console.log(e)
    
})
Promise.race([p1,p2,p3]).then(m=>{
    console.log(m)
}).catch(e=>{
console.log(e)
    
})