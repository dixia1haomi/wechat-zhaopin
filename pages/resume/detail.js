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
    // sex_data: Config.sex_data,
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
    year: (new Date).getFullYear(),

    //jiazai
    jiazai: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    // console.log(op.id)

    this.get_Resume_Detail(op.id)
  },

  onShow: function () {

  },


  //查询resume详细信息
  get_Resume_Detail: function (id) {
    resumeModel.get_Resume_Detail(id, (res) => {
      console.log('resume详细信息', res)
      this.setData({ resume_detail: res, jiazai: true })
    })
  },


  phone_tap() {
    console.log('phone', this.data.resume_detail.phone)
    wx.makePhoneCall({ phoneNumber: String(this.data.resume_detail.phone) })
  },




})