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

export function formatMinutes(minutes) {
  if (minutes == null || minutes === 0) {
    return ''
  }
  const days = Math.floor(minutes / (60 * 24))
  minutes %= 60 * 24
  const hours = Math.floor(minutes / 60)
  minutes %= 60
  if (days > 0) {
    return `${days} Days ${hours} Hours ${minutes} Minutes`
  } else if (hours > 0) {
    return `${hours} Hours ${minutes} Minutes`
  } else {
    return `${minutes} Minutes`
  }
}

export function statusToString(status) {
  if (status === 0) {
    return 'Unassigned'
  }
  if (status === 1) {
    return 'In Progress'
  }
  if (status === 2) {
    return 'Submitted'
  }
  return ''
}
