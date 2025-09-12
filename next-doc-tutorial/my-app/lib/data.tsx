import { cache } from 'react'
;('server-only')
export function getPost(id: any) {
  const myPost = setTimeout(() => {}, 1000)
  return myPost
}
export async function checkIsAvailable() {
  return true
}

export const getItem = cache(async (id: string) => {
  return id
})
// export async function getItem(id: string) {
//   // void evaluates the given expression and returns undefined
//   // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
//   return id
// }
