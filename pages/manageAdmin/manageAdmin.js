// pages/manageAdmin/manageAdmin.js
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenid: app.globalData.userOpenid,
    userInfo: app.globalData.userInfo,
    adminInfo: null,
    deleteItem: [],
  },

  cardTapFunction: function(e) {
    
  },

  getSelectedItem: function(e) {
    this.setData({deleteItem: e.detail.value});
    console.log(this.data.deleteItem);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = Bmob.Query("user");
    query.equalTo("isAdmin", "==", true);
    query.find().then(res => {
      this.setData({adminInfo: res});
      console.log("administrator data has been got");
    }).catch(err => {
      console.log(err);
    });
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

  }
})