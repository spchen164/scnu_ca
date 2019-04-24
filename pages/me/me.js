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
    userOpenId: null,
    canIUse: wx.canIUse('button.open-type'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.canIUse);
    //判断是否已经拥有用户信息
    if(app.globalData.userInfo)
    {
      this.setData({
        userInfo: app.globalData.userInfo,
        userOpenId: app.globalData.userOpenId,
      });
    }
    else if (!this.canIUse)//对没有open-type的版本做兼容
    {
      wx.getUserInfo({
        success: res => {
          app.login();
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            userOpenId: app.globalData.userOpenId,
          });
        }
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
      app.login();
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        userOpenId: app.globalData.userOpenId,
      });
    }
  },
})