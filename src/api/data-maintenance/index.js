import request from '@/utils/request'

// 添加学院

export function addCollege(data) {
    return request({
        url: '/data-maintenance/add-college',
        method: 'post',
        data

    })
}


// 添加基层教学组织名称

export function addOrganization(data) {
    return request({
        url: '/data-maintenance/add-organization',
        method: 'post',
        data
    })
}

// 批量导入

export function addImportOrganization(data) {
    return request({
        url: '/data-maintenance/add-import-organization',
        method: 'post',
        data
    })
}


// 批量导入专业及其代码
export function addImportMajors(data) {
    return request({
        url: '/data-maintenance/add-import-majors',
        method: 'post',
        data
    })
}



// 获取所有的教学组织列表名称
export function getOrganizationsInfo() {
    return request({
      url: '/data-maintenance/get-organizations',
      method: 'get',
  
    })
  }

  // 获取所有的专业及其代码
  export function getMajorsInfo() {
    return request({
      url: '/data-maintenance/get-majors',
      method: 'get',
  
    })
  }


