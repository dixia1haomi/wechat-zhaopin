
// 用户授权类 ** （几个授权代码都差不多，可以考虑再次封装成传参决定授权哪个）
class Authorize {
  constructor() { }


  // --------授权用户信息-userinfo------
  authorize_userinfo(callBack) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() { callBack && callBack(true) },
            fail() {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userInfo']) { callBack && callBack(true) }
                }
              })
            }
          })
        } else {
          callBack && callBack(true)
        }
      }
    })
  }
  //------使用实例-------
  // login: function () {
  //   authorize.authorize_userinfo((res) => {   //授权
  //     console.log('login', res)
  //     if (res) {
  //       wx.getUserInfo({  //  获取用户信息
  //         withCredentials: false,
  //         success: (res) => {
  //           console.log('success', res)
  //           user.updateUserInfo(res.userInfo, (data) => { // 调用 更新数据
  //             console.log('数据储存成功', data)
  //             app.appData.authorizeUserInfo = true  // 服务器回调了succsee后设置全局用户信息授权变量
  //             wx.setStorageSync('userinfo', res.userInfo) // 服务器回调了succsee后缓存用户信息
  //             this.onShow() //刷新页面
  //           })
  //         }
  //       })
  //     }
  //   })
  // }



  // --------授权地图-userLocation-----
  authorize_map(callBack) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() { callBack && callBack(true) },
            fail() {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userLocation']) { callBack && callBack(true) }
                }
              })
            }
          })
        } else {
          callBack && callBack(true)
        }
      }
    })
  }
  //------使用实例-------
  // openMap() {
  //   authorize.authorize_map((res) => {
  //     console.log('authorize_map', res)
  //     if (res) {
  //       wx.chooseLocation({
  //         success: (res) => {
  //           console.log('chooseLocation - success', res)
  //           if (res.address) {
  //             let i = this.work_area(res.address, Config.work_place_data) // 检查map地址中包含Config工作区域数组中的哪一项,返回对应的下标
  //             this.setData({
  //               map_address: res.address.slice(3),  //删除'云南省曲靖市'
  //               map_name: res.name,
  //               map_longitude: res.longitude,
  //               map_latitude: res.latitude,
  //               work_area: i
  //             })
  //           }
  //         },
  //       })
  //     }
  //   })
  // }




  //  --------授权通讯地址-address---------
  authorize_address(callBack) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() { callBack && callBack(true) },
            fail() {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.address']) { callBack && callBack(true) }
                }
              })
            }
          })
        } else {
          callBack && callBack(true)
        }
      }
    })
  }

  // 授权电话号码

}

export { Authorize }