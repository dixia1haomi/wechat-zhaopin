import { User } from 'user-model.js'
import { Authorize } from '../utils/authorize.js'

var authorize = new Authorize()
var user = new User()

const app = getApp()

Page({

  data: {
    // user: false,
    login: false,
    userinfo: null
  },

  //生命周期函数--监听页面加载
  onLoad: function (op) {
    console.log('onLoad')
  },

  // 登录 **（可以考虑移植到全局）
  login: function () {
    authorize.authorize_userinfo((res) => {   //授权
      console.log('login', res)
      if (res) {
        wx.getUserInfo({  //  获取用户信息
          withCredentials: false,
          success: (res) => {
            console.log('success', res)
            user.updateUserInfo(res.userInfo, (data) => { // 调用 更新数据
              console.log('数据储存成功', data)
              app.appData.authorizeUserInfo = true  // 服务器回调了succsee后设置全局用户信息授权变量
              wx.setStorageSync('userinfo', res.userInfo) // 服务器回调了succsee后缓存用户信息
              this.onShow() //刷新页面
            })
          }
        })
      }
    })
  },

  // 我的页面 - 详细信息
  // userDetail() {
  //   // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
  //   app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user-detail/user-detail' }) : this.login()
  // },

  // 我的页面 - 我的公司
  userCompany() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user-company/company' }) : this.login()
  },

  // 我的页面 - 我的岗位
  userJob() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user-job/user-job' }) : this.login()
  },

  // 我的页面 - 我的简历
  userResume() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user-resume/user-resume' }) : this.login()
  },

  // 关于我
  guanyuwo() {
    wx.navigateTo({ url: '/pages/user-about/about' })
  },



  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
    // console.log('onReady')
  },

  //生命周期函数--监听页面显示
  onShow: function () {
    console.log('onShow')
    if (app.appData.authorizeUserInfo) {
      this.setData({ login: true, userinfo: wx.getStorageSync('userinfo') })
    }else{
      console.log('没有登录成功')
    }
    // app.appData.authorizeUserInfo && this.setData({ login: true, userinfo: wx.getStorageSync('userinfo') })
  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () { },
  //用户点击右上角分享
  onShareAppMessage: function () { }
})