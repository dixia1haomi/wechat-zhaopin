import { Resume } from '../resume/resume-model.js'
import { Config } from '../utils/config.js'

const resumeModel = new Resume()

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

    //当前年份
    year: (new Date).getFullYear()
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    // console.log(op.id)
    this.get_Resume_Detail(op.id)
  },



  //查询resume详细信息
  get_Resume_Detail: function (id) {
    resumeModel.get_Resume_Detail(id, (res) => {
      console.log('resume详细信息',res)
      this.setData({
        resume_detail: res
      })
    })
  },


  phone_tap(){
  console.log('phone', this.data.resume_detail.phone)
  wx.makePhoneCall({
    phoneNumber: this.data.resume_detail.phone //仅为示例，并非真实的电话号码
  })
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