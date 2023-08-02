// pages/booklist/booklist.js
Page({
  data: {
    hari: []
  },

  getHari() {
    wx.request({
      url: 'https://www.lingnotes.fun/api/book/search',
      method: 'POST',
      data: {
        book_name: '哈利波特'
      },
      success: (res) => {
        this.setData({
          hari: [res.data[0],res.data[1],res.data[2]],
        })
        wx.setStorageSync('哈利波特系列', res.data)
      }
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

  onLoad(options) {
    this.getHari()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})