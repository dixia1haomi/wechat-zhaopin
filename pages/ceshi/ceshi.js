

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  ceshi() {
    let str = '云南省曲靖市马龙县XXX'
    let arr = ['麒麟', '沾益', '马龙']

    let dizhi = str.slice(6) //删除'云南省曲靖市'
    console.log('dizhi',dizhi)


    for (let i in arr) {
      // console.log(arr[i])
      if (dizhi.indexOf(arr[i]) != -1) {
        console.log('这是：',arr[i])
        console.log('下标是：', i)
      }
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    console.log('ceshi_onLoadop', op)

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