const students = [
    { name: 'Ana',    year: 3, grades: [10, 9, 8],  active: true  },
    { name: 'Bojan',  year: 2, grades: [6, 7, 5],   active: true  },
    { name: 'Ivana',  year: 3, grades: [10, 10, 9], active: false },
    { name: 'Dejan',  year: 1, grades: [5, 6, 6],   active: true  },
    { name: 'Marija', year: 3, grades: [7, 8, 9],   active: true  }
];

//console.log(students.filter(student => student.year === 3))

// thirdyears = students.filter(student => student.year === 3)

//console.log(thirdyears.map(student => student.name).join(', '))

//console.log(students.every(student => student.grades.length >= 3));

//console.log(students.reduce((acc, student) => student.active ? acc + 1 : acc, 0))

// console.log(students.filter(student => student.year ===3 && student.active)
//     .reduce((acc, student) => acc + student.grades
//         .reduce((a, g) => a + g, 0), 0))

// console.log(students.filter(student => student.active)
//     .reduce((acc, student) => acc + student.year, 0))

//console.log(students.reduce((acc, student) => student.active ? acc + student.year : acc, 0))

// console.log(students.reduce((max, student) => max === undefined || (student.grades
//     .reduce((sum, grade) => sum + grade, 0) / student.grades.length) > max ? max = (student.grades
//     .reduce((sum, grade) => sum + grade, 0) / student.grades.length) : max, 0))

// console.log(
//     students.reduce((best, student) =>
//     best.grades.reduce((sum, grade) => sum + grade, 0) / best.grades.length >
//         student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length
//         ? best : student).name
// )

// console.log(
//     students.reduce((accumulator, student) => {
//         const tens = student.grades.reduce((sum, grade) => grade === 10 ? sum + 1 : sum, 0);
//         return accumulator + tens;
//     }, 0)
// )

// const sum_peaks = arr => arr.reduce((sum, x, i) =>
//     (i === 0 || arr[i - 1] < x) && (i === arr.length - 1 || arr[i + 1] < x)
//         ? sum + x : sum, 0);
//
// console.log(sum_peaks([1, 2, 1, 5, 3, 1, 4, 1, 0, 1, 1, 1, 0, 0, 0, 0]));   // 11

const count_rises = array => array.reduce((count, x, i) =>
        (i !== 0 && array[i - 1] < x) ? count + 1 : count
    , 0);


console.log(count_rises([1,2,3]));   // 3