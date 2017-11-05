import { Job } from '../job/job-model.js'
import { Config } from '../utils/config.js'

var job = new Job()

Page({
  data: {
    work_place_data: Config.work_place_data,
    pay_level_data: Config.expectation_pay_data,
    PickerChange_index: 0,

    hid: false
  },

  onLoad: function (work) {
    this.get_Job_List() //获取job列表
  },



  //获取job列表
  get_Job_List: function (work = 0) {
    job.get_Job_List(work, (res) => {
      console.log('job列表', res)
      
  

      for (let i in res) {
      //把welfare福利字段转为数组
        res[i].welfare = JSON.parse(res[i].welfare)
      // 处理update_time
        res[i].update_time = job.time(res[i].update_time)
      }

      this.setData({ job_list_data: res })
    })
  },




  //地区选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.get_Job_List(e.detail.value) //获取job列表
    this.setData({ PickerChange_index: e.detail.value })
    this.setData({ hid: !this.data.hid })
  },

  xuanze: function () {
    this.setData({ hid: !this.data.hid })
  },


})
