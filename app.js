// app.js
App({
  globalData: {
    openid: '',
    today: '',
    min: '',
  },

  onLaunch: function () {
    this.globalData.today = new Date()
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://www.lingnotes.fun/api/user/userCode',
          // url: 'http://localhost:3000/api/user/userCode',
          method: 'POST',
          data: {
            code: res.code,
          },
          success: (res) => {         
            this.globalData.openid = res.data
            wx.request({
              url: 'https://www.lingnotes.fun/api/user/time',
              // url: 'http://localhost:3000/api/user/time',
              method:'POST',
              data:{
                openid:this.globalData.openid,
                date:new Date().getDate(),
                day:1,                
              },
              success: (res) => {
                // console.log(res)
              }
            })
          },
        })
      },
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    this.globalData.today = new Date()
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/updatetime',
      // url: 'http://localhost:3000/api/user/updatetime',
      method: 'POST',
      data: {
        openid: this.globalData.openid,
        min: this.globalData.min
      }
    })
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})

