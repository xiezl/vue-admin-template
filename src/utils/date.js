// 日期自动补全
function autoAdd(date) {
  return String(date).padStart(2, '0')
}

// 将ms转换标准时间格式
export function convertDate(ms) {
  const date = new Date(ms)
  const year = date.getFullYear()
  const month = autoAdd(date.getMonth() + 1)
  const day = autoAdd(date.getDate())
  const hours = autoAdd(date.getHours())
  const minutes = autoAdd(date.getMinutes())
  const seconds = autoAdd(date.getSeconds())
  return `${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`
}
