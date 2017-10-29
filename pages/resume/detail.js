import { Resume } from '../resume/resume-model.js'

const resumeModel = new Resume()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年龄
    age_data: Resume.age_data,
    // 性别
    sex_data: Resume.sex_data,
    // 经验
    work_exp_data: Resume.work_exp_data,
    // 学历
    education_data: Resume.education_data,
    // 意向职位
    expectation_position_data: Resume.expectation_position_data,
    // 期望薪资
    expectation_pay_data: Resume.expectation_pay_data,
    // 求职区域
    work_place_data: Resume.work_place_data,
    // 工作性质
    work_nature_data: Resume.work_nature_data,
    // 到岗时间
    report_time_data: Resume.report_time_data,
    // 目前状态
    current_state_data: Resume.current_state_data,
  
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
      this.setData({
        resume_detail: res
      })
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