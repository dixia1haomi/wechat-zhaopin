import { User } from '../user-model.js'

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
    this.getUserCompany()   //获取用户关联的公司
  },


  //获取用户关联的公司
  getUserCompany: function () {
    user.getUserCompany_Model((res) => {
      console.log(res)
      this.setData({
        user_company: res.user_company
      })
    })
  },



  //删除公司
  delete_company: function (e) {
    user.tip_Modal({ content: '删除这个公司？' }, (res) => {
      if (res.confirm) {
        user.request({
          url: 'company/delete',
          method: 'POST',
          data: {
            'token_key': wx.getStorageSync('token_key'),
            'id': e.currentTarget.id
          },
          sCallback: function (res) {
            //判断发布是否成功
            console.log('company_delete', res)
            if (res.code == 201) { user.tip_Toast('删除成功') } else { user.tip_Toast('删除失败') }
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