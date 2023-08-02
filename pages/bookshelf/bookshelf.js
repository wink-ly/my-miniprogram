const app = getApp()
Page({
  data: {
    book:[],
    openid:null
  },

  getbook(){
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/bookshelf',
      // url: 'http://localhost:3000/api/user/bookshelf',
      method:'POST',
      data:{
        openid: this.data.openid
      },
      success:(res)=>{
        this.setData({
          book:[...res.data],
        })
      },
    })
  },

  gotoInfo(e){//传参到bookinfo页面，对应具体哪本书
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo?i=' + i
    })
  },
  
  onLoad(options) {
    this.data.openid = app.globalData.openid
  },

  onReady() {

  },

  onShow() {//监听页面加载
    this.getbook()
  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {
    
  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})