import { User } from '../user/user-model.js'
import { Resume } from '../resume/resume-model.js'
import { Config } from '../utils/config.js'

var user = new User()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年龄
    age_list: Config.age_data,
    // 性别
    // sex_list: Config.sex_data,
    // 经验
    work_exp_list: Config.work_exp_data,
    // 学历
    education_list: Config.education_data,
    // 意向职位
    expectation_position_list: Config.expectation_position_data,
    // 期望薪资
    expectation_pay_list: Config.expectation_pay_data,
    // 求职区域
    work_place_list: Config.work_place_data,
    // 工作性质
    work_nature_list: Config.work_nature_data,
    // 到岗时间
    report_time_list: Config.report_time_data,
    // 目前状态
    current_state_list: Config.current_state_data,

    //jiazai
    jiazai:false
  },


  onLoad: function (options) { },

  onShow: function () {
    this.getUserResume()   //获取用户关联的简历
  },


  //获取用户关联的简历
  getUserResume: function () {
    user.getUserResume_Model((res) => {
      console.log('用户关联的简历', res)
      this.setData({ user_resume: res.user_resume, jiazai: true })
    })
  },


  //删除简历
  delete_resume: function (e) {
    user.tip_Modal({ content: '删除这个简历？', showCancel: true }, (res) => {
      if (res.confirm) {
        new Resume().delete_resume(e.currentTarget.id, (res) => {
          console.log('删除简历', res)
          if (res.code == 201) {
            user.tip_Modal({ content: '删除成功' }, (Modal) => { if (Modal.confirm) { wx.navigateBack({ delta: 1 }) } })
          } else {
            user.tip_Toast('删除失败')
          }
        })
      }
    })
  },


})