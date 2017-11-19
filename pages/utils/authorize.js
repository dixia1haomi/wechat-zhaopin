import { Base } from './base.js'
const base = new Base()

const app = getApp()

// 用户授权类
class Authorize {
  constructor() { }

  // 授权用户信息 并且储存到服务器_updateUserIfo
  authorize_UserInfo(callBack) {
    wx.getUserInfo({
      withCredentials: false,
      success: (res) => {
        console.log('authorize_UserInfo - success', res.userInfo)
        app.appData.authorizeUserInfo = true  //设置全局用户信息授权变量
        wx.setStorageSync('userinfo', res.userInfo) //缓存用户信息
        callBack && callBack(res.userInfo)
        // 服务器储存 **
        this._updateUserIfo(res.userInfo, (call) => {
          console.log('call', call)
        })
      },
      fail: (err) => {
        console.log('authorize_UserInfo - fail', err)
        wx.openSetting({
          success: (res) => {
            console.log('authorize_UserInfo - fail - openSetting - success', res)
            if (res.authSetting['scope.userInfo']) { this.authorize_UserInfo() }
          }
        })
      }
    })
  }

  _updateUserIfo(res, callBack) {
    console.log('aaa', res)
    // let nickName = res.nickName
    // let avatar_url = res.avatarUrl
    // let gender = res.gender
    // delete res.avatarUrl;  //将昵称去除
    // delete res.nickName;  //将昵称去除
    // delete res.gender;  //将昵称去除

    var Params = {
      url: 'user/wx_userinfo',
      method: 'POST',
      data: { nickname: res.nickName, avatar_url: res.avatarUrl, gender: res.gender, province: res.province, city: res.city },
      // sCallback: function (data) { }
      sCallback: function (data) { callBack && callBack(data) }
    };
    base.request(Params)
  }

  // 授权地图

  // 授权电话号码

}

export { Authorize }