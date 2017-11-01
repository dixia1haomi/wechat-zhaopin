import { User } from '../../user-model.js'
import { Validata } from '../../../utils/validata.js'
import { Job } from '../../../job/job-model.js'

var validata = new Validata()
var user = new User()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['曲靖', '麒麟', '沾益'],
    index: 0,
    company_key: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserCompany()   //获取用户关联的公司
  },



  //创建岗位时获取用户关联的公司
  getUserCompany: function () {
    user.getUserCompany_Model((res) => {
      console.log('用户关联的公司', res.user_company)
      this.setData({ company: res.user_company })
    })
  },


  //公司选择器
  bindPickerCompany: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ company_key: e.detail.value })
  },


  //地区选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //获取form提交的数据
  getFormdata: function (e) {
    let { job_name, detailed_address, pay_level, work_area, picker, description } = e.detail.value


    if (validata.isEmpty(job_name)) {
      user.tip_Modal({ content: '职位名称不能为空' })
      return
    }
    if (validata.isEmpty(detailed_address)) {
      user.tip_Modal({ content: '详细地址不能为空' })
      return
    }
    if (validata.isEmpty(description) || (description).length < 10) {
      user.tip_Modal({ content: '职位描述不能为空且必须大于10个字符' })
      return
    }

    // 组织数据
    let data = {
      'company_id': this.data.company[picker].id,
      'job_name': job_name,
      'pay_level': pay_level,
      'work_area': work_area,
      'detailed_address': detailed_address,
      'job_description': description
    }

    //调用接口
    new Job().create_job(data, (res) => {
      if (res.code == 201) { user.tip_Toast('发布成功') } else { user.tip_Toast('发布失败') }
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