export function count(data) {
  let word_num = 0
  let marks_num = 0
  let bonus_num = 0
  data.forEach(e => {
    word_num += e.word
    if (e.marks) marks_num += e.marks
    if (e.bonus) bonus_num += e.bonus
  })
  return { countWord: word_num, avgMarks: marks_num / data.length, countBonus: bonus_num }
}
