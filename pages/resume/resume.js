import { Config } from '../utils/config.js'
import { Resume } from '../resume/resume-model.js'
import { Base } from '../utils/base.js'

const resume = new Resume()
const base = new Base()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年龄
    age_data: Config.age_data,
    // 性别
    sex_data: Config.sex_data,
    // 经验
    work_exp_data: Config.work_exp_data,
    // 学历
    education_data: Config.education_data,
    // 意向职位
    expectation_position_data: Config.expectation_position_data,
    // 期望薪资
    expectation_pay_data: Config.expectation_pay_data,
    // 求职区域
    work_place_data: Config.work_place_data,
    // 工作性质
    work_nature_data: Config.work_nature_data,
    // 到岗时间
    report_time_data: Config.report_time_data,
    // 目前状态
    current_state_data: Config.current_state_data,

    //地区选择器——
    PickerChange_index: 0,

    //当前年份
    year: (new Date).getFullYear()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_Resume_List()  //获取简历列表
console.log(this.data.year)
  },



  //获取简历列表
  get_Resume_List: function (area = 0) {
    resume.get_Resume_List(area, (res) => {
      console.log(res)
      this.setData({ resume: res })
    })
  },


  //地区选择器
  PickerChange_resume: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.get_Resume_List(e.detail.value) //调用接口请求resume数据
    this.setData({ PickerChange_index: e.detail.value })
  },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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