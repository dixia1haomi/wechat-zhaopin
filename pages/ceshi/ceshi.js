import { Base } from '../utils/base.js'
import { Token } from '../utils/token.js'
import { Authorize } from '../utils/authorize.js'

const authorize = new Authorize()
const token = new Token()
const base = new Base()


const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],

    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    //---------------
    sheetState: '',
    sheetDownItem: '',
    sheetDownIndex: '',

    //-----------
    checkboxState: '',
    checkboxValue: '',
    checkboxValueStr: '',

    //----------
    textareaState: '',
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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

  ceshiget() {
    this.ceshigetaa(res => {
      console.log('aaaceshi', res)
    })
  },

  ceshigetaa(callBack) {
    let params = {
      url: 'job/ceshi',
      data: {
        id: 140,
        user_id: 16,
        job_user_name: 123,
        work_area: 1,
        phone: 5
      },
      sCallback: function (res) { callBack && callBack(res) }
    }
    base.request(params)
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

  // ----------------------------------------
  sheetTap() {
    this.setData({ sheetState: true })
    console.log('sheetTap')
  },
  itemE(e) {
    console.log('index-itemE', e.detail)
    this.setData({ sheetDownItem: e.detail.item, sheetDownIndex: e.detail.index })
  },

  //-------------------------------
  checkboxTap() { this.setData({ checkboxState: true }) },
  checkboxitemE(e) { this.setData({ checkboxValue: e.detail, checkboxValueStr: e.detail.toString() }) },

  // ---------textarea----------
  textareaTap(){
    this.setData({ textareaState: true })
  },

  textarea(e){
    console.log('textarea',e.detail)
    this.setData({ textarea: e.detail })
  },
})