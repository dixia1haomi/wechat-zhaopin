import { Validata } from '../utils/validata.js'
import { Company } from './company-model.js'
import { Config } from '../utils/config.js'
import WxValidate from '../../wx-validate/WxValidate.js'
import { Authorize } from '../utils/authorize.js'

const authorize = new Authorize()
const company = new Company
const validata = new Validata()

//初始化表单验证
const rules = {
  // 公司名称
  company_name: {
    required: true
  },
  // 公司地址
  company_address: {
    required: true,
    // minlength: 5  //最少输入5个字符
  },
  // 公司描述
  company_description: {
    required: true,
    minlength: 5  //最少输入5个字符
  }
}

const messages = {
  // 公司名称
  company_name: {
    required: '公司名不能为空'
  },
  // 公司地址
  company_address: {
    required: '公司地址不能为空',
    // minlength: '地址最少输入5个字符'
  },
  // 公司描述
  company_description: {
    required: '描述不能为空',
    minlength: '描述最少输入5个字符'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

Page({

  data: {
    //公司规模
    company_size_data: Config.company_size_data,
    //公司性质
    company_nature_data: Config.company_nature_data,
    //公司所属行业
    company_industry_data: Config.company_industry_data,

    // company_size_key: 0,
    // company_nature_key: 0,
    // company_industry_key: 0,
    //textarea计数
    textarea_cursor: 0,
    //打开地图选择的公司地址
    // company_address: ''

    // 编辑获取的数据和将要提交的数据都在里面
    companyRes: {
      id: '',
      company_name: '',
      company_address: '',
      company_description: '',
      company_industry: 0,
      company_nature: 0,
      company_size: 0,
    }
  },



  onLoad: function (op) {
    op.id && this.edit_company(op.id) // 有id就是编辑，没有就是新增
  },

  //编辑公司 -》 取id -》 查公司信息 -》 传值给页面 -》 再提交
  edit_company: function (id) {
    company.get_Company_Detail(id, (res) => {
      console.log('查公司信息', res)
      this.setData({ companyRes: res })
    })
  },



  //公司-form提交的value
  getFormdata: function (e) {
    let value = e.detail.value
    console.log('提交的value', value)
    //验证数据 **********************************************************
    if (!wxValidate.checkForm(e)) {
      const error = wxValidate.errorList[0]
      company.tip_Modal({ content: error.msg })
      return false
    }


    //组织请求数据 -> 判断是更新还是新增
    if (validata.isEmpty(value.id)) {
      company.create_Company(value, (res) => { if (res.code == 201) { company.tip_Toast('发布成功') } else { company.tip_Toast('发布失败') } })
    } else {
      company.update_Company(value, (res) => { if (res.code == 201) { company.tip_Toast('更新成功') } else { company.tip_Toast('更新失败') } })
    }
  },




  //公司-规模选择器
  company_size_picker: function (e) {
    this.setData({ 'companyRes.company_size': e.detail.value })
  },
  //公司-性质选择器
  company_nature_picker: function (e) {
    this.setData({ 'companyRes.company_nature': e.detail.value })
  },
  //公司-所属行业选择器
  company_industry_picker: function (e) {
    this.setData({ 'companyRes.company_industry': e.detail.value })
  },

  // textarea输入计数
  textarea(e) { this.setData({ textarea_cursor: e.detail.cursor }) },


  // 打开地图选择位置 - 授权通过->开地图
  openMap() {
    authorize.authorize_map((res) => {
      console.log('authorize_map', res)
      res && wx.chooseLocation({ success: (res) => { this.setData({ 'companyRes.company_address': res.address +'-'+ res.name }) } })
    })
  },
  // console.log('chooseLocation - success', res)

})