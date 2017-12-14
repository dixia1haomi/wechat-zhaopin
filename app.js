
import { Token } from '/pages/utils/token.js'

const token = new Token()

App({
  onLaunch: function () {
    // 检查token是否失效，失效重新请求一个
    token.verify()

    // 检查userinfo是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.appData.authorizeUserInfo = true
        }
      }
    })
  },


  appData: {
    authorizeUserInfo: false,
  },

  globalData: {

  }
})