import { Job } from '../job/job-model.js'
import { Config } from '../utils/config.js'

var job = new Job()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    pay_level_data: Config.expectation_pay_data,

    welfare_data: Config.job_welfare,

    ments_exp_data: Config.ments_exp,

    ments_education_data: Config.ments_education,

    ments_sex_data: Config.ments_sex,

    work_area_data: Config.work_place_data,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    this.get_Job_Detail(op.id)
  },

  //查询job详细信息
  get_Job_Detail: function (id) {
    job.get_Job_Detail(id, (res) => {
      //把welfare福利字段转为数组
      res.welfare = JSON.parse(res.welfare)

      console.log(res)
      this.setData({ data: res })
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