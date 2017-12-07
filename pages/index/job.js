import { Job } from '../index/job-model.js'
import { Config } from '../utils/config.js'

var job = new Job()
let page = 1  //上拉加载全局变量

Page({
  data: {
    //岗位列表数据
    job_list_data: [],
    //地区范围->麒麟，沾益，富源...
    work_place_data: Config.work_place_data,
    //薪资水平
    pay_level_data: Config.expectation_pay_data,
    //地区范围选择器的index值->显示已选择的地区
    work_place_pickerChange_index: 0,
    //发送请求时的work_area字段->不为0才携带work_area去服务器条件查询
    work_area: 0
  },

  // 放在onshow里进入下一页再返回要再次请求数据，所以不放在onshow
  onLoad: function () {
    this.get_Job_List() //获取job列表
  },


  //获取job列表
  get_Job_List: function (pages = 1, callback) {
    // 组织条件查询->post请求中的data->不为0才携带work_area去服务器条件查询
    let data = {}
    this.data.work_area != 0 && (data.work_area = this.data.work_area)
    // 发送请求
    job.get_Job_List(pages, data, (res) => {
      console.log('job列表', res)
      // 下一页没有数据就提示
      res.length === 0 && job.tip_Toast('没有更多了')

      //把welfare福利字段转为数组,处理update_time
      res = this._welfare_updateTime(res)

      //有callback->传出去->没有就设置数据：防止上拉加载是多次setData数据（只有在上拉时有callback）
      callback ? callback(res) : this.setData({ job_list_data: res })
    })
  },


  //地区选择器->设置请求时work_area字段，地区下标 -> 请求job列表
  bindPickerChange: function (e) {
    page = 1  //下一页的全局变量初始化->防止多次切换地区后上拉取值不对
    this.setData({ work_area: e.detail.value, work_place_pickerChange_index: e.detail.value }, () => { this.get_Job_List() })
  },


  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('page', page)
    this.get_Job_List(++page, (res) => {
      this.setData({ job_list_data: this.data.job_list_data.concat(res) })
    }) //下一页数据添加进去
  },

  //页面相关事件处理函数--监听用户下拉动作--重新获取数据并setData->成功后停止下拉动作
  onPullDownRefresh: function () {
    page = 1  //下一页的全局变量初始化->防止多次切换地区后上拉取值不对
    this.get_Job_List(1, (res) => { this.setData({ job_list_data: res }, () => { wx.stopPullDownRefresh() }) })
  },


  //把welfare福利字段转为数组,处理update_time为->刚刚，今天
  _welfare_updateTime(res) {
    for (let i in res) {
      res[i].welfare = JSON.parse(res[i].welfare)
      res[i].update_time = job.time(res[i].update_time)
    }
    return res
  },
  
  // 页面跳转
  _navigate(op) { wx.navigateTo({ url: '/pages/index/detail?id=' + op.currentTarget.dataset.id }) }

})
