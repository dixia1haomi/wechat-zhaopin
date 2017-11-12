

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_date: '2016-09',
    end_date: '2016-09',
  },

  bindDateStart: function (e) {
    console.log('start_date', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },

  bindDateEnd: function (e) {
    console.log('end_date', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },


  company_name: function (e) {
    console.log('company_name', e.detail.value)
    this.setData({
      company_name: e.detail.value
    })
  },

  you_job: function (e) {
    console.log('you_job', e.detail.value)
    this.setData({
      you_job: e.detail.value
    })
  },

  job_neirong: function (e) {
    console.log('job_neirong', e.detail.value)
    this.setData({
      job_neirong: e.detail.value
    })
  },

  formValue(e) {
    let value = e.detail.value
    let arr = wx.getStorageSync('form') || []
    console.log('form', e.detail.value)

    let stoage = {
      start_date: value.start_date,
      end_date: value.end_date,
      company_name: value.company_name,
      you_job: value.you_job,
      job_neirong: value.job_neirong
    }
    console.log('stoage', stoage)

    // 没有id新增？有id编辑？用是否有id来判断
    if (this.data.id) {
      //编辑
      console.log('you id')
      arr[this.data.id] = stoage
    } else {
      // 新增
      console.log('meiyou id')
      arr.push(stoage)
    }
    
    wx.setStorageSync('form', arr)

    // return

    //跳转
    wx.navigateTo({
      url: '/pages/ceshi1/ceshi1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    console.log('op', op)

    if (!op.id) { return }

    let id = op.id
    let arr = wx.getStorageSync('form') || []

    this.setData({
      id: id,  // 用来判断是新增还是编辑
      start_date: arr[id].start_date,
      end_date: arr[id].end_date,
      company_name: arr[id].company_name,
      you_job: arr[id].you_job,
      job_neirong: arr[id].job_neirong
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