/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor', 'writer1']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
