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
          this.login();//存在异步操作

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
            },
            fail: err => {
              console.log(err);
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
      this.globalData.userOpenid = res.authData.weapp.openid;
      if(this.getUserCallBack)//判断是否需要将openid回传
        this.getUserCallBack(res.authData.weapp.openid);
      this.recordUser(res.authData.weapp.openid);
      this.getIsAdmin(res.authData.weapp.openid);
      console.log("success login");
    }).catch(err => {
      console.log(err);
    });
  },

  //从数据库获取管理员权限
  getIsAdmin: function(openid) {
    const query = Bmob.Query("user");
    query.equalTo("userOpenid", "==", openid);

    query.find().then(res => {
      if(res.length > 0 && res[0].isAdmin == true)
        this.globalData.isAdmin = true;
      else
        this.globalData.isAdmin = false;
      if (this.getUserIsAdmin)//判断是否需要将管理员权限回传
        this.getUserIsAdmin(this.globalData.isAdmin);
    }).catch(err => {
      console.log(err);
    });
  },

  //将用户数据写到另一个表中，比较简洁，不用Bmob自带的_User
  recordUser: function(openid) {
    const query = Bmob.Query("user");
    query.equalTo("userOpenid", "==", openid);
    
    query.find().then(res => {
      if(res.length <= 0)//表中不存在该用户
      {
        query.set("userOpenid", openid);
        query.set("isVIP", false);
        query.set("isTech", false);
        query.set("isAdmin", false);
        query.set("userInfo", this.globalData.userInfo);
        query.save().then(res => {
          console.log("recorded");
        }).catch(err => {
          console.log(err);
        });
      }
      else  //为了保证信息更新，用户登录后更新用户信息
      {
        query.set("id", res[0].objectId);//Bmob修改数据需要objectId
        query.set("userInfo", this.globalData.userInfo);
        query.save().then(res => {
          console.log("updated");
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    });
  },

  globalData: {
    version: "1.0",
    userInfo: null,
    userOpenid: null,
    isAdmin: null,
  }
});