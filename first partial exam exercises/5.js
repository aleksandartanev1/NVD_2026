arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
]

arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]

// output
// [
// {"id": 1, "x": 2, "y": 3},
//     {"id": 2, "x": 10, "y": 20},
//     {"id": 3, "x": 0, "y": 0}
// ]

function mergedArray(arr1, arr2) {
    const merged = [...arr1, ...arr2]

    const byId = merged.reduce((acc, o) => {
        acc[o.id] = {...acc[o.id], ...o}
        return acc;
        }
        ,{})

    return Object.values(byId).sort((a,b) => a.id - b.id)
}

console.log(mergedArray(arr1, arr2))