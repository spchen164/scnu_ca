// pages/manageActivity/manageActivity.js
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo: null,
    deleteItem: [],
    addItem: [],
    isCloseModal: true,
    inputTitle: "",
    inputContent: "",
  },

  //活动卡片点击事件处理函数
  activityTapFunction: function (e) {

  },

  //添加对话框中获取标题函数
  onInputTitle: function(e) {
    this.setData({ inputTitle: e.detail.value });
  },

  //添加对话框中获取内容函数
  onInputContent: function(e) {
    this.setData({ inputContent: e.detail.value });
  },

  //获取要删除的项目
  getSelectedItem: function (e) {
    this.setData({ deleteItem: e.detail.value });
    console.log(this.data.deleteItem);
  },

  //添加按钮
  onAdd: function () {
    this.setData({ isCloseModal: false });
  },

  //添加对话框的确定键
  onModalConfirm: function () {
    const query = Bmob.Query("activity");
    query.set("title", this.data.inputTitle);
    query.set("content", this.data.inputContent);
    query.save().then(res => {
      this.updateActivityList();
      this.setData({ isCloseModal: true });
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    console.log("confirm");
    wx.showToast({ title: "已添加" });
  },

  //添加对话框的取消键
  onModalCancel: function () {
    this.setData({ isCloseModal: true });
    console.log("cancel");
  },

  //删除按钮
  onDelete: function () {
    wx.showModal({
      title: "警告",
      content: "是否删除？",
      confirmText: "是",
      confirmColor: "#f00",
      cancelText: "否",
      success: (res) => {
        if (res.confirm) {
          const query = Bmob.Query("avtivity");
          query.containedIn("objectId", this.data.deleteItem);
          query.find().then(del => {
            del.desdroyAll().then(r => {
              this.updateActivityList();
              console.log(r);
            });
          }).catch(err => {
            console.log(err);
          });
          console.log("deleted");
          wx.showToast({ title: "已删除" });
        }
      },//end success
    });
  },

  //更新活动列表函数
  updateActivityList: function () {
    const query = Bmob.Query("activity");
    query.order("-createdAt");
    query.find().then(res => {
      for (var i = 0; i < res.length; i++)
        res[i].isCheck = false;
      this.setData({
        activityInfo: res,
        deleteItem: [],
        addItem: [],
      });
      wx.stopPullDownRefresh();//停止刷新
      console.log("activity data has been got");
    }).catch(err => {
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateActivityList();
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
    this.updateActivityList();
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