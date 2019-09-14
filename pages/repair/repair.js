// pages/repair/repair.js
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
    repairing: app.globalData.repairing,
    repaired: app.globalData.repaired,
    repairModalId: "ZkDBm-8m09RLcqI4peH4x_ehYRd7pmkHTT-xDhsysT8",
    techOpenid: [],
  },

  submit: function(e) {
    let form = e.detail.value;
    if (form.name == "")
    {
      wx.showToast({ title: "姓名不能为空", icon: "none" });
      return;
    }
    if (form.grade == "")
    {
      wx.showToast({ title: "入学年份不能为空", icon: "none" });
      return;
    }
    if (form.address == "") {
      wx.showToast({ title: "地点不能为空", icon: "none" });
      return;
    }
    if (form.brand == "") {
      wx.showToast({ title: "电脑品牌不能为空", icon: "none" });
      return;
    }
    if (form.problem == "") {
      wx.showToast({ title: "故障描述不能为空", icon: "none" });
      return;
    }
    if (form.phone == "" && form.wechat == "" && form.qq == "") {
      wx.showToast({ title: "联系方式至少选择其中一种", icon: "none" });
      return;
    }
    let modalData = {
      touser: "",
      template_id: this.data.repairModalId,
      page: "index",
      form_id: e.detail.formId,
      data: {
        keyword1: {
          value: new Date().toDateString(),
        },
        keyword2: {
          value: e.detail.value.name,
        },
        keyword3: {
          value: e.detail.value.problem,
        },
      },
      emphasis_keyword: "",
    };

    //保存到数据库中
    const query = Bmob.Query("repair");
    query.set("information", form);
    query.set("status", this.data.repairing);
    query.set("userOpenid", this.data.userOpenid);
    query.save().then(res => {
      console.log(res);
      wx.showToast({ title: "已提交" });
      for(let openid of this.data.techOpenid)
      {
        modalData.touser = openid;
        Bmob.sendWeAppMessage(modalData).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
      wx.navigateBack();//跳转回“我”的页面
    }).catch(err => {
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let temp = [];
    const query = Bmob.Query("user");
    query.equalTo("isTech", "==", true);
    query.find().then(res => {
      for(let item of res)
        temp.push(item.userOpenid);
      this.setData({ techOpenid: temp });
    }).catch(err => {
      console.log(err);
    });
    this.setData({userOpenid: app.globalData.userOpenid});//不知道为什么不能在data赋值
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