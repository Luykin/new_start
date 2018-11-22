const service_icon = {
  '2': 'https://cdn.xingkwh.com/%E9%A6%96%E9%A1%B5-%E5%BF%AB%E6%89%8B%E9%80%89%E4%B8%AD@3x.png', //快手
  '4': 'https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E6%8A%96%E9%9F%B3%E9%80%89%E4%B8%AD.png', //抖音
  '12': 'https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E6%8A%96%E9%9F%B3%E6%9D%83%E9%99%90%E9%80%89%E4%B8%AD@3x.png', //抖音权限
}

const com_icon = {
  '3': 'https://cdn.xingkwh.com/%E4%B8%BB%E9%A1%B5%E5%88%86%E7%B1%BB-%E5%A5%97%E9%A4%90%E6%9D%83%E9%99%90%E9%80%89%E4%B8%AD@3x.png' //抖音套餐
}

export function get_service_icon(category) {
  if (category in service_icon) {
    return service_icon[category]
  } else {
    return ''
  }
}

export function get_com_icon(category) {
  if (category in com_icon) {
    return com_icon[category]
  } else {
    return ''
  }
}
