export function processForm(data: FormData, required: Set<string>, expected: Set<string>) {
    let missing = required
    let entries: Map<string, string> = new Map()
    for (let [name, value] of data) {
        if (expected.has(name)) {
            value = value.toString().trim()
            if (value.length) {
                entries.set(name, value)
                missing.delete(name)
            }
        }

    }
    return { entries, missing }
}