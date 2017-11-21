import { User } from '../user-model.js'
import { Resume } from '../../resume/resume-model.js'
import {Config} from '../../utils/config.js'

var user = new User()

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
    current_state_data: Config.current_state_data

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserResume()   //获取用户关联的简历
  },


  //获取用户关联的简历
  getUserResume: function () {
    user.getUserResume_Model((res) => {
      console.log('用户关联的简历',res)
      this.setData({ user_resume: res.user_resume })
    })
  },


  //删除简历
  delete_resume: function (e) {
    user.tip_Modal({ content: '删除这个简历？' }, (res) => {
      if (res.confirm) {
        new Resume().delete_resume(e.currentTarget.id, (res) => {
          console.log('删除简历', res)
          if (res.code == 201) { user.tip_Toast('删除成功') } else { user.tip_Toast('删除失败') }
        })
      }
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