import { Job } from '../job/job-model.js'

var job = new Job()

Page({
  data: {
    motto: 'Hello World',
    array: ['全曲靖', '麒麟', '沾益'],
    index: 0,
  },

  onLoad: function (work) {

    this.get_Job_List() //获取job列表

  },

  //获取job列表
  get_Job_List: function (work = 0) {
    job.get_Job_List(work, (res) => {
      this.setData({
        ceshi: res
      })
    })
  },





  //地区选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.get_Job_List(e.detail.value) //获取job列表
    this.setData({ index: e.detail.value })
  },


})
