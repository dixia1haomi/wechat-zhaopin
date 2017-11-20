import { Base } from '../utils/base.js'
// import { Token } from '../utils/token.js'

// const token = new Token()

class User extends Base {

  constructor() {
    super()
  }

  //更新用户信息
  updateUserInfo(res, scallBack) {
    console.log('updateUserInfo', res)
    var Params = {
      url: 'user/wx_userinfo',
      method: 'POST',
      data: { nickname: res.nickName, avatar_url: res.avatarUrl, gender: res.gender, province: res.province, city: res.city },
      sCallback: function (data) { scallBack && scallBack(data) }
    }
    this.request(Params)
  }

  //查询用户关联的岗位
  getUserJob_Model(callBack) {
    this.request({      //发送请求
      url: 'user/job',
      method: 'POST',
      sCallback: function (res) { callBack && callBack(res) }
    })
  }

  //查询用户关联的公司
  getUserCompany_Model(callBack, eCallback) {
    this.request({      //发送请求
      url: 'user/company',
      method: 'POST',
      sCallback: function (res) { callBack && callBack(res) }
    })
  }


  //查询用户的详细信息
  getUserDetail_Model(callBack) {
    this.request({      //发送请求
      url: 'user',
      method: 'POST',
      sCallback: function (res) { callBack && callBack(res) }
    })
  }

  //查询用户关联的简历
  getUserResume_Model(callBack) {
    this.request({      //发送请求
      url: 'user/resume',
      method: 'POST',
      sCallback: function (res) { callBack && callBack(res) }
    })
  }








}

export { User }