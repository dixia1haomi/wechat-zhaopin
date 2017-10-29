import { Base } from '../utils/base.js'

class User extends Base{

  constructor(){
    super()
  }

  //登录

  //查询我发布的岗位
  getUserJob_Model(callBack) {
    var token_key = wx.getStorageSync('token_key')  //携带token
    this.request({      //发送请求
      url: 'user/job',
      method: 'POST',
      data: { 'token_key': token_key },
      sCallback: function (res) {
        callBack && callBack(res)
      }
    })
  }

  //查询我的公司
  getUserCompany_Model(callBack) {
    var token_key = wx.getStorageSync('token_key')  //携带token
    this.request({      //发送请求
      url: 'user/company',
      method: 'POST',
      data: { 'token_key': token_key },
      sCallback: function (res) {
        callBack && callBack(res)
      }
    })
  }


  //查询我的详细信息
  getUserDetail_Model(callBack){
    var token_key = wx.getStorageSync('token_key')  //携带token
    this.request({      //发送请求
      url: 'user',
      method: 'POST',
      data: { 'token_key': token_key },
      sCallback: function (res) {
        callBack && callBack(res)
      }
    })
  }

  //查询我的简历
  getUserResume_Model(callBack) {
    var token_key = wx.getStorageSync('token_key')  //携带token
    this.request({      //发送请求
      url: 'user/resume',
      method: 'POST',
      data: { 'token_key': token_key },
      sCallback: function (res) {
        callBack && callBack(res)
      }
    })
  }








}

export {User}