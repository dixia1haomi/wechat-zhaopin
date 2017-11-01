import { Base } from '../../utils/base.js'

class Company extends Base {

  constructor() {
    super()
  }




  //查询公司详细信息
  get_Company_Detail(id, callBack) {
    var params = {
      url: 'company/detail/' + id,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }


  //创建公司
  create_Company(data, callBack) {
    let params = {
      url: 'company/create',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }


  //更新公司
  update_Company(data, callBack) {
    let params = {
      url: 'company/update',
      method: 'POST',
      data: data,
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

  //删除公司
  delete_Company(id, callBack) {
    let params = {
      url: 'company/delete',
      method: 'POST',
      data: { id: id },
      sCallback: function (res) { callBack && callBack(res) }
    }
    this.request(params)
  }

}

export { Company }