Page({
  data: {
    value: '',
    historylist: [],
    timer: null,
    book: [],
    his_show: true,
    search_show: true
  },

  onChange(e) {//输入时触发,设置延时器防抖
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setData({
        value: e.detail,
      });
    }, 100);
  },

  onSearch(e) {//搜索时触发
    const set = new Set(this.data.historylist)//set集合去重
    if (this.data.value) {
      this.setData({
        his_show: false,
        search_show: true,
        book: ''
      })
      set.add(this.data.value)
      wx.request({
        // url: 'http://localhost:3000/api/book/search',
        url: 'https://www.lingnotes.fun/api/book/search',
        method: 'POST',
        data: {
          book_name: this.data.value
        },
        success: (res) => {
          if (res.data == "暂无数据") {
            this.setData({
              search_show: false
            })
          } else {
            this.setData({
              book: [...res.data]
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入搜索内容！',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      historylist: Array.from(set)
    })
    const list = this.data.historylist
    wx.setStorageSync('history', list)//缓存历史搜索
  },

  search_his(e) {
    this.setData({
      value: e.target.dataset.value
    })
    this.onSearch(this.data.value)
  },

  onClear() {//清空搜索历史
    wx.setStorageSync('history', null)//清空缓存
    this.setData({
      historylist: []
    })
  },

  gotoInfo(e) {
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo?i=' + i
    })
  },
  onLoad(options) {
    let history = wx.getStorageSync('history')//加载历史搜索
    if (history) {
      this.setData({
        historylist: history
      })
    }
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {
    this.setData({
      book: [],
      his_show: true,
      search_show: true
    })
    wx.stopPullDownRefresh()
  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})