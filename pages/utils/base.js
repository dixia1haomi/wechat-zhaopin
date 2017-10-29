import { Config } from 'config.js'

class Base {

  constructor() {
    // this.baseRequestUrl = Config.restUrl
  }

  //网络请求封装
  request(params) {
    var url = Config.restUrl + params.url
    // var url = this.baseRequestUrl + params.url

    if (!params.method) {
      params.method = 'GET'
    }

    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token_key': wx.getStorageSync('token_key')
      },
      method: params.method,
      success: function (res) {
        params.sCallback && params.sCallback(res.data)
      },
      fail: function (err) {
        console.log('request-fail', err)
      }
    })
  }


  //登录获取token
  get_token_key(callBack) {

    //登录
    wx.login({
      success: res => {

        this.request({
          url: 'token/user',
          method: 'POST',
          data: { code: res.code },
          sCallback: function (res) {
            wx.setStorageSync('token_key', res.token_key) //缓存token
            callBack && callBack(res)
          }
        })

      }
    })

  }

  //模态弹窗封装
  tip_Modal(params, callback) {
    var show = false
    if (callback){
       show = true
    }
    wx.showModal({
      // title: '提提',
      content: params.content,
      showCancel: show, //是否显示取消按钮
      success: function (res) {
        callback && callback(res)
        // if (res.confirm) {
        //   console.log('用户点击确定')
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
      }
    })
  }

  //Toast弹窗封装
  tip_Toast(param) {
    wx.showToast({
      title: param,
      // icon: 'success',
      // duration: 2000
    })
  }


}



export { Base }