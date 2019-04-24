//app.js
import Bmob from './utils/Bmob-1.7.0.min.js';
Bmob.initialize("b54caa93c07df4f0156791e6b15b594f", "8a26d9a27077cc1e6e52fe3abff0adfb");

App({
  onLaunch: function () {
    // 展示本地存储能力
    /*var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);*/

    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        
      }
    });*/

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //用户登录
          this.login();

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
            }
          });//end getUserInfo
        }//end if
      },
      fail: err => {
        console.log(err);
      }
    });//end getSetting
  },

  //使用Bmob登录小程序
  login: function () {
    Bmob.User.auth().then(res => {
      this.globalData.userOpenId = res.authData.weapp.openid;
      //this.setData({ userOpenId: res.authData.weapp.openid });
      console.log("success login");
    }).catch(err => {
      console.log(err);
    });
  },

  globalData: {
    userInfo: null,
    userOpenId: null,
  }
});