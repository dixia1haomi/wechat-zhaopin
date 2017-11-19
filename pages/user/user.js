import { User } from 'user-model.js'
import { Authorize } from '../utils/authorize.js'

var authorize = new Authorize()
var user = new User()

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // user: false,
    login: false,
    userinfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    console.log('onLoad')
  },


  //登录
  login: function () {
    authorize.authorize_UserInfo((res) => {
      console.log('login',res)
      this.onShow()
    })
  },

  // 我的页面 - 详细信息
  userDetail() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user/user-detail/user-detail' }) : this.login()
  },

  // 我的页面 - 我的公司
  userCompany() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user/user-company/user-company' }) : this.login()
  },

  // 我的页面 - 我的岗位
  userJob() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user/user-job/user-job' }) : this.login()
  },

  // 我的页面 - 我的简历
  userResume() {
    // 获取全局用户信息是否授权变量 ？ 跳转：调用授权
    app.appData.authorizeUserInfo ? wx.navigateTo({ url: '/pages/user/user-resume/user-resume' }) : this.login()
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    app.appData.authorizeUserInfo && this.setData({ login: true, userinfo: wx.getStorageSync('userinfo') })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})