//index.js
//import Bmob
import Bmob from '../../utils/Bmob-1.7.0.min.js';

//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: null,
    userOpenId: null,
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo)
    {
      this.setData({
        userInfo: app.globalData.userInfo,
        userOpenId: app.globalData.userOpenId,
      });
    }
  },// end onLoad
});
