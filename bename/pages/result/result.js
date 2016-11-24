Page({
  data: {
    benameResult: []
  },
  onLoad () {
    let benameResult = wx.getStorageSync('benameResult')
    this.setData({
      benameResult: benameResult[0]
    })
  },
  render () {
    wx.navigateBack({
      delta: 1
    })
  }
})