// pages/feedback/feedback.js
Page({
  data: {
    textarea: ""
  },

  bindFormSubmit: function (e) {
    var input = e.detail.value.textarea;
    if (input == "" || input == undefined) {
      wx.showToast({
        title: '请勿提交空信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (input.length <= 5){
      wx.showToast({
        title: '请提交不少于五个字的反馈信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      wx.request({
        url: 'https://www.lingnotes.fun/api/user/feedback',
        method: 'POST',
        data: {
          feedback: input
        },
        success: (res) => {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 1000
          })
        }
      })
      this.setData({
        textarea: ""
      })
    }
  },

  onLoad(options) {

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