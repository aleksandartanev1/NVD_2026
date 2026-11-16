function getDoubleN(n) {
    let current = n
    return function() {
        current = current * 2;
        return current;
    }
}
