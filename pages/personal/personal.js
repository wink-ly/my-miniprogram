// pages/personal/personal.js
const app = getApp()
Page({
  data: {
    userDay: '',
    today: '',
    min: 0,
    userinfo: {
      nickName: "昵称",
      avatarUrl: "../../images/home/head.png"
    }
  },

  getTime() {
    this.data.today = parseInt((new Date() - new Date(app.globalData.today)) / 1000 / 60)
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/gettime',
      // url: 'http://localhost:3000/api/user/gettime',
      method: 'POST',
      success: (res) => {
        let d = res.data[0].day
        this.setData({
          min: res.data[0].min + this.data.today
        })
        app.globalData.min = this.data.min
        if (res.data[0].date != new Date().getDate()) {
          d++
          wx.request({
            url: 'https://www.lingnotes.fun/api/user/updatetime',
            // url: 'http://localhost:3000/api/user/updatetime',
            method: 'POST',
            data: {
              openid: app.globalData.openid,
              date: new Date().getDate(),
              day: d,
            }
          })
          this.setData({
            userDay: d,
          })
        } else {
          this.setData({
            userDay: d,
          })
        }
      }
    })
  },

  onChooseAvatar(e) {
    var ava = e.detail.avatarUrl
    wx.setStorageSync('ava', ava)
    this.setData({
      avatarUrl: ava
    })
    this.onLoad()
  },

  getValue(e) {
    var nick = e.detail.value
    wx.setStorageSync('nick', nick)
    this.setData({
      nickName: nick
    })
  },

  gotoFeedback(){
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },
  gotoAbout(){
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onLoad() {
    let ava = wx.getStorageSync('ava')
    let nick = wx.getStorageSync('nick')
    if (nick && ava) {
      this.setData({
        userinfo: {
          nickName: nick,
          avatarUrl: ava
        }
      })
    }
  },

  onReady() {

  },

  onShow() {
    this.getTime()
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