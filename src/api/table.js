import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/table/list',
    url: '/order/pool',
    method: 'get',
    params
  })
}

export function getWriterList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function addWriter(data, params) {
  return request({
    url: '/user',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function changeWriterPwd(id, data, params) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function getAllOrder(params) {
  return request({
    url: `/order/admin_view`,
    method: 'get',
    params
  })
}

export function getOrderList(params) {
  return request({
    url: '/order/user_view',
    method: 'get',
    params
  })
}

export function addOrder(data, params) {
  return request({
    url: '/order',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function editOrder(data, params) {
  console.log('editing')
  console.log(data)
  return request({
    url: '/order',
    method: 'put',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function getOrderDetail(id, params) {
  return request({
    url: `/order/${id}`,
    method: 'get',
    params
  })
}

export function deleteOrder(id, params) {
  return request({
    url: `/order/${id}`,
    method: 'delete',
    params
  })
}

export function completeOrder(id, params) {
  return request({
    url: `/order/${id}/upload`,
    method: 'put',
    params
  })
}

export function getDiscussion(params) {
  return request({
    url: '/discussion',
    method: 'get',
    params
  })
}

export function acceptOrder(id, params) {
  return request({
    url: `/order/${id}/accept`,
    method: 'put',
    params
  })
}

export function assignOrder(id, params) {
  return request({
    url: `/order/${id}/assign`,
    method: 'put',
    params
  })
}

export function getFileId(data, config, params) {
  return request({
    url: '/file',
    method: 'post',
    data: data,
    config: config,
    params
  })
}

export function deleteDetailFile(id, params) {
  return request({
    url: `/order/${id}/detail_file`,
    method: 'delete',
    params
  })
}

export function deletePreviewFile(id, params) {
  return request({
    url: `/order/${id}/preview_file`,
    method: 'delete',
    params
  })
}

export function sendDiscussion(data, params) {
  return request({
    url: '/discussion',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function deleteDiscussion(id, params) {
  return request({
    url: `/discussion/${id}`,
    method: 'delete',
    params
  })
}

export function getMsgNum(params) {
  return request({
    url: '/message/unread_num',
    method: 'get',
    params
  })
}

export function getMsgList(params) {
  return request({
    url: '/message/list',
    method: 'get',
    params
  })
}

export function markRead(id, params) {
  return request({
    url: `/message/${id}/read`,
    method: 'put',
    params
  })
}
