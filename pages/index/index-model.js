import { Base } from '../utils/base.js'

class Index extends Base {

  constructor() {
    super()
  }

  // //查询job列表
  // get_Job_List(callBack) {
  //   var params = {
  //     url: 'job',
  //     sCallback: function (res) {
  //       callBack && callBack(res)
  //     }
  //   }
  //   this.request(params)
  // }

  // //查询job详细信息
  // get_Job_Detail(id,callBack) {
  //   var params = {
  //     url: 'job/'+ id,
  //     data:id,
  //     sCallback: function (res) {
  //       callBack && callBack(res)
  //     }
  //   }
  //   this.request(params)
  // }

}

export { Index };


