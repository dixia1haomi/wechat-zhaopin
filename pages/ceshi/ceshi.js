import { Base } from '../utils/base.js'
import { Token } from '../utils/token.js'
import { Authorize } from '../utils/authorize.js'

const authorize = new Authorize()
const token = new Token()
const base = new Base()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取当前地理位置
  getLocation() {
    authorize.authorize_address((res) => {
      console.log('ceshi', res)
      res && wx.chooseAddress({ success(res) { console.log('ceshi-success', res) } })

    })
  },

  tokenuserinfu() {
    token.tokenUserInfo((res) => {
      console.log('222', res)
    }, (err) => {
      console.log('err', err)
    })
  },

  // 初始化登录
  chushihuadenglu() {
    console.log('初始化登录')
    token.verify()
    // token.getTokenFromServer((res)=>{
    //   console.log('aaaaa',res)
    // })
  },

  //解密
  jiemi() {
    this.qingqiu(this.data.info, this.data.code, (res) => {
      console.log('结果', res)
    })
  },




  // 获取用户信息
  getuserinfo() {

    authorize.authorize_UserInfo()

  },



  getstate() {
    wx.checkSession({
      success: function () {
        console.log('session 未过期，并且在本生命周期一直有效')
      },
      fail: function () {
        console.log('fail 登录态过期')
      }
    })
  },


  see() {


    const app = getApp()
    let info = app.appData.authorizeUserInfo
    console.log('see - quanju', info)
  },


  onLoad: function (op) {
    // console.log('ceshi_onLoadop', op)

  },


  onReady: function () {

  },

  onShow: function () {

  },

})