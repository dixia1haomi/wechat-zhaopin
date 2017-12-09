import { User } from '../user/user-model.js'
import { Job } from '../index/job-model.js'
import { Config } from '../utils/config.js'

var user = new User()
var job = new Job()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //薪资水平
    pay_level_data: Config.expectation_pay_data,

    //经验要求
    ments_exp_data: Config.ments_exp,

    //学历要求
    ments_education_data: Config.ments_education,

    //性别要求
    ments_sex_data: Config.ments_sex,

    //工作区域
    work_area_data: Config.work_place_data,

    //工作福利
    job_welfare_data: Config.job_welfare,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserJob()   //获取用户关联的岗位
  },


  //获取用户关联的岗位
  getUserJob: function () {
    user.getUserJob_Model((res) => {
      console.log('用户关联的岗位', res)
      let user_job = res.user_job

      for (let i in user_job) {
        //把welfare福利字段转为数组
        user_job[i].welfare = JSON.parse(user_job[i].welfare)
        // 处理update_time
        user_job[i].update_time = job.time(user_job[i].update_time)
      }

      this.setData({ user_job: user_job })
    })
  },


  //删除岗位
  delete_Job: function (e) {
    console.log('delete', e)
    user.tip_Modal({ content: '删除这个岗位？' }, (res) => {
      if (res.confirm) {
        job.delete_Job({ id: e.currentTarget.id }, (res) => {
          console.log('删除岗位', res)
          if (res.code == 201) {
            job.tip_Toast('删除成功')
            this.getUserJob()   //获取用户关联的岗位,刷新数据
          }
          else {
            job.tip_Toast('删除失败')
          }
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
    this.getUserJob()   //获取用户关联的岗位
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