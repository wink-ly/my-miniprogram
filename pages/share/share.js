// pages/share/share.js
import WxValidate from "../../utils/WxValidate";
Page({
  data: {
    book_name: "",
    author: "",
    publish: "",
    category: ['经典文学', '亲子共读', '科幻畅想', '心灵成长', '科学技术'],
    tel: "",
    yan: "",
    yan_test: "",
    index: -1,
    show: false,
  },

  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },

  optionTap(e) {
    let Index = e.currentTarget.dataset.index;
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  yan(e) {
    var z = new RegExp(/1[3-9]\d{9}$/)
    let tel = e.detail.value.tel;
    if (!tel) {
      wx.showToast({
        title: '请输入手机号!',
        icon: 'none'
      })
    } else if (!z.test(tel)) {
      wx.showToast({
        title: '请输入正确的手机号!',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://www.lingnotes.fun/api/user/telnub',
        // url: 'http://localhost:3000/api/user/telnub',
        method: 'POST',
        data: {
          tel
        },
        success: (res) => {
          this.setData({
            yan_test: res.data
          })
        }
      })
    }
  },

  submit(e) {
    //获取要验证的内容
    let params = e.detail.value;
    let yan = e.detail.value.yan
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (yan == this.data.yan_test) {
      wx.request({
        url: 'https://www.lingnotes.fun/api/book/submit',
        // url: 'http://localhost:3000/api/book/submit',
        method: 'POST',
        data: {
          params
        },
        success: (res) => {
          if (res.data === "success") {
            this.setData({
              book_name: "",
              author: "",
              publish: "",
              category: "",
              tel: "",
              yan: "",
              index: -1
            })
            wx.showToast({
              title: '提交成功',
              icon: 'none'
            })
          }
          if (res.data === "err")
            wx.showToast({
              title: '请勿重复提交',
              icon: 'none'
            })
        }
      })
    }else{
      wx.showToast({
        title: '验证码输入错误',
        icon: 'none'
      })
    }
  },

  initValidate() {
    //验证规则
    let rules = {
      //需要验证的字段
      book_name: {
        required: true
      },
      author: {
        required: true
      },
      publish: {
        required: true
      },
      tel: {
        required: true,
        tel: true
      },
      yan: {
        required: true,
      }
    }
    //自定义验证信息
    let message = {
      book_name: {
        required: '请输入书名'
      },
      author: {
        required: '请输入作者'
      },
      publish: {
        required: '请输入出版社'
      },
      tel: {
        required: "请输入手机号",
        tel: "请输入正确的手机号"
      },
      yan: {
        required: "请输入验证码",
      },
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  //显示错误提交信息
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  onLoad(options) {
    this.initValidate();
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

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})