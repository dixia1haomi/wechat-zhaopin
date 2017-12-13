import { User } from '../user/user-model.js'
import { Company } from '../user-company/company-model.js'
import { Config } from '../utils/config.js'

const user = new User()
const company = new Company()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_industry_list: Config.company_industry_data,
    company_size_list: Config.company_size_data,
    company_nature_list: Config.company_nature_data,

    //jiazai
    jiazai:false
  },


  onLoad: function (options) { },

  onShow: function () {
    this.getUserCompany()   //获取用户关联的公司
  },


  //获取用户关联的公司-没有公司user_company = null
  getUserCompany: function () {
    user.getUserCompany_Model((res) => {
      console.log('获取用户关联的公司', res)
      this.setData({ user_company: res.user_company, jiazai: true })
    })
  },



  //删除公司

  // 删除公司-》关联删除所有岗位
  // 在前端实现-> 删除公司时判断公司是否还有关联的岗位，没有则删除公司，有则提示用户。
  delete_company: function (e) {
    const id = e.currentTarget.id
    console.log('公司id', id)

    user.tip_Modal({ content: '删除这个公司？', showCancel: true }, (res) => {
      if (res.confirm) {
        // 用户点击确定，检查公司名下有没有关联的岗位
        company.get_Company_Detail(id, (res) => {
          console.log('公司详细信息(包含关联的岗位)', res)
          if (res.company_in_job.length == 0) {
            console.log('没有公司-执行删除')
            company.delete_Company(id, (res) => {
              if (res.code == 201) {
                user.tip_Toast('删除成功')
                wx.navigateBack({ delta: 1 })
              } else {
                user.tip_Toast('删除失败')
              }
            })
            return false
          }
          console.log('有公司-提示')
          user.tip_Modal({ content: '公司名下还有正在招聘的岗位' })
        })
      }
    })
  },


})