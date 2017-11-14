// import { QQMapWX } from '../../wx-map-sdk/qqmap-wx-jssdk.js'

// const qqMap = new QQMapWX()

const QQMapWX = require('../../wx-map-sdk/qqmap-wx-jssdk.js')

// 实例化API核心类
const qqmapsdk = new QQMapWX({ key: '7BABZ-AQTKF-M2XJY-JBKHV-44Y5V-T3FO7' });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/pages/img/zhedie.png",
      id: 0,
      latitude: 25.48999999999999,
      longitude: 103.796167,
      width: 50,
      height: 50
    }],

    longitude: 0,
    latitude: 0,
    title: ''
  },

  // wxapi-获取当前的地理位置
  getLocation() {
    let that = this
    wx.getLocation({
      // type: 'wgs84',
      success: function (res) {
        console.log('wxapi-获取当前的地理位置', res)
        that.setData({ latitude: res.latitude, longitude: res.longitude })
        that.putZuoBiao_getDiZhi(res.latitude, res.longitude)   //输入坐标获取地址,让input显示地址
      },
    })
  },


  //qq_map输入坐标获取地址
  putZuoBiao_getDiZhi(lat, lng) {
    let that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success: function (res) {
        console.log('输入坐标获取地址', res);
        that.setData({ dingweiweizhi: res.result.address })
      },
    });
  },

  // wx-api 打开地图选择位置。
  open_map() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log('打开地图选择位置', res)
        that.setData({
          name: res.name,
          address:res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },

// wx-api ​使用微信内置地图查看位置。
open_neizhimap(){
  wx.openLocation({
    latitude: this.data.latitude,
    longitude: this.data.longitude,
    scale: 28,
    name:this.data.name,
    address:this.data.address,
    success: function (res) {
      console.log('使用微信内置地图查看位置', res)
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },

  // 获取当前地图中心的经纬度
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

  // 将地图中心移动到当前定位点，需要配合map组件的show-location使用
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  // 平移marker，带动画
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },

  // 缩放视野展示所有经纬度
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 调用接口
    // qqmapsdk.search({
    //   keyword: '酒店',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });



  },
  // 获取全国城市列表数据。
  // qqmapsdk.getCityList({
  //   success: function (res) {
  //     console.log(res);
  //   }
  // });

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

  },

  input1(e) {
    let that = this
    console.log('input1', e.detail.value)
    this.setData({ input1: e.detail.value })

    // 关键字补充接口
    qqmapsdk.getSuggestion({
      keyword: this.data.input1,          //关键字
      region: '曲靖市',         //限制城市.只匹配曲靖
      region_fix: 1,            //固定在当前城市，不会自动扩大到全国
      policy: 1,                //检索策略，目前支持：policy=0：默认，常规策略 policy= 1：本策略主要用于收货地址、上门服务地址的填写， 
      success: function (res) {
        console.log('关键字补充接口', res);
        that.setData({ buchong: res.data })
      }
    });
  },

  // text-title事件
  title(e) {
    console.log('text-title事件', e)
    this.setData({
      title: e.currentTarget.dataset.title,
      latitude: e.currentTarget.dataset.zuobiao.lat,
      longitude: e.currentTarget.dataset.zuobiao.lng,
      'markers[0].latitude': e.currentTarget.dataset.zuobiao.lat,
      'markers[0].longitude': e.currentTarget.dataset.zuobiao.lng,
    })
  },

})