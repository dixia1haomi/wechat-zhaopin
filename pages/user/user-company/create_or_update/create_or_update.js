import { Validata } from '../../../utils/validata.js'
import { Base } from '../../../utils/base.js'

const base = new Base()
const validata = new Validata()
Page({


  data: {
    company_size_data: ['1-49人', '50-99人', '100-499人', '500-999人', '1000以上'],

    company_nature_data: ['私营', '国有', '股份制', '外贸独资/ 办事处', '中外合资/ 合作', '上市公司', '事业单位', '非营利机构', '个人企业'],

    company_industry_data: [
      '娱乐休闲/餐饮/服务', '医疗/保健/卫生/美容', '金融/银行', '互联网/电子商务', '教育/科研/培训', '批发/零售', '发地产/物业管理', '陶瓷卫浴',
      '家居灯饰', '租赁服务', '咨询/顾问', '办公用品及设备', '保险', '汽车/摩托车', '旅游/酒店', '广告/创意', '服装/纺织/皮革', '中介/专业服务',
      '建筑/建材', '家居/室内设计/装潢', '贸易/进出口', '交通/运输/物流', '人力资源服务', '计算机软件', '计算机硬件', '原材料和加工',
      '媒体传播', '游戏', '农林牧渔', '化工/采掘/冶炼', '多元化集团', '其他行业'
    ],

    company_size_key: 0,
    company_nature_key: 0,
    company_industry_key: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    if (op.id) { this.edit_company(op.id) }
    // console.log(op.id)
    // this.edit_company(op.id)
  },

  //编辑公司 -》 取id -》 查公司信息 -》 传值给页面 -》 再提交
  edit_company: function (id) {
    //查公司信息 -》 传值给页面
    base.request({
      url: 'company/' + id,
      sCallback: (res) => {
        console.log(res)
        const { company_name, company_size, company_nature, company_industry, company_address, company_description } = res
        this.setData({
          company_id: id, company_name, company_address, company_description,
          company_size_key: company_size, company_nature_key: company_nature, company_industry_key: company_industry,
        })
      }
    })

    //提交

  },


  //公司-form提交的value
  getFormdata: function (e) {

    const { company_id, company_address, company_description, company_industry, company_name, company_nature, company_size
          } = e.detail.value

    //验证
    let check = this.valueCheck({ company_name, company_address, company_description })
    if (check) { return } //验证不通过不执行下面的

    //组织请求数据
    let url = 'company/create'
    let data = {
      'token_key': wx.getStorageSync('token_key'),
      'company_name': company_name,
      'company_size': company_size,
      'company_nature': company_nature,
      'company_industry': company_industry,
      'company_address': company_address,
      'company_description': company_description
    }

    //判断是更新还是新增
    if (!validata.isEmpty(company_id)) {
      url = 'company/update'
      data.id = company_id
    }

    //请求给接口
    base.request({
      url: url,
      method: 'POST',
      data: data,
      sCallback: function (res) {
        console.log('s', res)
        //判断发布是否成功
        if (res.code == 201) { base.tip_Toast('发布成功') } else { base.tip_Toast('发布失败') }
      }
    })
  },




  //公司-规模选择器
  company_size_picker: function (e) {
    this.setData({ company_size_key: e.detail.value })
  },
  //公司-性质选择器
  company_nature_picker: function (e) {
    this.setData({ company_nature_key: e.detail.value })
  },
  //公司-所属行业选择器
  company_industry_picker: function (e) {
    this.setData({ company_industry_key: e.detail.value })
  },



  //验证
  valueCheck: function (obj) {
    if (validata.isEmpty(obj.company_name)) {
      base.tip_Modal({ content: '公司名称不能为空' })
      return true
    }
    if (validata.isEmpty(obj.company_address)) {
      base.tip_Modal({ content: '公司地址不能为空' })
      return true
    }
    if (validata.isEmpty(obj.company_description)) {
      base.tip_Modal({ content: '公司描述不能为空' })
      return true
    }
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

  }
})