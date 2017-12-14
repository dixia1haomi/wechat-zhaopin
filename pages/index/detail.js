import { Job } from '../index/job-model.js'
import { Company } from '../user-company/company-model.js'
import { Config } from '../utils/config.js'

const job = new Job()
const company = new Company()

Page({
  //页面的初始数据
  data: {
    //薪资水平
    pay_level_data: Config.expectation_pay_data,
    //岗位福利
    welfare_data: Config.job_welfare,
    //岗位要求-经验
    ments_exp_data: Config.ments_exp,
    //岗位要求-学历
    ments_education_data: Config.ments_education,
    //岗位要求-性别
    ments_sex_data: Config.ments_sex,
    //工作范围
    work_area_data: Config.work_place_data,
    // 公司规模
    company_size_data: Config.company_size_data,
    // 公司性质
    company_nature_data: Config.company_nature_data,
    // 公司所属行业
    company_industry_data: Config.company_industry_data,

    //---------
    jiazai: false,

    zhankai_zhedie: false
  },

  // 展开折叠公司其他岗位
  companyTap() {
    this.setData({ zhankai_zhedie: !this.data.zhankai_zhedie })
  },

  //生命周期函数--监听页面加载
  onLoad: function (op) {
    this.get_Job_Detail(op.id)
  },


  //查询job详细信息
  get_Job_Detail: function (id) {

    job.get_Job_Detail(id, (res) => {
      res.welfare = JSON.parse(res.welfare) //把welfare福利字段转为数组
      res.update_time = job.time(res.update_time) //调用base下的time方法处理update_time为->刚刚，今天

      // 岗位如果有关联的公司->调用_welfare_updateTime()方法处理公司所关联的岗位-福利-update_time数据
      res.company != null && (res.company.company_in_job = this._welfare_updateTime(res.company.company_in_job))

      console.log('job详细信息', res)
      this.setData({ data: res, jiazai: true })
    })
  },


  //拨打电话-事件
  phone_tap() {
    wx.makePhoneCall({ phoneNumber: String(this.data.data.phone) })
  },

  // 查看地图位置
  seeMap() {
    const params = {
      address: this.data.data.map_address,
      name: this.data.data.map_name,
      longitude: Number(this.data.data.map_longitude),
      latitude: Number(this.data.data.map_latitude),
    }
    job.seeMap(params, (res) => {
      console.log('岗位详细信息-查看地图scallBack', res)
    })
  },


  //把welfare福利字段转为数组,处理update_time为->刚刚，今天
  _welfare_updateTime(company_in_job) {
    for (let i in company_in_job) {
      company_in_job[i].welfare = JSON.parse(company_in_job[i].welfare) //welfare转成数组
      company_in_job[i].update_time = job.time(company_in_job[i].update_time) //update_time转成->刚刚，今天...
    }
    return company_in_job
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () { },

  //生命周期函数--监听页面显示
  onShow: function () { },

  //生命周期函数--监听页面隐藏
  onHide: function () { },

  //生命周期函数--监听页面卸载
  onUnload: function () { },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () { },

  //页面上拉触底事件的处理函数
  onReachBottom: function () { },

  //用户点击右上角分享
  onShareAppMessage: function () { }
})
