

function countByYear(students) {
    return students.reduce((acc, o) =>  {
        if (acc[o.year]) {
            acc[o.year] = acc[o.year] + 1
        } else {
            acc[o.year] = 1
        }
        return acc
    },{})
}

function sumGradesByYear(students) {
    return students.reduce((acc, o) => {
        const gradesum = o.grades.reduce((sum, g) => sum + g, 0);

        if (acc[o.year]) {
            acc[o.year] = acc[o.year] + gradesum;
        } else {
            acc[o.year] = gradesum;
        }
        return acc;
    }, {});
}


console.log(sumGradesByYear(students));
// { 1: 17, 2: 18, 3: 80 }

console.log(countByYear(students));
// { 1: 1, 2: 1, 3: 3 }

