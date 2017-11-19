import { Job } from '../job/job-model.js'
import { Company } from '../user/user-company/user-company-model.js'
import { Config } from '../utils/config.js'

const job = new Job()
const company = new Company()

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

    // 公司规模
    company_size_data: Config.company_size_data,
    // 公司性质
    company_nature_data: Config.company_nature_data,
    // 公司所属行业
    company_industry_data: Config.company_industry_data,

    //------zhankai-----
    zhankai_data: false
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


      res.welfare = JSON.parse(res.welfare) //把welfare福利字段转为数组
      res.update_time = job.time(res.update_time) //处理update_time

      //判断是否有公司-》赋值公司关联的岗位
      if (res.company != null) {
        let company_in_job = res.company.company_in_job
        for (let i in company_in_job) {
          company_in_job[i].update_time = job.time(company_in_job[i].update_time)     //处理公司关联的岗位里的update_time
          company_in_job[i].welfare = JSON.parse(company_in_job[i].welfare)           //处理公司关联的岗位里的welfare
        }
      }

      console.log('job详细信息', res)
      this.setData({ data: res })
    })
  },


  //-----------------展开折叠-事件--------------------
  // zhankai: function () {
  //   this.setData({ zhankai_data: !this.data.zhankai_data })
  // },

  //拨打电话-事件
  phone_tap(){
    // console.log('phone', this.data.data.phone)
    wx.makePhoneCall({
      phoneNumber: this.data.data.phone //仅为示例，并非真实的电话号码
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

  },

  // 查看地图位置
  seeMap() {
    const params = {
      address: this.data.data.map_address,
      name: this.data.data.map_name,
      longitude: Number(this.data.data.map_longitude),
      latitude: Number(this.data.data.map_latitude),
    }
    job.seeMap(params,(res) => {
      console.log('岗位详细信息-查看地图scallBack', res)
    })
  },
})
      // this.setData({
      //   map_address: res.address,
      //   map_name: res.name,
      //   map_longitude: res.longitude,
      //   map_latitude: res.latitude
      // })