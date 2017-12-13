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
    rangelength: [20, 1000]
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
    rangelength: '描述在20-1000个字之间'
  }
}

const wxValidate = new WxValidate(rules, messages)  // 实例化表单验证

Page({

  data: {
    //公司规模
    company_size_list: Config.company_size_data,
    //公司性质
    company_nature_list: Config.company_nature_data,
    //公司所属行业
    company_industry_list: Config.company_industry_data,

    // 编辑获取的数据和将要提交的数据都在里面
    companyRes: {
      id: '',
      company_name: '',
      company_size: 0,
      company_nature: 0,
      company_industry: 0,
      company_address: '',
      company_description: '',
    },

    // 蒙层状态
    sheetState_size: false,
    sheetState_nature: false,
    sheetState_industry: false,
    sheetState_description: false,
    toptips_kaiguan: false,
    toptips_text: '',

    //jiazai
    jiazai:false
  },

  // 公司名称
  company_nameEvent(e) {
    console.log('company_nameEvent', e.detail)
    this.setData({ 'companyRes.company_name': e.detail.value })
  },

  // <!--规模 -->
  sheetState_size() { this.setData({ sheetState_size: true }) },
  company_sizeEvent(e) {
    console.log('company_sizeEvent', e.detail)
    e.detail.index !== false && this.setData({ 'companyRes.company_size': e.detail.index })
  },

  // <!--性质 -->
  sheetState_nature() { this.setData({ sheetState_nature: true }) },
  company_natureEvent(e) {
    console.log('company_natureEvent', e.detail)
    e.detail.index !== false && this.setData({ 'companyRes.company_nature': e.detail.index })
  },

  // <!--所属行业 -->
  sheetState_industry() { this.setData({ sheetState_industry: true }) },
  company_industryEvent(e) {
    console.log('company_industryEvent', e)
    e.detail.index !== false && this.setData({ 'companyRes.company_industry': e.detail.index })
  },

  // <!--公司地址 -->
  company_addressEvent(e) {
    console.log('company_addressEvent', e)
  },

  // <!--描述 -->
  sheetState_description() { this.setData({ sheetState_description: true }) },
  company_descriptionEvent(e) {
    console.log('company_descriptionEvent', e.detail)
    e.detail && this.setData({ 'companyRes.company_description': e.detail })
  },

  // <!--提交 -->
  submit() {
    this.getFormdata(this.data.companyRes)
  },


  onLoad: function (op) {
    op.id ? this.edit_company(op.id) : this.setData({ jiazai: true }) // 有id就是编辑，没有就是新增
  },


  //编辑公司 -》 取id -》 查公司信息 -》 传值给页面 -》 再提交
  edit_company: function (id) {
    company.get_Company_Detail(id, (res) => {
      console.log('查公司信息', res)
      delete res.user_id
      this.setData({ companyRes: res, jiazai: true })
    })
  },

  //公司-form提交的value
  getFormdata: function (companyRes) {
    console.log('提交的value', companyRes)
    //验证数据 **********************************************************
    if (!wxValidate.checkForm(companyRes)) {
      const error = wxValidate.errorList[0]
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    //组织请求数据 -> 判断是更新还是新增
    if (validata.isEmpty(companyRes.id)) {
      company.create_Company(companyRes, (res) => {
        if (res.code == 201) {
          company.tip_Modal({ content: '创建成功' }, (Modal) => { if (Modal.confirm) { wx.navigateBack({ delta: 1 }) } })
        } else {
          company.tip_Toast('创建失败')
        }
      })
    } else {
      company.update_Company(companyRes, (res) => {
        if (res.code == 201) {
          company.tip_Modal({ content: '更新成功' }, (Modal) => { if (Modal.confirm) { wx.navigateBack({ delta: 1 }) } })
        } else {
          company.tip_Toast('更新失败')
        }
      })
    }
  },


  // 打开地图选择位置 - 授权通过->开地图
  openMap() {
    authorize.authorize_map((res) => {
      console.log('authorize_map', res)
      res && wx.chooseLocation({ success: (res) => { this.setData({ 'companyRes.company_address': res.address + '-' + res.name }) } })
    })
  },


})