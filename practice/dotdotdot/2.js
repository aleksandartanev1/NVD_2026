// function sumAll2() {
//     const args = [...arguments];
// }
//
// console.log(sumAll2(1, 2, 3));   // 6

// function mergeAll(...args) {
//     console.log(args.reduce((acc, o) => ({...acc, ...o}),{}))
// }
//
// mergeAll({ a: 1 }, { b: 2 }, { a: 3 })   // { a: 3, b: 2 }

// function join(arr1, arr2) {
//     const all = [...arr1, ...arr2]
//
//     const byId = all.reduce((acc, o) => {
//     acc[o.id] = {...acc[o.id], ...o}
//         return acc;
// }
//         ,{})
//
//     return Object.values(byId).sort((a,b) => a.id - b.id)
//
//
// }
//
// const arr1 = [{ id: 1, x: 2, y: 3 }, { id: 2, x: 3, y: 6 }];
// const arr2 = [{ id: 2, x: 10, z: 7 }, { id: 3, x: 5 }];
//
// console.log(join(arr1, arr2));
// // [ { id: 1, x: 2, y: 3 },
// //   { id: 2, x: 10, y: 6, z: 7 },
// //   { id: 3, x: 5 } ]


// function mergeStock(shop1, shop2) {
//     const allproducts = [...shop1, ...shop2]
//
//     const byName = allproducts.reduce((acc, o) => {
//         if (acc[o.name]) {
//             acc[o.name].qty += o.qty;
//         } else {
//             acc[o.name] = {...o};
//         }
//         return acc;
//         }
//         ,{})
//
//     return Object.values(byName).sort((a,b) =>  b.qty - a.qty)
// }
//
//
// const shop1 = [{ name: 'apple', qty: 5 }, { name: 'pear', qty: 2 }];
// const shop2 = [{ name: 'apple', qty: 3 }, { name: 'kiwi', qty: 10 }];
//
// console.log(mergeStock(shop1, shop2));
// // [ { name: 'kiwi',  qty: 10 },
// //   { name: 'apple', qty: 8 },   ← 5 + 3
// //   { name: 'pear',  qty: 2 } ]


function groupByYear(students) {
    return students.reduce((acc, o) => {
        if (acc[o.year]) {
            acc[o.year].push(o.name)
        } else {
            acc[o.year] = [o.name]
        }
        return acc; }
        ,{})
}

console.log(groupByYear(students));
// { 1: ['Dejan'],
//   2: ['Bojan'],
//   3: ['Ana', 'Ivana', 'Marija'] }