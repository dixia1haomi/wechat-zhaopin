import { Validata } from '../utils/validata.js'
import { Base } from '../utils/base.js'
import { Resume } from '../resume/resume-model.js'
import { Config } from '../utils/config.js'
import WxValidate from '../../wx-validate/WxValidate.js'

const validata = new Validata()
const base = new Base()
const resume = new Resume()

// 描述模板全局变量
let moban = 0

//初始化表单验证
const rules = {
  // 岗位名称
  name: {
    required: true,
    rangelength: [2, 4]  //输入2-4个字符
  },
  // 电话号码
  phone: {
    required: true,
    tel: true
  },
  // 岗位描述
  resume_description: {
    required: true,
    rangelength: [20, 1000]  //输入20-1000个字符
  }
}

const messages = {
  // 岗位名称
  name: {
    required: '名称不能为空',
    rangelength: '名称在2-4个字之间'
  },
  // 电话号码
  phone: {
    required: '电话号码不能为空',
    tel: '请输入正确的电话号码'
  },
  // 个人描述
  resume_description: {
    required: '描述不能为空',
    rangelength: '描述在20-1000个字之间'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

Page({

  data: {
    // 年龄
    age_list: Config.age_data, age_key: 9,
    // 性别
    // sex_list: Config.sex_data, sex_key: 0,
    // 经验
    work_exp_list: Config.work_exp_data, work_exp_key: 3,
    // 学历
    education_list: Config.education_data, education_key: 2,
    // 意向职位
    expectation_position_list: Config.expectation_position_data, expectation_position_key: 3,
    // 期望薪资
    expectation_pay_list: Config.expectation_pay_data, expectation_pay_key: 2,
    // 求职区域
    work_place_list: Config.work_place_data, work_place_key: 0,
    // 工作性质
    work_nature_list: Config.work_nature_data, work_nature_key: 0,
    // 到岗时间
    report_time_list: Config.report_time_data, report_time_key: 0,
    // 目前状态
    current_state_list: Config.current_state_data, current_state_key: 0,

    resumeRes: {
      id: '',
      name: '',
      // sex: 0,
      age: 9,
      work_exp: 2,
      education: 0,
      expectation_pay: 2,
      work_nature: 0,
      report_time: 0,
      work_place: 0,
      current_state: 0,
      expectation_position: 0,
      phone: '',
      resume_description: '',
    },

    toptips_kaiguan: false,

    // sheetState_sex: false,
    sheetState_age: false,
    sheetState_work_exp: false,
    sheetState_education: false,
    sheetState_expectation_pay: false,
    sheetState_work_nature: false,
    sheetState_report_time: false,
    sheetState_work_place: false,
    sheetState_current_state: false,
    sheetState_expectation_position: false,
    sheetState_resume_description: false,

    // jiazai
    jiazai: false,

    // 简历描述模板
    miaoshumoban: Config.resume_miaoshumoban
  },

  // 名称
  nameEvent(e) {
    console.log('nameEvent', e.detail)
    this.setData({ 'resumeRes.name': e.detail.value })
  },

  // <!--性别 -->
  // sheetState_sex() { this.setData({ sheetState_sex: true }) },
  // sexEvent(e) {
  //   console.log('sexEvent', e.detail)
  //   e.detail.index !== false && this.setData({ 'resumeRes.sex': e.detail.index })
  // },

  // 出生年份
  sheetState_age() { this.setData({ sheetState_age: true }) },
  ageEvent(e) {
    console.log('ageEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.age': e.detail.index })
  },

  // 工作经验
  sheetState_work_exp() { this.setData({ sheetState_work_exp: true }) },
  work_expEvent(e) {
    console.log('work_expEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.work_exp': e.detail.index })
  },

  // 最高学历
  sheetState_education() { this.setData({ sheetState_education: true }) },
  educationEvent(e) {
    console.log('educationEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.education': e.detail.index })
  },

  // 期望薪资
  sheetState_expectation_pay() { this.setData({ sheetState_expectation_pay: true }) },
  expectation_payEvent(e) {
    console.log('expectation_payEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.expectation_pay': e.detail.index })
  },

  // 工作性质
  sheetState_work_nature() { this.setData({ sheetState_work_nature: true }) },
  work_natureEvent(e) {
    console.log('work_natureEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.work_nature': e.detail.index })
  },

  // <!--入职时间 -->
  sheetState_report_time() { this.setData({ sheetState_report_time: true }) },
  report_timeEvent(e) {
    console.log('report_timeEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.report_time': e.detail.index })
  },

  // <!--工作区域 -->
  sheetState_work_place() { this.setData({ sheetState_work_place: true }) },
  work_placeEvent(e) {
    console.log('work_placeEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.work_place': e.detail.index })
  },

  // <!--当前状态 -->
  sheetState_current_state() { this.setData({ sheetState_current_state: true }) },
  current_stateEvent(e) {
    console.log('current_stateEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.current_state': e.detail.index })
  },

  // <!--求职岗位 -->
  sheetState_expectation_position() { this.setData({ sheetState_expectation_position: true }) },
  expectation_positionEvent(e) {
    console.log('expectation_positionEvent', e.detail)
    e.detail.index !== false && this.setData({ 'resumeRes.expectation_position': e.detail.index })
  },

  // <!--联系电话 -->
  phoneEvent(e) {
    console.log('phoneEvent', e.detail)
    this.setData({ 'resumeRes.phone': e.detail.value })
  },

  // <!--个人描述 -->
  sheetState_resume_description() { this.setData({ sheetState_resume_description: true }) },
  resume_descriptionEvent(e) {
    console.log('resume_descriptionEvent', e.detail)
    e.detail != undefined && this.setData({ 'resumeRes.resume_description': e.detail })
  },

  // 换描述模板事件
  huanmoban() {
    let l = this.data.miaoshumoban.length
    let i = moban++
    if (moban >= l) { moban = 0 }
    this.setData({ 'resumeRes.resume_description': this.data.miaoshumoban[i].value })
  },

  // 提交
  submit() {
    this.getFormdata(this.data.resumeRes)
  },

  onLoad: function (op) {
    op.id ? this.edit_resume(op.id) : this.setData({ jiazai: true })  // 跳转页面中转id
  },


  //编辑简历 -》 取id -》 查简历信息 -》 传值给页面 -》 再提交
  edit_resume: function (id) {
    resume.get_Resume_Detail(id, (res) => {
      console.log('get_Resume_Detail', res)
      res.age = (new Date).getFullYear() - res.age - 18   //处理年龄，获取出生年对应的年龄数组下标
      delete res.user_id                                  //删除user_id ,服务器不接受
      delete res.resume_guanlian_user                     // 删除不需要的用户数据

      this.setData({ resumeRes: res, jiazai: true })
    })
  },


  // 提交表单
  getFormdata: function (resumeRes) {

    //验证数据 **********************************************************
    if (!wxValidate.checkForm(resumeRes)) {
      const error = wxValidate.errorList[0]
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    // // 组织数据 -》 判断是新增还是更新
    resumeRes.age = this.data.age_list[resumeRes.age] //从年龄数组下标取对应的出生年份

    if (validata.isEmpty(resumeRes.id)) {
      resume.create_resume(resumeRes, (res) => {
        console.log('新增简历', res)
        if (res.code == 201) {
          resume.tip_Modal({ content: '发布成功' }, (Modal) => { if (Modal.confirm) { wx.navigateBack({ delta: 1 }) } })
        } else {
          base.tip_Toast('发布失败')
        }
      })
    } else {
      resume.update_resume(resumeRes, (res) => {
        console.log('更新简历', res)
        if (res.code == 201) {
          resume.tip_Modal({ content: '更新成功' }, (Modal) => { if (Modal.confirm) { wx.navigateBack({ delta: 1 }) } })
        } else {
          base.tip_Toast('更新失败')
        }
      })
    }
  },





  onShow: function () {

  },


})