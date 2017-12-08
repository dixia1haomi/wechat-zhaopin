import { User } from '../../user/user-model.js'
import { Job } from '../../index/job-model.js'
import { Config } from '../../utils/config.js'
import { Validata } from '../../utils/validata.js'
import WxValidate from '../../../wx-validate/WxValidate.js'
import { Authorize } from '../../utils/authorize.js'

const authorize = new Authorize()
const validata = new Validata()
const job = new Job()
const user = new User()


//初始化表单验证
const rules = {
  // 岗位名称
  job_name: {
    required: true,
    rangelength: [2, 6] //岗位名称在2-6个字之间
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
  // 岗位描述
  job_description: {
    required: true,
    rangelength: [20, 1000]  //20-1000
  },
  // 称呼
  job_user_name: {
    required: true,
    rangelength: [2, 4] //称呼在2-6个字之间
  },
  // 电话号码
  phone: {
    required: true,
    tel: true
  }
}

//表单验证提示
const messages = {
  // 岗位名称
  job_name: {
    required: '岗位名称不能为空',
    rangelength: '岗位名称在2-6个字之间'
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
  // 岗位描述
  job_description: {
    required: '描述不能为空',
    rangelength: '描述在20-1000个字之间'
  },
  // 称呼
  job_user_name: {
    required: '你的称呼不能为空',
    rangelength: '称呼在2-4个字之间'
  },
  // 电话号码
  phone: {
    required: '手机号码不能为空',
    tel: '请输入正确的手机号码'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: 0,
    user_id: 0,
    work_area: 0,
    map_address: '',
    map_name: '',
    map_longitude: 0,
    map_latitude: 0,
    // 岗位类型
    job_type: 0,
    // 公司id
    company_id: 0,
    // 公司名字
    company_name: '',
    // 薪资
    sheetState_pay: false,  // 薪资开关
    pay_list: Config.expectation_pay_data,  //薪资水平
    pay_level: 3, //薪资值
    //岗位
    job_name: '',
    //工作福利
    welfare_list: Config.job_welfare,
    welfare: [],    // 存数据库的
    welfareStr: '',  // 展示的
    //招聘人数
    ments_number: '',
    //经验要求
    sheetState_exp: false,
    exp_list: Config.ments_exp,
    ments_exp: 0,
    //学历要求
    sheetState_education: false,
    education_list: Config.ments_education,
    ments_education: 0,
    // 你的称呼
    job_user_name: '',
    // 岗位描述
    sheetState_description: false,
    job_description: '',
    //电话
    phone: '',

    //--------------组件------------
    rootSheetState: '',  // 全局SheetState状态，控制出现蒙层后当前页面不允许滑动
    //------------toptips---------
    toptips_kaiguan: false,
    toptips_text: '',
  },

  // ------------------------组件事件-------------------------
  // 岗位名称
  jobname_Event(e) {
    console.log('asd', e.detail.value)
    this.setData({ job_name: e.detail.value })
  },

  // --------------薪资---------------
  sheetState_pay() { this.setData({ sheetState_pay: true, rootSheetState: true }) },   // 打开组件不让页面滚动
  sheet_pay(e) {
    console.log('sheet_pay', e.detail)
    e.detail.index !== false && this.setData({ pay_level: e.detail.index })   // 设置用户选择的薪资的值
    this.setData({ rootSheetState: false })  // 组件关闭就让页面滚动
  },

  //---------------福利--------------
  welfareState() { this.setData({ welfareState: true, rootSheetState: true }) },
  welfare(e) {
    console.log('welfareState', e.detail)
    this.setData({ welfareStr: e.detail.toString(), welfare: e.detail, rootSheetState: false })
  },

  //---------------招聘人数--------------
  numberEvent(e) {
    console.log('numberEvent', e.detail.value)
    this.setData({ ments_number: e.detail.value })
  },

  //---------------经验要求--------------
  sheetState_exp() { this.setData({ sheetState_exp: true, rootSheetState: true }) },   // 打开组件不让页面滚动
  sheet_exp(e) {
    console.log('sheet_exp', e.detail)
    e.detail.index !== false && this.setData({ ments_exp: e.detail.index })
    this.setData({ rootSheetState: false })  // 组件关闭就让页面滚动
  },

  //学历要求 sheetState_education
  sheetState_education() { this.setData({ sheetState_education: true, rootSheetState: true }) },   // 打开组件不让页面滚动
  sheet_education(e) {
    console.log('sheet_education', e.detail)
    e.detail.index !== false && this.setData({ ments_education: e.detail.index })
    this.setData({ rootSheetState: false })  // 组件关闭就让页面滚动
  },

  // 你的称呼
  jobUserName_Event(e) {
    console.log('jobUserName_Event', e.detail.value)
    this.setData({ job_user_name: e.detail.value })
  },

  // 岗位描述
  sheetState_description() { this.setData({ sheetState_description: true }) },
  sheet_description(e) {
    console.log('sheetState_description', e.detail)
    e.detail && this.setData({ job_description: e.detail })
  },

  // 联系电话
  phone_Event(e) {
    console.log('phone_Event', e.detail)
    this.setData({ phone: e.detail.value })
  },


  // ----------提交---------
  submit() {
    let data = this.data
    console.log('submit', data)
    let result = {}
    result.id = data.id
    result.company_id = data.company_id
    result.job_name = data.job_name
    result.job_user_name = data.job_user_name
    result.job_type = data.job_type
    result.pay_level = data.pay_level
    result.phone = data.phone
    result.work_area = data.work_area
    result.ments_number = data.ments_number
    result.ments_exp = data.ments_exp
    result.ments_education = data.ments_education
    result.welfare = JSON.stringify(data.welfare)
    result.map_address = data.map_address
    result.map_name = data.map_name
    result.map_longitude = data.map_longitude
    result.map_latitude = data.map_latitude
    result.job_description = data.job_description

    console.log('res', result)
    this.getFormdata(result)
  },






  // 生命周期函数--监听页面加载
  onLoad: function (op) {
    console.log('load', op)

    // 判断新增个人/公司岗位 -》 如果job_type == 1是新增公司岗位，设置data数据
    op.job_type == "gongsi" && this.setData({ job_type: 1, company_id: op.company_id, company_name: op.company_name })

    // 判断是-新增/编辑岗位 -> 有岗位id调用编辑方法获取岗位数据赋给data
    op.job_id && this.edit_Job(op.job_id)
  },



  // 编辑岗位 -> 去出岗位信息 -> 处理后传给wxml展示
  edit_Job: function (job_id) {
    job.get_Job_Detail(job_id, (res) => {
      console.log('get_Job_Detail', res)
      // return
      //处理《岗位福利》数据 详见edit_welfare
      // this.edit_welfare(JSON.parse(res.welfare))

      // this.setData({ welfareStr: (JSON.parse(res.welfare)).toString() })

      // 取出来的数据传给wxml展示
      this.setData({
        welfare: JSON.parse(res.welfare),
        welfareStr: (JSON.parse(res.welfare)).toString(),
        id: job_id,
        company_id: res.company_id,
        company_name: res.company_name,
        job_name: res.job_name,
        job_type: res.job_type,
        job_user_name: res.job_user_name,
        pay_level: res.pay_level,
        phone: res.phone,
        work_area: res.work_area,
        ments_number: res.ments_number,
        ments_exp: res.ments_exp,
        ments_sex: res.ments_sex,
        ments_education: res.ments_education,
        map_address: res.map_address,
        map_name: res.map_name,
        map_longitude: res.map_longitude,
        map_latitude: res.map_latitude,
        job_description: res.job_description,
      })
      console.log('qwe', this.data.welfare_list)
    })
  },

  // form提交 -> 处理提交来的数据 -> 请求给接口新增或更新
  getFormdata: function (result) {
    // console.log('shuju', e.detail.value)
    // return
    // let value = e.detail.value

    //验证数据 **********************************************************
    if (!wxValidate.checkForm(result)) {
      const error = wxValidate.errorList[0]
      // job.tip_Modal({ content: error.msg })
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    //处理提交来的数据 
    // value.welfare = JSON.stringify(value.welfare)           //岗位福利数组 转为 json字符储存

    //用岗位id - 判断是请求新增或更新  new Validata().isEmpty(result.id)
    if (result.id == 0) {
      job.create_job(result, (res) => { if (res.code == 201) { job.tip_Toast('发布成功') } else { job.tip_Toast('发布失败') } })
    } else {
      job.update_job(result, (res) => { if (res.code == 201) { job.tip_Toast('更新成功') } else { job.tip_Toast('更新失败') } })
    }
  },



  // 打开地图选择位置
  openMap() {
    authorize.authorize_map((res) => {
      console.log('authorize_map', res)
      if (res) {
        wx.chooseLocation({
          success: (res) => {
            console.log('chooseLocation - success', res)
            if (res.address) {
              let i = this.work_area(res.address, Config.work_place_data) // 检查map地址中包含Config工作区域数组中的哪一项,返回对应的下标
              this.setData({
                map_address: res.address.slice(3),  //删除'云南省曲靖市'
                map_name: res.name,
                map_longitude: res.longitude,
                map_latitude: res.latitude,
                work_area: i
              })
            }
          },
        })
      }
    })
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