// pages/about/about.js
//import Bmob
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    version: app.globalData.version,
    officialAccount: "",
    copyright: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let acount;
    let right;
    const query = Bmob.Query("_Article");
    query.find().then(res => {
      console.log(res);
      for(let i = 0; i < res.length; i++) {
        if(res[i].title == "公众号信息")
          acount = res[i].content;
        if(res[i].title == "版权信息")
          right = res[i].content;
      }
      this.setData({
        officialAccount: acount,
        copyright: right,
      })
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