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
    if (callback) {
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

  // -------------------时间日期封装-----------------------

  //接受tp返回的日期时间格式"2017-11-02 00:25:46"的字符串 -> 转化成（刚刚）（2分钟前）（1小时前）...
  time(time) {
    //转化成时间戳
    let timestamp = Date.parse(new Date(time));
    //2014-07-10 10:21:12的时间戳为：1404958872  -> console.log(time + "的时间戳为：" + timestamp);

    // 定义 ： 月 / 天 / 时 / 分
    let minute = 1000 * 60;   // 分钟
    // let hour = minute * 60;   // 小时
    // let day = hour * 24;      // 天
    // let month = day * 30;     // 月

    // 计算相差时间
    let now = new Date().getTime();   //当前时间
    let diffValue = now - timestamp;   //时间差 = 当前时间 - 数据库取出的时间
    // let monthC = diffValue / month;     //相差多少月 = 时间差 / 月
    // let weekC = diffValue / (7 * day);    //相差多少周 = 时间差 / 7天
    // let dayC = diffValue / day;   //相差多少天 = 时间差 / 天
    // let hourC = diffValue / hour;   //相差多少小时 = 时间差 / 小时
    let minC = parseInt(diffValue / minute);  //相差多少分钟 = 时间差 / 分钟 (parseInt转成整数..后面有很多小数点)
    if (diffValue < 0) { return; }   //意外 -> 没有时间差？？？


    //处理返回结果
    if (minC < 1) { return "刚刚"}
    else if (minC >= 1 && minC < 60) { return minC + "分钟前"}
    else if (minC >= 60 && minC < 1440) { return "今天" }
    // else if (minC >= 60 && minC < 1440) { return parseInt(minC/60) + "小时前" }
    else if (minC >= 1440 && minC < 43200) { return parseInt(minC/1440) + "天前" }
    else { return parseInt(minC / 43200) + "个月前" }

    // 原来处理返回结果的方法
    // if (monthC >= 1) { res.update_time = parseInt(monthC) + "月前" }
    // else if (weekC >= 1) { res.update_time = parseInt(weekC) + "周前" }
    // else if (dayC >= 1) { res.update_time = parseInt(dayC) + "天前" }
    // else if (hourC >= 1) { res.update_time = parseInt(hourC) + "小时前" }
    // else if (minC >= 1) { res.update_time = parseInt(minC) + "分钟前" }
    // else { res.update_time = "刚刚" }
  }



}



export { Base }