//const a = [1,2];
//console.log([...a, 3])

//function f(...args) {console.log(args)}
// function f() {console.log(arguments)}
//
// f(1,2,3)


// function updateStudent(student, changes) {
//     return {...student, ...changes}
// }
//
// const ana = { name: 'Ana', year: 3 };
// const nova = updateStudent(ana, { year: 4, active: true });
// console.log(nova);   // { name: 'Ana', year: 4, active: true }
// console.log(ana);    // { name: 'Ana', year: 3 }  ← непроменет


// function sumAll(...args) {
//      console.log(args.reduce((sum, number) => sum + number, 0))
// }
// sumAll(1, 2, 3)      // 6
// sumAll(5)            // 5
// sumAll()             // 0
