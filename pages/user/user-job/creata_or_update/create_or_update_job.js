import { User } from '../../user-model.js'
import { Job } from '../../../job/job-model.js'
import { Config } from '../../../utils/config.js'
import { Validata } from '../../../utils/validata.js'
import WxValidate from '../../../../wx-validate/WxValidate.js'
import { Authorize } from '../../../utils/authorize.js'

const authorize = new Authorize()
const validata = new Validata()
const job = new Job()
const user = new User()


//初始化表单验证
const rules = {
  // 岗位名称
  job_name: {
    required: true,
    minlength: 2  //最少输入2个字符
  },
  // 招聘人数
  ments_number: {
    required: true,
    range: [1, 99] // 招聘人数1-99之内
  },
  //详细地址
  map_address: {
    required: true,
    contains: '曲靖市'  //必须包含云南省曲靖市
  },
  // 称呼
  job_user_name: {
    required: true,
    maxlength: 4  //最多输入4个字符
  },
  // 电话号码
  phone: {
    required: true,
    tel: true
  },
  // 岗位描述
  job_description: {
    required: true,
    minlength: 5  //最少输入5个字符
  }
}

//表单验证提示
const messages = {
  // 岗位名称
  job_name: {
    required: '岗位名称不能为空',
    minlength: '岗位名称最少输入2个字符'
  },
  // 招聘人数
  ments_number: {
    required: '人数不能为空',
    range: '招聘人数1-99之内'
  },
  //详细地址
  map_address: {
    required: '地址不能为空',
    contains: '岗位的范围仅限于曲靖地区'  //必须包含云南省曲靖市
  },
  // 称呼
  job_user_name: {
    required: '你的称呼不能为空',
    maxlength: '你的称呼最多输入4个字符'
  },
  // 电话号码
  phone: {
    required: '电话号码不能为空',
    tel: '请输入正确的电话号码'
  },
  // 岗位描述
  job_description: {
    required: '描述不能为空',
    minlength: '描述最少输入5个字符'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

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

    // textarea计数
    textarea_cursor: 0,

    // 岗位类型
    job_type: 0,
    // 公司id
    company_id: 0,
    // 公司名字
    company_name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    console.log('load', op)

    // 如果job_type == 1是新增公司岗位，设置data数据
    op.job_type == 1 && this.setData({ job_type: op.job_type, company_id: op.company_id, company_name: op.company_name })

    // 判断是-新增岗位-还是编辑岗位
    op.job_id && this.edit_Job(op.job_id)

  },



  // 编辑岗位 -> 去出岗位信息 -> 处理后传给wxml展示
  edit_Job: function (job_id) {
    job.get_Job_Detail(job_id, (res) => {
      console.log('get_Job_Detail', res)
      // return
      //处理《岗位福利》数据 详见edit_welfare
      this.edit_welfare(JSON.parse(res.welfare))

      // 取出来的数据传给wxml展示
      this.setData({
        id: job_id,
        company_id: res.company_id,
        company_name: res.company_name,
        job_name: res.job_name,
        job_type: res.job_type,
        job_user_name: res.job_user_name,
        pay_level_key: res.pay_level,
        phone: res.phone,
        work_area_key: res.work_area,
        ments_number: res.ments_number,
        ments_exp_key: res.ments_exp,
        ments_sex_key: res.ments_sex,
        ments_education_key: res.ments_education,
        map_address: res.map_address,
        map_name: res.map_name,
        map_longitude: res.map_longitude,
        map_latitude: res.map_latitude,
        job_description: res.job_description,
      })
    })
  },

  // form提交 -> 处理提交来的数据 -> 请求给接口新增或更新
  getFormdata: function (e) {
    console.log('shuju', e.detail.value)
    // return
    let value = e.detail.value

    //验证数据 **********************************************************
    if (!wxValidate.checkForm(e)) {
      const error = wxValidate.errorList[0]
      job.tip_Modal({ content: error.msg })
      return false
    }

    //处理提交来的数据 
    value.welfare = JSON.stringify(value.welfare)           //岗位福利数组 转为 json字符储存

    //用岗位id - 判断是请求新增或更新
    if (new Validata().isEmpty(value.id)) {
      job.create_job(value, (res) => { if (res.code == 201) { job.tip_Toast('发布成功') } else { job.tip_Toast('发布失败') } })
    } else {
      job.update_job(value, (res) => { if (res.code == 201) { job.tip_Toast('更新成功') } else { job.tip_Toast('更新失败') } })
    }
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

  // textarea输入计数
  textarea(e) {
    console.log('job_textarea', e.detail.cursor)
    this.setData({ textarea_cursor: e.detail.cursor })
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


  // 打开地图选择位置
  openMap() {
    authorize.authorize_map((res) => {
      console.log('authorize_map', res)
      if (res) {
        wx.chooseLocation({
          success: (res) => {
            console.log('chooseLocation - success', res)
            let i = this.work_area(res.address, Config.work_place_data) // 检查map地址中包含Config工作区域数组中的哪一项,返回对应的下标
            this.setData({
              map_address: res.address.slice(3),  //删除'云南省曲靖市'
              map_name: res.name,
              map_longitude: res.longitude,
              map_latitude: res.latitude,
              work_area_key: i
            })
          },
        })
      }
    })

    // console.log('岗位-打开地图选择位置scallBack', res)
  },

  //自动处理工作区域的数据->根据地图返回的地址匹配工作区域
  work_area(mapAddress, arr) {
    // let mapAddress = mapAddress
    // let arr = Config.work_place_data
    let str = mapAddress.slice(6) //删除'云南省曲靖市'
    console.log('str', str)

    for (let i in arr) {
      // console.log(arr[i])
      // 检查map地址中包含Config工作区域数组中的哪一项,返回对应的下标
      if (str.indexOf(arr[i]) != -1) {
        console.log('这是：', arr[i])
        console.log('下标是：', i)
        return i;
        // this.setData({ work_area_key: i })
      }
    }
  }
})