
Page({

  data: {

  },


  onLoad: function (op) {
    this.getPagesData() // 获取上一个页面的数据，不再次请求数据库了
  },

  // 获取上一个页面的数据，不再次请求数据库了
  getPagesData() {
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var pagedata = pages[pages.length - 2];
      //关键在这里 
      console.log('pagedata', pagedata.data)
      this.setData({
        company_Data: pagedata.data.data.company,
        company_industry_data: pagedata.data.company_industry_data,
        company_nature_data: pagedata.data.company_nature_data,
        company_size_data: pagedata.data.company_size_data,
      })
    }
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