function historize(obj) {
    const changes = []
    return {
        value() {
            return obj
        },

        change(n) {
            changes.push(n)
        },

        apply(i = changes.length) {
            const apply = changes.splice(0, i);
            for (const c of apply) Object.assign(obj, c);
        },

        rollback(x = 1) {
            changes.splice(changes.length - x, x);
        },

        get(i) {
            return changes[i - 1];
        }
    }
}