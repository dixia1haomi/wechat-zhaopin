import { Config } from 'config.js'
import { Token } from '../utils/token.js'

class Base {

  constructor() {
    // this.baseRequestUrl = Config.restUrl
  }

  // 在当前页面显示导航条加载动画。
  // wx.showNavigationBarLoading()
  // 隐藏导航条加载动画。
  // wx.hideNavigationBarLoading()

  //网络请求封装,noRefetch为true时不在重试请求，详见Refetch
  request(params, noRefetch) {
    
    wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画。

    let that = this
    let url = Config.restUrl + params.url
    if (!params.method) { params.method = 'GET' }

    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token_key': wx.getStorageSync('token_key')
      },
      method: params.method,
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
          wx.hideNavigationBarLoading()   // 隐藏导航条加载动画。
        } else {
          if (code == '401') {
            if (!noRefetch) { that._refetch(params) }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) { that._processError(err) }
    })
  }

  // 请求错误
  _processError(err) { console.log('base-request-fail', err) }

  // 请求接口失败重试
  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
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
      showCancel: params.showCancel || false, //是否显示取消按钮
      cancelText: params.cancelText || '取消',  //取消按钮文字最多4个
      confirmText: params.confirmText || '确定',//确定按钮文字最多4个
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
    if (minC < 1) { return "刚刚" }
    else if (minC >= 1 && minC < 60) { return minC + "分钟前" }
    else if (minC >= 60 && minC < 1440) { return "今天" }
    // else if (minC >= 60 && minC < 1440) { return parseInt(minC/60) + "小时前" }
    else if (minC >= 1440 && minC < 43200) { return parseInt(minC / 1440) + "天前" }
    else { return parseInt(minC / 43200) + "个月前" }

    // 原来处理返回结果的方法
    // if (monthC >= 1) { res.update_time = parseInt(monthC) + "月前" }
    // else if (weekC >= 1) { res.update_time = parseInt(weekC) + "周前" }
    // else if (dayC >= 1) { res.update_time = parseInt(dayC) + "天前" }
    // else if (hourC >= 1) { res.update_time = parseInt(hourC) + "小时前" }
    // else if (minC >= 1) { res.update_time = parseInt(minC) + "分钟前" }
    // else { res.update_time = "刚刚" }
  }





  // 微信内置地图-查看-位置  * 查看地图不需要授权
  seeMap(params, scallBack) {

    wx.openLocation({
      latitude: params.latitude,
      longitude: params.longitude,
      scale: params.scale,
      name: params.name,
      address: params.address,
      success: (res) => {
        console.log('seeMap微信内置地图-查看-位置-success', res)
        scallBack && scallBack(res)
      },
      fail: (err) => { console.log('seeMap微信内置地图-查看-位置-fail', err) }
    })
  }

}



export { Base }