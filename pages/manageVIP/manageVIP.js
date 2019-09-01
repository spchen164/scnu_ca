// pages/manageVIP/manageVIP.js
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
    VIPInfo: null,
    notVIPInfo: null,
    deleteItem: [],
    addItem: [],
    isCloseModal: true,
  },

  //用户卡片点击事件处理函数
  cardTapFunction: function (e) {

  },

  //获取要删除的项目
  getSelectedItem: function (e) {
    this.setData({ deleteItem: e.detail.value });
    console.log(this.data.deleteItem);
  },

  //获取要添加的项目
  getAddItem: function (e) {
    this.setData({ addItem: e.detail.value });
    console.log(this.data.addItem);
  },

  //添加按钮
  onAdd: function () {
    const query = Bmob.Query("user");
    query.equalTo("isVIP", "==", false);
    query.find().then(res => {
      for (var i = 0; i < res.length; i++)
        res[i].isCheck = false;
      this.setData({
        notVIPInfo: res,
        isCloseModal: false,
        addItem: [],
      });
    }).catch(err => {
      console.log(err);
    })
    console.log("added");
  },

  //添加对话框的确定键
  onModalConfirm: function () {
    const query = Bmob.Query("user");
    query.containedIn("userOpenid", this.data.addItem);

    query.find().then(todo => {
      todo.set("isVIP", true);//授予VIP
      todo.saveAll().then(res => {//保存到数据库
        console.log(res);
        this.setData({ isCloseModal: true });
        this.updateUserList();
      }).catch(err => {
        console.log(err);
      });
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
          const query = Bmob.Query("user");
          query.containedIn("userOpenid", this.data.deleteItem);

          query.find().then(todo => {
            todo.set("isVIP", false);//取消VIP
            todo.saveAll().then(res => {//保存到数据库
              console.log(res);
              this.updateUserList();
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          })
          console.log("deleted");
          wx.showToast({ title: "已删除" });
        }
      },//end success
    });
  },

  //更新用户列表函数
  updateUserList: function () {
    const query = Bmob.Query("user");
    query.equalTo("isVIP", "==", true);
    query.find().then(res => {
      for (var i = 0; i < res.length; i++)
        res[i].isCheck = false;
      this.setData({
        VIPInfo: res,
        deleteItem: [],
        addItem: [],
      });
      wx.stopPullDownRefresh();//停止刷新
      console.log("VIP data has been got");
    }).catch(err => {
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateUserList();
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
    this.updateUserList();
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