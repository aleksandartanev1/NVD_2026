function createTagCollector(formatFn) {
    const tags = {};
    return {
        add(tag, value) {
            if (!tags[tag]) tags[tag] = [];
            tags[tag].push(value);
        },

        clearTag(tag) {
            if (tags[tag]) delete tags[tag];
        },

        report(tag) {
            if (!tags[tag] || tags[tag].length === 0) return null;
            return formatFn(tag, tags[tag]);
        },

        reportAll() {
            const result = [];
            const keys = Object.keys(tags).sort();

            for (const tag of keys) {
                result.push(formatFn(tag, tags[tag]));
            }
            return result;
        }


    }
}