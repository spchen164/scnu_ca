//index.js
//import Bmob
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({
  data: {
    image: [
      {
        title: "slider1",
        url: "../../image/slider1.jpg",
      },
      {
        title: "slider2",
        url: "../../image/slider2.jpg",
      },
      {
        title: "slider3",
        url: "../../image/slider3.jpg",
      },
      {
        title: "slider4",
        url: "../../image/slider4.jpg",
      },
      {
        title: "slider5",
        url: "../../image/slider5.jpg",
      },
    ],
    activity: [],
    officialQRcode: "../../image/officialQRcode.jpg",
  },

  update: function() {
    const active = Bmob.Query("activity");
    active.order("-createdAt");
    active.find().then(res => {
      this.setData({ activity: res });
      wx.stopPullDownRefresh();
    }).catch(err => {
      console.log(err);
    });
  },

  showActivity: function(e) {
    wx.showModal({
      title: e.target.dataset.title,
      content: e.target.dataset.content,
      showCancel: false,
    });
  },

  //事件处理函数
  onLoad: function () {
    this.update();
  },// end onLoad

  //下拉刷新事件
  onPullDownRefresh: function(){
    this.update();
    console.log("PullDownRefresh");
  }
});
