const app = getApp()
Page({
  data: {
    swiperList: [],
    swiperIdx: 0,
    navheight: 0,
    serchheight: 0,
    jnheight: 0,
    recommend: [],
    newbook: []
  },

  onLoad(options) {
    this.getswiperList()
    this.getUserLocation()
    this.getNavHeight()
  },

  handleChange: function (e) {
    this.setData({
      swiperIdx: e.detail.current,
    })
  },

  getswiperList() {//获取轮播图
    wx.request({
      url: 'https://www.lingnotes.fun/json/swiper.json',
      method: 'GET',
      success: (res) => {
        this.setData({
          swiperList: res.data
        })
      }
    })
  },

  getRecommend() {//获取推荐书单
    wx.request({
      url: 'https://www.lingnotes.fun/api/book/getrec',
      method: 'POST',
      success: (res) => {
        this.setData({
          recommend: [res.data[0], res.data[1], res.data[2], res.data[3]]
        })
        wx.setStorageSync('精选推荐', res.data)
      }
    })
  },

  getNewBook() {//获取最新上架书单
    wx.request({
      url: 'https://www.lingnotes.fun/api/book/getnew',
      method: 'POST',
      success: (res) => {
        this.setData({
          newbook: [res.data[0], res.data[1], res.data[2], res.data[3]]
        })
        wx.setStorageSync('最新上架', res.data)
      }
    })
  },

  gotoBooklist() {
    wx.navigateTo({
      url: '/pages/booklist/booklist'
    })
  },
  gotoFound() {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  gotoShare() {
    wx.navigateTo({
      url: '/pages/share/share'
    })
  },
  gotoList(e) {
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/list/list?i=' + i
    })
  },

  gotoInfo(e) {
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo?i=' + i
    })
  },

  getUserLocation: function () {//获取定位信息显示到城市
    let weidu = ''
    let jingdu = ''
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        weidu = res.latitude
        jingdu = res.longitude
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=LRJBZ-KAB6F-EJHJU-N4S6Z-4FCET-TSFLK&location=' + weidu + ',' + jingdu,
          method: "GET",
          success: res => {
            wx.setStorageSync('city', res.data.result.address_component.city)
            this.setData({
              city: wx.getStorageSync('city')
            })
          }
        })
      },
    })
  },

  getNavHeight() {
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight; // 状态栏高度
        let menuButtonRect = wx.getMenuButtonBoundingClientRect() // 胶囊的位置坐标
        // 导航栏高度=(胶囊距顶距离-状态栏高度)*2+胶囊高度+状态栏高度
        let navigationBarHeight = (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height + statusBarHeight
        this.setData({
          navheight: navigationBarHeight,
          jnheight: menuButtonRect.height,
          serchheight: menuButtonRect.top
        })
      }
    });
  },

  onReady() {

  },

  onShow() {
    this.getRecommend()
    this.getNewBook()
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