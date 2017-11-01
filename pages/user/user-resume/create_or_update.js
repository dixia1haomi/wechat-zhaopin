import { Validata } from '../../utils/validata.js'
import { Base } from '../../utils/base.js'
import { Resume } from '../../resume/resume-model.js'
import { Config } from '../../utils/config.js'

const validata = new Validata()
const base = new Base()


Page({

  data: {
    // 年龄
    age_data: Config.age_data, age_key: 27,
    // 性别
    sex_data: Config.sex_data, sex_key: 0,
    // 经验
    work_exp_data: Config.work_exp_data, work_exp_key: 3,
    // 学历
    education_data: Config.education_data, education_key: 2,
    // 意向职位
    expectation_position_data: Config.expectation_position_data, expectation_position_key: 3,
    // 期望薪资
    expectation_pay_data: Config.expectation_pay_data, expectation_pay_key: 2,
    // 求职区域
    work_place_data: Config.work_place_data, work_place_key: 0,
    // 工作性质
    work_nature_data: Config.work_nature_data, work_nature_key: 0,
    // 到岗时间
    report_time_data: Config.report_time_data, report_time_key: 0,
    // 目前状态
    current_state_data: Config.current_state_data, current_state_key: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    if (op.id) { this.edit_resume(op.id) } // 跳转页面中转id
  },


  //编辑简历 -》 取id -》 查简历信息 -》 传值给页面 -》 再提交
  edit_resume: function (id) {
    new Resume().get_Resume_Detail(id, (res) => {
      this.setData({
        id: res.id,
        name: res.name,
        resume_description: res.resume_description,
        phone: res.phone,

        age_key: res.age,
        sex_key: res.sex,
        education_key: res.education,
        work_exp_key: res.work_exp,
        expectation_pay_key: res.expectation_pay,
        current_state_key: res.current_state,
        expectation_position_key: res.expectation_position,
        report_time_key: res.report_time,
        work_nature_key: res.work_nature,
        work_place_key: res.work_place,
      })
    })
  },



  // 提交表单
  getFormdata: function (e) {
    console.log('form',e.detail.value)
    let value = e.detail.value

    //验证
    let check = this.valueCheck({ name: value.name, phone: value.phone, resume_description: value.resume_description })
    if (check) { return } //验证不通过不执行下面的

    // 组织数据 -》 判断是新增还是更新
    if (validata.isEmpty(value.id)) {
      new Resume().create_resume(value, (res) => { if (res.code == 201) { base.tip_Toast('发布成功') } else { base.tip_Toast('发布失败') } })
    } else {
      new Resume().update_resume(value, (res) => { if (res.code == 201) { base.tip_Toast('更新成功') } else { base.tip_Toast('更新失败') } })
    }
  },



  //验证
  valueCheck: function (obj) {
    if (validata.isEmpty(obj.name)) {
      base.tip_Modal({ content: '姓名不能为空' })
      return true
    }
    if (validata.isEmpty(obj.phone)) {
      base.tip_Modal({ content: '请输入正确的电话号码' })
      return true
    }
    if (validata.isEmpty(obj.resume_description)) {
      base.tip_Modal({ content: '个人简介不能为空' })
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

  },







  //简历-年龄-选择器
  age_picker: function (e) { this.setData({ age_key: e.detail.value }) },

  //性别
  sex_picker: function (e) { this.setData({ sex_key: e.detail.value }) },

  // 工作性质
  work_nature_picker: function (e) { this.setData({ work_nature_key: e.detail.value }) },

  //目前状态
  current_state_picker: function (e) { this.setData({ current_state_key: e.detail.value }) },

  //简历-经验-选择器
  work_exp_picker: function (e) { this.setData({ work_exp_key: e.detail.value }) },

  //简历-学历-选择器
  education_picker: function (e) { this.setData({ education_key: e.detail.value }) },

  //简历-期望薪资-选择器
  expectation_pay_picker: function (e) { this.setData({ expectation_pay_key: e.detail.value }) },

  //简历-到岗时间-选择器
  report_time_picker: function (e) { this.setData({ report_time_key: e.detail.value }) },

  //简历-求职区域-选择器
  work_place_picker: function (e) { this.setData({ work_place_key: e.detail.value }) },

  //简历-意向职业-选择器
  expectation_position_picker: function (e) { this.setData({ expectation_position_key: e.detail.value }) },
})