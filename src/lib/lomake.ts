export function processForm(data: FormData, required: string[], expectArr: string[]) {
    let missing = new Set(required)
    const expected = new Set(expectArr)
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