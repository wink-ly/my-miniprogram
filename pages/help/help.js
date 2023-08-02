// pages/help/help.js
Page({
  data: {
    question: [],
    show: false,
    choose: -1
  },

  showTap(e) {
    const index = e.currentTarget.dataset.index
    if (this.data.choose == index) {
      this.setData({
        choose: -1
      })
    } else {
      this.setData({
        choose: index
      });
    }
  },

  getAnaswer() {
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/answer',
      method: 'POST',
      success: (res) => {
        this.setData({
          question: [...res.data]
        })
      }
    })
  },

  onLoad(options) {
    this.getAnaswer()
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