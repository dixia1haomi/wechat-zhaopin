import { User } from '../../user-model.js'
import { Job } from '../../../job/job-model.js'
import { Config } from '../../../utils/config.js'
import { Validata } from '../../../utils/validata.js'

const job = new Job()
const user = new User()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_key: 0,

    //薪资水平
    pay_level_data: Config.expectation_pay_data,
    pay_level_key: 3,

    //经验要求
    ments_exp_data: Config.ments_exp,
    ments_exp_key: 0,

    //学历要求
    ments_education_data: Config.ments_education,
    ments_education_key: 0,

    //性别要求
    ments_sex_data: Config.ments_sex,
    ments_sex_key: 0,

    //工作区域
    work_area_data: Config.work_place_data,
    work_area_key: 0,

    //工作福利
    job_welfare_data: Config.job_welfare,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    if (op.job_id) {
      console.log('you id', op.job_id, op.company_id)
      //如果有岗位id，证明是编辑，获取数据赋给模板
      this.edit_Job(op.job_id)
    } else {

      this.get_Company_Data()
    }
  },



  // 编辑岗位 -> 去出岗位信息 -> 处理后传给wxml展示
  edit_Job: function (job_id) {
    job.get_Job_Detail(job_id, (res) => {
      // console.log('jobdetail', res)

      //处理《岗位福利》数据 详见edit_welfare
      this.edit_welfare(JSON.parse(res.welfare))

      // 取出来的数据传给wxml展示
      this.setData({
        id: job_id,
        job_name: res.job_name,
        pay_level_key: res.pay_level,
        work_area_key: res.work_area,
        ments_number: res.ments_number,
        ments_exp_key: res.ments_exp,
        ments_sex_key: res.ments_sex,
        ments_education_key: res.ments_education,
        detailed_address: res.detailed_address,
        job_description: res.job_description,
      })
    })
  },

  // form提交 -> 处理提交来的数据 -> 请求给接口新增或更新
  getFormdata: function (e) {
    // console.log(e.detail.value)
    let value = e.detail.value

    //验证数据 **********************************************************


    

    //处理提交来的数据
    if (value.company_id == null) { value.company_id = 0 }  //如果是个人用户没有公司id -》 让公司id=0
    value.welfare = JSON.stringify(value.welfare)           //岗位福利数组 转为 json字符储存

    //请求新增或更新
    if (new Validata().isEmpty(value.id)) {
      job.create_job(value, (res) => { if (res.code == 201) { job.tip_Toast('发布成功') } else { job.tip_Toast('发布失败') } })
    } else {
      job.update_job(value, (res) => { if (res.code == 201) { job.tip_Toast('更新成功') } else { job.tip_Toast('更新失败') } })
    }
  },




  //获取用户关联的公司 getUserCompany_Model
  get_Company_Data: function () {
    //获取用户关联的公司 -> 判断用户名下是否有公司 -> 
    user.getUserCompany_Model((res) => {
      let company = res.user_company
      if (company.length == 0) {
        console.log('没得公司')
        return
      }
      console.log('aa', res)

      for (let i in company) {

      }

      this.setData({ company_data: res.user_company })
    })
  },


  //处理福利的数据
  edit_welfare: function (welfare) {
    const job_welfare_data = this.data.job_welfare_data
    let changed = {}
    for (let i in job_welfare_data) {
      if (welfare.indexOf(job_welfare_data[i].value) !== -1) {
        changed['job_welfare_data[' + i + '].checked'] = true
      } else {
        changed['job_welfare_data[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },


  //福利-选择器
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.edit_welfare(e.detail.value)
  },


  //公司-选择器
  job_company_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ company_key: e.detail.value })
  },


  //薪资-选择器
  pay_level_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ pay_level_key: e.detail.value })
  },

  //经验要求-选择器
  ments_exp_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ ments_exp_key: e.detail.value })
  },

  //学历要求-选择器
  ments_education_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ ments_education_key: e.detail.value })
  },

  //性别要求-选择器
  ments_sex_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ ments_sex_key: e.detail.value })
  },

  //工作区域-选择器
  work_area_picker: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    this.setData({ work_area_key: e.detail.value })
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