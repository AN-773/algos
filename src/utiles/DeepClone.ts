export default function deepCloneArray<T>(array: T[], customClone?: (obj: T) => T): T[] {
  let newArray: T[] = [];
  array.forEach((e) => {
    if (customClone) {
      newArray.push(customClone(e))
    } else {
      newArray.push({...e})
    }
  })
  return newArray
}