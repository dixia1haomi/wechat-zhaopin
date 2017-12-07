
import { Base } from '../utils/base.js'

class Resume extends Base {

  constructor() {
    super()
  }

  //查询简历列表-post->接受page分页，post请求的data对象，成功回调
  get_Resume_List(page, data, callBack) {
    var params = {
      url: 'resume?page=' + page,
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //查询简历详细信息
  get_Resume_Detail(id, callBack) {
    var params = {
      url: 'resume/detail/' + id,
      data: id,
      sCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }


  //创建简历
  create_resume(data, callBack) {
    let params = {
      url: 'resume/create',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //更新简历
  update_resume(data, callBack) {
    let params = {
      url: 'resume/update',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //删除简历
  delete_resume(id, callBack) {
    let params = {
      url: 'resume/delete',
      method: 'POST',
      data: { id: id },
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }


}




export { Resume }






