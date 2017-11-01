import { Validata } from '../../../utils/validata.js'
import { Company } from '../user-company-model.js'
import { Config } from '../../../utils/config.js'

const company = new Company
const validata = new Validata()
Page({


  data: {
    //公司规模
    company_size_data: Config.company_size_data,
    //公司性质
    company_nature_data: Config.company_nature_data,
    //公司所属行业
    company_industry_data: Config.company_industry_data,

    company_size_key: 0,
    company_nature_key: 0,
    company_industry_key: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    if (op.id) { this.edit_company(op.id) }
  },

  //编辑公司 -》 取id -》 查公司信息 -》 传值给页面 -》 再提交
  edit_company: function (id) {
    company.get_Company_Detail(id, (res) => {
      this.setData({
        id: res.id,
        company_name: res.company_name,
        company_address: res.company_address,
        company_description: res.company_description,
        company_size_key: res.company_size,
        company_nature_key: res.company_nature,
        company_industry_key: res.company_industry
      })
    })
  },



  //公司-form提交的value
  getFormdata: function (e) {
    let value = e.detail.value

    //验证
    let check = this.valueCheck({
      company_name: value.company_name, company_address: value.company_address, company_description: value.company_description
    })
    if (check) { return } //验证不通过不执行下面的


    //组织请求数据 -> 判断是更新还是新增
    if (validata.isEmpty(value.id)) {
      company.create_Company(value, (res) => { if (res.code == 201) { company.tip_Toast('发布成功') } else { company.tip_Toast('发布失败') } })
    } else {
      company.update_Company(value, (res) => { if (res.code == 201) { company.tip_Toast('更新成功') } else { company.tip_Toast('更新失败') } })
    }
  },




  //公司-规模选择器
  company_size_picker: function (e) {
    this.setData({ company_size_key: e.detail.value })
  },
  //公司-性质选择器
  company_nature_picker: function (e) {
    this.setData({ company_nature_key: e.detail.value })
  },
  //公司-所属行业选择器
  company_industry_picker: function (e) {
    this.setData({ company_industry_key: e.detail.value })
  },



  //验证
  valueCheck: function (obj) {
    if (validata.isEmpty(obj.company_name)) {
      company.tip_Modal({ content: '公司名称不能为空' })
      return true
    }
    if (validata.isEmpty(obj.company_address)) {
      company.tip_Modal({ content: '公司地址不能为空' })
      return true
    }
    if (validata.isEmpty(obj.company_description)) {
      company.tip_Modal({ content: '公司描述不能为空' })
      return true
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