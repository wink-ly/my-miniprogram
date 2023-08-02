Page({
  data: {
    cateList:[
      {name:"经典文学"},{name:"科幻畅想"},{name:"心灵成长"},{name:"亲子共读"},{name:"科学技术"}
    ],
    bookList:[],
    active:0,
    // page:1,
    // pageSize:5,
    // total:0,
    isloding:false,
  },
  
  onLoad(options) {
    this.getbookList()
    
  },

  getbookList(){//左侧一级列表名，二级图书信息
    this.setData({isloding:true})
    wx.showLoading({
      title: '数据加载中...',
    })
    const c = this.data.cateList[this.data.active].name
    wx.request({
      url: `https://www.lingnotes.fun/api/book/category/${c}`,
      method:'POST',
      success:(res)=>{
        this.setData({
          bookList:[...res.data],
          // total:res.data.length
        })
      },
      complete:()=>{
        wx.hideLoading()
        this.setData({isloding:false})
      }
    })
  },

  activeChange(e){//点击更改左侧列表active值重新渲染样式
    const i = e.currentTarget.dataset.index;
    this.setData({
      active:this.data.active = i,
    })
    wx.setNavigationBarTitle({
      title:this.data.cateList[i].name
    })
    this.getbookList()
  },

  gotoInfo(e){
    const i = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/bookinfo/bookinfo?i=' + i
    })
  },
    // getShopList(){//右侧图书信息
  //   this.setData({isloding:true})
  //   wx.request({
  //     url: 'https://www.escook.cn/categories/1/shops',
  //     url: 'https://www.lingnotes.fun/json/category.json',
  //     method:'GET',
  //     data:{
  //       _page:this.data.page,
  //       _limit:this.data.pageSize
  //     },
  //     success:(res)=>{
  //       this.setData({
  //         shopList:[...this.data.shopList,...res.data],
  //         total:res.header['X-Total-Count']-0
  //         total:res.data.length
  //       })
  //     }
  //   })
  // },
  onReachBottom() {
    //判断数据是否加载完毕
    // if(this.data.page * this.data.pageSize >= this.data.total){
      return wx.showToast({
        title: '已经到底啦！',
        icon:'none'
      })
    // }
    // else{
    //   //触底后加载新的页面
    //   this.setData({
    //     page:this.data.page + 1
    //   })
    // }
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

  onShareAppMessage() {

  }
})