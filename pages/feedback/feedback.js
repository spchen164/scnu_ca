// pages/feedback/feedback.js
//import Bmob
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenid: app.globalData.userOpenid,
  },

  submit: function (e) {
    let form = e.detail.value;
    if (form.feedback == "") {
      wx.showToast({ title: "反馈文本不能为空", icon: "none" });
      return;
    }
    if (form.name == "") {
      wx.showToast({ title: "姓名不能为空", icon: "none" });
      return;
    }
    if (form.phone == "") {
      wx.showToast({ title: "联系方式不能为空", icon: "none" });
      return;
    }

    //保存到数据库中
    const query = Bmob.Query("feedback");
    query.set("userOpenid", this.data.userOpenid);
    query.set("content", form.content);
    query.set("name", form.name);
    query.set("phone", form.phone);
    query.save().then(res => {
      console.log(res);
      wx.showToast({ title: "已提交" });
    }).catch(err => {
      console.log(err);
    });

    //跳转回“我”的页面
    wx.navigateBack();

    /*后续最好添加提醒功能*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ userOpenid: app.globalData.userOpenid });//不知道为什么不能在data赋值
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