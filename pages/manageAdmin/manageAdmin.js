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

  //用户卡片点击事件处理函数
  cardTapFunction: function(e) {
    
  },

  //获取要删除的项目
  getSelectedItem: function(e) {
    this.setData({deleteItem: e.detail.value});
    console.log(this.data.deleteItem);
  },

  //添加按钮
  onAdd: function() {
    console.log("added");
  },

  //删除按钮
  onDelete: function() {
    wx.showModal({
      title: "警告",
      content: "是否删除？",
      confirmText: "是",
      confirmColor: "#f00",
      cancelText: "否",
      success: (res) => {
        if(res.confirm)
        {
          const query = Bmob.Query("user");
          query.containedIn("userOpenid", this.data.deleteItem);

          query.find().then(todo => {
            todo.set("isAdmin", false);//取消管理员权限
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
          wx.showToast({title: "已删除"});
        }
      },//end success
    });
  },

  //更新用户列表函数
  updateUserList: function() {
    const query = Bmob.Query("user");
    query.equalTo("isAdmin", "==", true);
    query.find().then(res => {
      this.setData({ adminInfo: res });
      wx.stopPullDownRefresh();
      console.log("administrator data has been got");
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