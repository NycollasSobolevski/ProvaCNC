export default interface GetAllReturn<T> {
  items: T[],
  next : boolean,
  count: number,
  pages: number
}
