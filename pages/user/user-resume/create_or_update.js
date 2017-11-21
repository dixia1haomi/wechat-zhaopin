import { Validata } from '../../utils/validata.js'
import { Base } from '../../utils/base.js'
import { Resume } from '../../resume/resume-model.js'
import { Config } from '../../utils/config.js'
import WxValidate from '../../../wx-validate/WxValidate.js'

const validata = new Validata()
const base = new Base()


//初始化表单验证
const rules = {
  // 岗位名称
  name: {
    required: true,
    maxlength: 2  //最多输入2个字符
  },
  // 电话号码
  phone: {
    required: true,
    tel: true
  },
  // 岗位描述
  resume_description: {
    required: true,
    minlength: 5  //最少输入5个字符
  }
}

const messages = {
  // 岗位名称
  name: {
    required: '姓不能为空',
    maxlength: '名称最多输入2个字符'
  },
  // 电话号码
  phone: {
    required: '电话号码不能为空',
    tel: '请输入正确的电话号码'
  },
  // 个人描述
  resume_description: {
    required: '描述不能为空',
    minlength: '描述最少输入5个字符'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

Page({

  data: {
    // 年龄
    age_data: Config.age_data, age_key: 9,
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
    // textarea计数
    textarea_cursor: 0
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
      console.log('get_Resume_Detail', res)
      res.age = (new Date).getFullYear() - res.age - 18   //处理年龄，获取出生年对应的年龄数组下标
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
    console.log('form', e.detail.value)
    let value = e.detail.value

    //验证数据 **********************************************************
    if (!wxValidate.checkForm(e)) {
      const error = wxValidate.errorList[0]
      base.tip_Modal({ content: error.msg })
      return false
    }

    // 组织数据 -》 判断是新增还是更新
    value.age = this.data.age_data[value.age] //从年龄数组下标取对应的出生年份

    if (validata.isEmpty(value.id)) {
      new Resume().create_resume(value, (res) => { 
        console.log('新增简历', res)
        if (res.code == 201) { base.tip_Toast('发布成功') } else { base.tip_Toast('发布失败') } })
    } else {
      new Resume().update_resume(value, (res) => {
        console.log('更新简历',res)
        if (res.code == 201) { base.tip_Toast('更新成功') } else { base.tip_Toast('更新失败') }
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

  // textarea输入计数
  textarea(e) {
    console.log('resume_textarea', e.detail.cursor)
    this.setData({ textarea_cursor: e.detail.cursor })
  }


})