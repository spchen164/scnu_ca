// pages/me/me.js
//import Bmob
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userOpenid: null,
    isAdmin: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//检查登录按钮功能是否能用
    items: [//菜单选项
      {
        text: "报修",
        url: "../repair/repair",
      },
      {
        text: "进行中的维修单",
        url: "../repairingList/repairingList",
      },
      {
        text: "已完成的维修单",
        url: "../repairedList/repairedList",
      },
      {
        text: "会员登记缴费",
        url: "../VIPRegister/VIPRegister",
      },
      {
        text: "关于",
        url: "../about/about",
      },
      {
        text: "意见反馈",
        url: "../feedback/feedback",
      },
    ],//end items
    rootItems: [
      {
        text: "管理员管理",
        url: "../manageAdmin/manageAdmin",
      },
      {
        text: "技术人员管理",
        url: "../manageTech/manageTech",
      },
      {
        text: "会员管理",
        url: "../manageVIP/manageVIP",
      },
    ],//end rootItems
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否已经拥有用户信息
    if(app.globalData.userInfo && app.globalData.userOpenid)
    {
      this.setData({
        userInfo: app.globalData.userInfo,
        userOpenid: app.globalData.userOpenid,
        isAdmin: app.globalData.isAdmin,
      });
    }
    else if (!this.data.canIUse)//对没有open-type的版本做兼容
    {
      wx.getUserInfo({
        success: res => {
          app.login();//存在异步操作
          app.globalData.userInfo = res.userInfo;
          this.setData({userInfo: res.userInfo});

          //判断是否存在openid。若不存在，则需要通过回调函数将获取到的值赋值到这里
          if (app.globalData.userOpenid)
            this.setData({ userOpenid: app.globalData.userOpenid });
          else
          {
            app.getUserCallBack = openid => {
              this.setData({ userOpenid: openid });
            };
          }

          //判断是否已获取管理员权限。若不存在，则通过回调函数获取
          if(app.globalData.isAdmin)
            this.setData({ isAdmin: app.globalData.isAdmin });
          else
          {
            app.getUserIsAdmin = admin => {
              this.setData({ isAdmin: admin });
            };
          }
        }//end success
      });//end getUserInfo
    }
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

  },



  //获取用户信息
  getUserInfo: function (e) {
    if(e.detail.userInfo)
    {
      app.login();//存在异步操作
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({userInfo: e.detail.userInfo});

      //判断是否存在openid。若不存在，则需要通过回调函数将获取到的值赋值到这里
      if(app.globalData.userOpenid)
        this.setData({ userOpenid: app.globalData.userOpenid});
      else
      {
        app.getUserCallBack = openid => {
          this.setData({userOpenid: openid});
        };
      }

      //判断是否已获取管理员权限。若不存在，则通过回调函数获取
      if (app.globalData.isAdmin)
        this.setData({ isAdmin: app.globalData.isAdmin });
      else
      {
        app.getUserIsAdmin = admin => {
          this.setData({ isAdmin: admin });
        };
      }
    }
  },
})