
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