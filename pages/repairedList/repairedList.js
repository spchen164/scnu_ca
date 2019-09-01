// pages/repairedList/repairedList.js
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
    isAdmin: app.globalData.isAdmin,
    repairing: app.globalData.repairing,
    repaired: app.globalData.repaired,
    repairedList: [],
    isCloseModal: true,
    selectedObjectId: null,
    suggestion: "",
  },

  //单击维修单事件
  orderTapFunction: function (e) {
    this.setData({
      isCloseModal: false,
      selectedObjectId: e.currentTarget.dataset.objectid,
    });
  },

  //对话框确定键
  onModalConfirm: function () {
    if(this.data.suggestion != "") {
      const query = Bmob.Query("repair");
      query.set("id", this.data.selectedObjectId);
      query.set("suggestion", this.data.suggestion);
      query.save().then(res => {
        console.log(res);
        this.setData({
          isCloseModal: true,
          selectedObjectId: null,
          suggestion: "",
        });
        wx.showToast({ title: "已完成" });
        this.updateList();
      }).catch(err => {
        console.log(err);
      });
    }//end if
    else {
      wx.showToast({ title: "评价不能为空", icon: "none"});
    }
  },

  //对话框取消键
  onModalCancel: function () {
    this.setData({
      isCloseModal: true,
      selectedObjectId: null,
    });
    console.log("cancel");
  },

  //更新列表
  updateList: function () {
    const query = Bmob.Query("repair");
    query.equalTo("status", "==", this.data.repaired);
    query.order("-updatedAt");
    query.find().then(res => {
      this.setData({ repairedList: res });
      wx.stopPullDownRefresh();
    }).catch(err => {
      console.log(err);
    });
  },

  //获取用户评价
  getSuggestion: function(e) {
    this.setData({ suggestion: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateList();
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
    this.updateList();
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