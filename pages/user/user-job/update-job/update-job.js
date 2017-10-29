import { Job } from '../../../job/job-model.js'
import { User } from '../../user-model.js'
import { Validata } from '../../../utils/validata.js'

var validata = new Validata()
var user = new User()
var job = new Job()


Page({

  data: {
    array: ['曲靖', '麒麟', '沾益'],
    // workArea_array_key: 0,
    // company_key: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    console.log(op)
    this.get_Job_Detail(op.id)
  },


  //获取岗位详细信息学->用于更新
  get_Job_Detail: function (id) {
    job.get_Job_Detail(id, (res) => {

      //获取岗位信息成功后再获取公司信息
      //如果有公司
      if (res.company_id != 0) {
        this.getUserCompany(res)
        return
      }

      //把获取的信息赋值给页面的input
      //根据work_area的值获取定义的下标
      var array = this.data.array
      for (var b in array) {
        if (array[b] == res.work_area) {
          var workArea_array_key = b
        }
      }

      this.setData({
        workArea_array_key: workArea_array_key,
        job: res
      })


      //1.不包含公司

      //2.包含公司 -> 公司名字赋给页面 -> 选择公司 -> 查询用户名下所有公司给picker(根据公司的picker值获取公司实际id) -> 更新

    })
  },



  //创建岗位时获取用户关联的公司
  getUserCompany: function (res) {
    user.getUserCompany_Model((c_res) => {
      console.log('用户关联的公司', c_res.user_company)

      //根据岗位中的公司id获取公司数组对应的下标 -> 用于页面显示正确的公司名
      var c_array = c_res.user_company
      for (var a in c_array) {
        if (c_array[a].id == res.company_id) {
          var company_array_key = a
        }
      }

      //根据岗位中work_area的值获取自定义数组的下标 -> 用于页面显示正确的地区名
      var array = this.data.array
      for (var b in array) {
        if (array[b] == res.work_area) {
          var workArea_array_key = b
        }
      }

      this.setData({
        company_array_key: company_array_key,
        workArea_array_key: workArea_array_key,
        company: c_res.user_company,
        job: res
      })
    })
  },


  //公司选择器
  bindPickerCompany: function (e) {
    console.log('picker公司选择改变，携带值为', e.detail.value)
    console.log('picker公司选择改变，携带id为', this.data.company[e.detail.value].id)
    //获取真实的公司id
    // var company = this.data.company

    this.setData({
      // company_id: this.data.company[e.detail.value].id,
      company_array_key: e.detail.value
    })
  },


  //地区选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      workArea_array_key: e.detail.value
    })
  },




  //获取form提交的数据
  getFormdata: function (e) {
    var value = e.detail.value

    // console.log(value.description.length)
    // return

    if (validata.isEmpty(value.job_name)) {
      job.tip_Modal({ content:'职位名称不能为空'})
      return
    }
    if (validata.isEmpty(value.detailed_address)) {
      job.tip_Modal({ content:'详细地址不能为空'})
      return
    }
    if (validata.isEmpty(value.description) || (value.description).length < 10) {
      job.tip_Modal({ content:'职位描述不能为空且必须大于10个字符'})
      return
    }




    //请求给接口

    var params = {
      url: 'job/update',
      method: 'POST',
      data: {
        'token_key': wx.getStorageSync('token_key'),  //携带token
        'id': this.data.job.id,
        'company_id': 0,
        'job_name': value.job_name,
        'pay_level': value.pay_level,
        'work_area': value.work_area,
        'detailed_address': value.detailed_address,
        'job_description': value.description
      },
      sCallback: function (res) {
        // console.log('s', res)
        //判断发布是否成功
        if (res.code == 201) {
          job.tip_Toast('更新成功')
        } else {
          job.tip_Toast('更新成功')
        }
      }
    }

    //如果有公司，就取公司id传入，没得公司默认=0
    if (this.data.company) {
      params.data.company_id = this.data.company[value.company_id].id
    }

    user.request(params)

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