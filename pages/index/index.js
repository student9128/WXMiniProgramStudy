//index.js
//获取应用实例
const app = getApp()
var cityName = ""
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasNetworkType: false,
    systemInfo: {},
    weatherInfo: {},
    initValue: '',
  },
  getSystemInfo: function () {
    var x = this
    wx.getSystemInfo({
      success: function (res) {
        console.log("systemINnfo:\t" + res)
        x.setData({
          systemInfo: res
        })
        // x.update()
      },
    })
  },
  getNetworkType: function () {
    var t = this
    wx.getNetworkType({
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.subType || res.networkType,
          icon: 'none'
        })
        t.setData({
          hasNetworkType: true,
          networkType: res.subType || res.networkType
        })
        t.update()
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index'
    }
  },
  getWesRun: function (res) {
    wx.getWeRunData({
      success: function (res) {
        const encryptedData = res.encryptedData
        wx.showToast({
          title: encryptedData,
          icon: 'none'
        })
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  bindKeyInput: function (e) {
    var that = this
    cityName = e.detail.value
    that.setData({
      initValue: e.detail.value
    })
  },
  getWeather: function (res) {
    var that = this
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now?',
      data: {
        location: cityName,
        key: 'e1b3e9e2f292435692ea7ecb571d5701',
        lang: 'cn',
        unit: 'm'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          weatherInfo: res
        })
        wx.showToast({
          title: '请求成功',
          icon: 'none'
        })
        // that.update()
      },
      fail: function (res) {
        wx.showToast({
          title: res.data
        })
      }
    })
  },
  startStudy: function (res) {
    wx.showToast({
      title: '开启学习之旅',
    
    })
    wx.switchTab({
      url: '../study/widget/index',
    })
    // wx.navigateTo({
    //   url: '../study/index',
    //   events:{
        
    //   },
    //   success:function(res){

    //   }
    // })
  }


})