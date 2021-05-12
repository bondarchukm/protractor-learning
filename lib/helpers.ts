export function validateAscendSorting(array: string[] | number[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] <= array[i + 1]) {
            continue
        } else {
            return false
        }
    }
    return true
}
export function validateDescendSorting(array: string[] | number[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] >= array[i + 1]) {
            continue
        } else {
            return false
        }
    }
    return true
}
