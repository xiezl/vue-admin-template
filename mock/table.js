import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|2': [{
        id: 3,
        due_time: '2019-03-08 11:03:03',
        subject: 'abcd',
        word: '7000',
        calculation_status: '1',
        special_requirement: 'none',
        reference: 'abcd',
        addition_info: 'some more 事情',
        update_time: '2019-03-09 02:48:26',
        over_due: 0,
        remain_time: -1666
        // id: '@id',
        // title: '@sentence(10, 20)',
        // 'status|1': ['published', 'draft', 'deleted'],
        // author: 'name',
        // display_time: '@datetime',
        // pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
