// pages/list/list.js
Page({
  data: {
    value: "",
    list: []
  },

  gotoInfo(e) {
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo?i=' + i
    })
  },

  onLoad(options) {
    this.setData({
      value: options.i,
      list:[...wx.getStorageSync(options.i)]
    })
    wx.setNavigationBarTitle({
      title: this.data.value,
    })
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