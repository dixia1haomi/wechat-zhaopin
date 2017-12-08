import { User } from '../../user/user-model.js'

const user = new User()
Page({

  data: {

  },

  onLoad: function (options) {

  },

  // 新增个人类别
  jobType_geren() {
    wx.navigateTo({
      url: '/pages/user-job/creata_or_update/create_or_update_job?job_type=' + 'geren',
    })
  },

  // 新增公司/店铺类别
  jobType_company() {
    this.get_Company_Data()
  },

  //创建公司类别的岗位时-查询用户是否有关联的公司 getUserCompany_Model
  get_Company_Data: function () {
    //判断用户名下是否有公司 -> 有就携带公司id,名字跳转创建岗位页面 -> 没有就提示用户去创建公司
    user.getUserCompany_Model((res) => {
      let company = res.user_company
      console.log('获取用户关联的公司', res)

      if (company == null) {
        user.tip_Modal({ content: '你还没有创建公司/店铺信息', showCancel: true, confirmText: '去创建' }, (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            // wx.navigateTo({ url: '/pages/user-company/company' })
            wx.navigateTo({ url: '/pages/user-company/create_or_update' })
          }
        })
        return false
      }

      // 有公司-跳转创建公司/店铺岗位-携带job_type，company_id，company_name参数
      wx.navigateTo({
        url: '/pages/user-job/creata_or_update/create_or_update_job?job_type=' + 'gongsi' + '&company_id=' + company.id + '&company_name=' + company.company_name,
      })

    })
  },
})