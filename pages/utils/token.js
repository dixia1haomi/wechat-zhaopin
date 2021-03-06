import { Config } from '../utils/config.js'

const app = getApp()
class Token {

  constructor() {
    this.tokenUrl = Config.restUrl + 'token/user';
    this.verifyUrl = Config.restUrl + 'token/verify';
  }

  //检查token是否有效
  verify() {
    let token = wx.getStorageSync('token_key')
    //用户可能第一次来，缓存中没有token
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._veirfyFromServer(token)
    }
  }


  //去服务器获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log('来自getTokenFromServer内部', res.code)
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: { code: res.code },
          success: function (res) {
            console.log('来自getTokenFromServer内部request', res.data.token_key)
            wx.setStorageSync('token_key', res.data.token_key)
            callBack && callBack(res.data.token_key);
          }
        })
      }
    })
  }



  // 去服务器检查token是否有效
  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: { token: token },
      success: function (res) {
        var valid = res.data.isValid
        if (!valid) { that.getTokenFromServer() }   //里面可以实现登录检测，未登录用户检查是否授权，未授权调用授权，已授权调用获取token，******
      }
    })
  }

}

export { Token }

