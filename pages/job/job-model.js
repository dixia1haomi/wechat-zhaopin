import { Base } from '../utils/base.js'

class Job extends Base {

  constructor() {
    super()
  }

  //查询job列表
  get_Job_List(work,callBack) {
    var params = {
      url: 'job/' + work,
      sCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  //查询job详细信息
  get_Job_Detail(id, callBack) {
    var params = {
      url: 'job/detail/' + id,
      data: id,
      sCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  //创建岗位

  //更新岗位

  //删除岗位

}

export {Job}