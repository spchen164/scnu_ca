//app.js
import Bmob from './utils/Bmob-1.7.0.min.js';
Bmob.initialize("b54caa93c07df4f0156791e6b15b594f", "8a26d9a27077cc1e6e52fe3abff0adfb");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    Bmob.User.auth().then(res => {
      console.log(res.authData.weapp.openid);
    });
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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });//end getUserInfo
        }//end if
      }
    });//end getSetting
  },
  globalData: {
    userInfo: null
  }
});