function sum_peaks(array) {
    return array.reduce((acc, number, index) =>
        index !== 0 && array[index - 1] < number && number > array[index + 1] && index !== array.length - 1 ? acc + number : acc
    ,0)
}



let x = [1, 2, 1, 5, 3, 1, 4, 1, 0, 1, 1, 1, 0, 0, 0, 0];
console.log(sum_peaks(x))