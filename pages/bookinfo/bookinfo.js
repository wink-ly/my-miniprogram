const app = getApp()
Page({
  data: {
    id: 0,
    save: false,
    booklist: [],
    add: '加入书架',
    delete: '已在书架中',
    openid: null
  },
  getbook() {//获取书籍信息                                                
    wx.request({
      url: `https://www.lingnotes.fun/api/book/bookinfo/${this.data.id}`,
    //   url: `http://localhost:3000/api/book/bookinfo/${this.data.id}`,
      method: 'POST',
      success: (res) => {
        this.setData({
          booklist: res.data[0],
        })
        wx.setNavigationBarTitle({
          title: this.data.booklist.book_name
        })
      },
    })
  },
  if_Add() {//页面显示时判断是否在书架中
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/bookIf',
      // url: 'http://localhost:3000/api/user/bookIf',
      method: 'POST',
      data: {
        openid: this.openid,
        bookid:this.data.id
      },
      success:res=>{
        if(res.data.length !== 0){
          this.setData({
            save:true
          })
        }
      }
    })
  },
  addBook() {//加入书架
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/bookadd',
      // url: 'http://localhost:3000/api/user/bookadd',
      method: 'POST',
      data: {
        openid: this.openid,
        bookid:this.data.id
      },
      success:res=>{
        // console.log(res)
        this.if_Add()
      }
    })
  },
  deletebook() {//移出书架
    wx.request({
      url: 'https://www.lingnotes.fun/api/user/bookdelete',
      // url: 'http://localhost:3000/api/user/bookdelete',
      method: 'POST',
      data: {
        openid: this.openid,
        bookid:this.data.id
      },
      success:res=>{
        if(res.data.affectedRows !== 0){
          this.setData({
            save:false
          })
        }
      }
    })
    this.if_Add()
  },
  readBook() {//跳转阅读书籍页
    wx.navigateTo({
      url: '/pages/read/read?i=' + this.data.id + '&title=' + this.data.booklist.book_name
    })
  },
  onLoad(options) {
    this.openid = app.globalData.openid
    this.setData({
      id: options.i,
    })
    this.getbook()
  },
  
  onReady() {

  },

  onShow() {
    this.if_Add()
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