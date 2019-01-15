import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID,
  CHANNEL
} from './config'
import {
  getSign,
  getTime
} from 'common/js/util'

// export function appinfo() {
//   const url = `${PREFIX_URL}/app_info`
//   let data = {
//     uaid: UAID
//   }
//   return axios.get(url, {
//     params: Object.assign({
//       sign: getSign(data)
//     }, data)
//   }).then(function (res) {
//     return Promise.resolve(res)
//   }).catch(res => {
//     return Promise.resolve(res.response.status)
//   })
// }
//
// export function combos_category() {
//   const url = `${PREFIX_URL}/combos_category`
//   let data = {
//     uaid: UAID
//   }
//   return axios.post(url, qs.stringify(Object.assign({
//     sign: getSign(data)
//   }, data))).then(function (res) {
//     return Promise.resolve(res)
//   }).catch(res => {
//     return Promise.resolve(res.response.status)
//   })
// }

// 悬赏具体类别(抖音粉丝...)
export function pub_task(service_group_id) {
  const url = `${PREFIX_URL}/pub_task`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    service_group_id
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 登录
export function login(wx_login_code, super_code) {
  const url = `${PREFIX_URL}/login`
  let data = {
    uaid: UAID,
    wx_login_code,
    timestamp: getTime(),
    user_channel: CHANNEL
  }
  if (super_code) {
    Object.assign(data, {
      super_code
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 用户更新
export function update_user_info(username) {
  const url = `${PREFIX_URL}/update_user_info`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布任务
export function pay_and_pub_task(id, title, task_url, num, single_price, price, score, username) {
  const url = `${PREFIX_URL}/pay_and_pub_task`
  let data = {
    id,
    title,
    task_url,
    num,
    single_price,
    price,
    score,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 主页
export function home_page(page, num) {
  const url = `${PREFIX_URL}/home_page`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 任务详情
export function task_detail(id, username) {
  const url = `${PREFIX_URL}/task_detail`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    id,
    username
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发布列表
export function release_management(username, page, num) {
  const url = `${PREFIX_URL}/release_management`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    username,
    page,
    num
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 商品列表
export function goods() {
  const url = `${PREFIX_URL}/goods`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 报名
export function sign_up(id, username) {
  const url = `${PREFIX_URL}/sign_up`
  let data = {
    id,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 七牛云token
export function up_token() {
  const url = `${PREFIX_URL}/up_token`
  let data = {
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 提交任务或者申请仲裁
export function sub_or_arb(username, id, sub_type, task_image, appeal_user_image, appeal_user_explain, task_nickname) {
  const url = `${PREFIX_URL}/sub_or_arb`
  let data = {
    id,
    username,
    sub_type,
    uaid: UAID,
    timestamp: getTime(),
  }
  if (task_image) {
    Object.assign(data, {
      task_image
    })
  }
  if (appeal_user_image) {
    Object.assign(data, {
      appeal_user_image,
      appeal_user_explain
    })
  }
  if (task_nickname) {
    Object.assign(data, {
      task_nickname
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 任务大厅
export function task_hall(service_group_id, page, num) {
  const url = `${PREFIX_URL}/task_hall`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
    page,
    num,
  }
  if (service_group_id) {
    Object.assign(data, {
      service_group_id
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 单个任务的列表-----
export function task_audit(id, username, types, page, num) {
  const url = `${PREFIX_URL}/task_audit`
  let data = {
    id,
    types,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 通过不通过
export function pass_or_fail_task(id, task_id, username, click_type, task_message) {
  const url = `${PREFIX_URL}/pass_or_fail_task`
  let data = {
    id,
    task_id,
    username,
    click_type,
    uaid: UAID,
    timestamp: getTime(),
  }
  if (task_message) {
    Object.assign(data, {
      task_message
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 我的任务
export function my_task(task_type, username, page, num) {
  const url = `${PREFIX_URL}/my_task`
  let data = {
    task_type,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 举报维权列表
export function rights_protection(rp_type, username, page, num) {
  const url = `${PREFIX_URL}/rights_protection`
  let data = {
    rp_type,
    page,
    num,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提交辩诉
export function sub_of_plea(id, username, plea_user_image, plea_user_explain) {
  const url = `${PREFIX_URL}/sub_of_plea`
  let data = {
    id,
    plea_user_image,
    plea_user_explain,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 订单列表
export function orders(username, page, num) {
  const url = `${PREFIX_URL}/orders`
  let data = {
    username,
    uaid: UAID,
    page,
    num,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现列表
export function withdraw_list(username, page, num) {
  const url = `${PREFIX_URL}/withdraw_list`
  let data = {
    username,
    uaid: UAID,
    page,
    num,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 下单
export function order(id, username, price, score) {
  const url = `${PREFIX_URL}/order`
  let data = {
    id,
    price,
    score,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现商品列表
export function withdraw_good() {
  const url = `${PREFIX_URL}/withdraw_good`
  let data = {
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 提现
export function withdraw(id, username, price) {
  const url = `${PREFIX_URL}/withdraw`
  let data = {
    id,
    username,
    price,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 置顶
export function set_top_task(id, username, top_score) {
  const url = `${PREFIX_URL}/set_top_task`
  let data = {
    id,
    username,
    top_score,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


export function bind_phone(code, phone, username) {
  const url = `${PREFIX_URL}/bind_phone`
  let data = {
    code,
    phone,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 发生验证码
export function send_verify(phone) {
  const url = `${PREFIX_URL}/send_verify`
  let data = {
    phone,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

// 取消任务
export function cancel_publication(id, username) {
  const url = `${PREFIX_URL}/cancel_publication`
  let data = {
    id,
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}


// 查看团队
export function see_team(username) {
  const url = `${PREFIX_URL}/see_team`
  let data = {
    username,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//jsapi_code
export function jsapi_code(js_url) {
  const url = `${PREFIX_URL}/jsapi_code`
  let data = {
    url: js_url,
    uaid: UAID,
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

//跑马灯
export function with_draw() {
  const url = `${PREFIX_URL}/message/with/draw`
  let data = {
    timestamp: getTime(),
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res);
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}
