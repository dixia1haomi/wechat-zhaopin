import { User } from '../user-model.js'
import { Resume } from '../../resume/resume-model.js'

var user = new User()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserResume()   //获取用户关联的公司
  },


  //获取用户关联的简历
  getUserResume: function () {
    user.getUserResume_Model((res) => {
      console.log(res)
      this.setData({ user_resume: res.user_resume })
    })
  },


  //删除简历
  delete_resume: function (e) {
    user.tip_Modal({ content: '删除这个岗位？' }, (res) => {
      if (res.confirm) {
        new Resume().delete_resume(e.currentTarget.id, (res) => {
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