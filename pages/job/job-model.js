import { Base } from '../utils/base.js'

const base = new Base()

class Job extends Base {

  constructor() {
    super()
  }

  //查询job列表
  get_Job_List(work, callBack) {
    let params = {
      url: 'job/' + work,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //查询job详细信息
  get_Job_Detail(id, callBack) {
    let params = {
      url: 'job/detail/' + id,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }


  //创建岗位
  create_job(data, callBack) {
    let params = {
      url: 'job/create',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //更新岗位
  update_job(data, callBack) {
    let params = {
      url: 'job/update',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //删除岗位
  delete_Job(id, callBack) {
    let params = {
      url: 'job/delete',
      method: 'POST',
      data: { id: id, token_key: wx.getStorageSync('token_key') },
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }




}

export { Job }