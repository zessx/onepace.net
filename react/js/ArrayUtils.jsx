export default class ArrayUtils {
  static mapMany = (arr, mapper) => {
    return arr.reduce((prev, curr) => {
      return prev.concat(mapper(curr));
    }, []);
  }
}
