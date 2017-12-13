import { Config } from '../utils/config.js'
import { Resume } from '../resume/resume-model.js'
import { Base } from '../utils/base.js'

const resume = new Resume()
const base = new Base()

let page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年龄
    age_data: Config.age_data,
    // 性别
    // sex_data: Config.sex_data,
    // 经验
    work_exp_data: Config.work_exp_data,
    // 学历
    education_data: Config.education_data,
    // 意向职位
    expectation_position_data: Config.expectation_position_data,
    // 期望薪资
    expectation_pay_data: Config.expectation_pay_data,
    // 求职区域
    work_place_data: Config.work_place_data,
    // 工作性质
    work_nature_data: Config.work_nature_data,
    // 到岗时间
    report_time_data: Config.report_time_data,
    // 目前状态
    current_state_data: Config.current_state_data,
    //地区选择器——
    PickerChange_index: 0,
    //当前年份
    year: (new Date).getFullYear(),

    //jiazai
    jiazai: false
  },


  onLoad: function (options) {
    this.get_Resume_List()  //获取简历列表
    // console.log(this.data.year)
  },

  onShow: function () {
    // this.get_Resume_List()  //获取简历列表
  },


  //获取简历列表
  get_Resume_List: function (pages = 1, callback) {
    let data = {}   //组织post条件查询
    this.data.PickerChange_index != 0 && (data.work_place = this.data.PickerChange_index)

    resume.get_Resume_List(pages, data, (res) => {

      res.length === 0 && base.tip_Toast('没有更多了')  // 下一页没有数据就提示

      for (let i in res) { res[i].update_time = base.time(res[i].update_time) } //处理更新时间

      callback ? callback(res) : this.setData({ resume: res, jiazai: true })
      console.log('获取简历列表', res)
    })
  },


  //地区选择器bindPickerChange-先改变值，再请求
  PickerChange_resume: function (e) {
    page = 1  // 切换过地区就恢复全局page值
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ PickerChange_index: e.detail.value }, () => {
      this.get_Resume_List() //调用接口请求resume数据
    })
  },



  // 下一页
  onReachBottom: function () {
    console.log('page', page)
    this.get_Resume_List(++page, (res) => {
      this.setData({ resume: this.data.resume.concat(res) })
    }) //下一页数据添加进去
  },


  //页面相关事件处理函数--监听用户下拉动作--重新获取数据并setData->成功后停止下拉动作
  onPullDownRefresh: function () {
    page = 1  //下一页的全局变量初始化->防止多次切换地区后上拉取值不对
    this.get_Resume_List(1, (res) => { this.setData({ resume: res }, () => { wx.stopPullDownRefresh() }) })
  },


  onShareAppMessage: function () { }
})