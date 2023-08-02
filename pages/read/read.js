// pages/book/book.js
Page({
  data: {
    id: 0,
    title: "",
    isOpenChapter: false,//是否打开目录弹框
    isOpenBtn: false,//选择章节弹框
    chapters: [],//目录
    chapter: {},//正文
    currentChapter: 0,//当前目录下标
    isLoading:false,
    scrollTop:1
  },
  //
  getChapters() {
    this.setData({isLoading:true})
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.lingnotes.fun/api/book/content/${this.data.id}`,
      // url: `http://localhost:3000/api/book/content/${this.data.id}`,
      method: 'POST',
      success: (res) => {
        if(res.data=="暂无数据"){
          this.setData({
            currentChapter:-1,
            chapter:{"content":res.data}
          })
        }else{
          this.setData({
            chapters: [...res.data],
            chapter:res.data[this.data.currentChapter]
          })
        }    
      },
      complete:()=>{
        wx.hideLoading()
        this.setData({isloding:false})
      }
    })
  },

  showChapter: function () {  //打开目录弹框
    this.setData({
      isOpenChapter: true
    })
  },

  hideChapter: function () {  //关闭目录弹框
    this.setData({
      isOpenChapter: false
    })
  },

  showBtn: function () {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (this.data.isOpenBtn) {
        this.setData({
          isOpenBtn: false
        });
      } else {
        this.setData({
          isOpenBtn: true
        });
      }
    }, 100);
  },

  preChapter: function () {   //上一章
    let currentIndex = this.data.currentChapter
    currentIndex--
    this.setData({
      currentChapter: currentIndex,
      chapter: this.data.chapters[currentIndex],
      scrollTop:0
    })
  },

  nextChapter: function () {  //下一章
    let currentIndex = this.data.currentChapter
    currentIndex++
    this.setData({
      currentChapter: currentIndex,
      chapter: this.data.chapters[currentIndex],
      scrollTop:0
    })
  },
  
  selectChapter: function (e) {    //选择章节
    let index = e.currentTarget.dataset.index
    if (this.data.currentChapter !== index) {
      this.setData({
        currentChapter: index,
        isOpenChapter: false,
        chapter: this.data.chapters[index],
        scrollTop:0
      })
    }
  },

  onLoad(options) {
    this.setData({
      id: options.i,
      title: options.title
    })
    this.getChapters()
    wx.setNavigationBarTitle({
      title: this.data.title
    });
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