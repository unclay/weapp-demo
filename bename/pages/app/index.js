Page({
  data: {
    surname: '',
    sex: 0,
    inname: '',
    innamePosition: 0
  },
  onLoad () {
  },
  change (e) {
    if (e.detail.value.match(/\d+/g)) {
      this.data[e.target.dataset.name] = e.detail.value - 0
    } else {
      this.data[e.target.dataset.name] = e.detail.value
    }
    this.setData(this.data)
  },
  alert (content) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false
    })
    return this
  },
  btnSubmit () {
    const errorTips = {
      'surname': '请输入宝宝姓氏！',
      'sex': '请选择宝宝性别！'
    }
    for (let i in this.data) {
      if (!this.data[i] && errorTips[i]) {
        return this.alert(errorTips[i])
      }
    }
    wx.request({
      url: 'https://bbs.bozhong.com/restful/www/surname.json',
      data: {
        surname: this.data.surname,
        sex: this.data.sex,
        def: this.data.inname,
        defpl: this.data.innamePosition || 2
      },
      success (data) {
        console.log(data)
        if (data.data.error_code === 0) {
          wx.setStorageSync('benameResult', data.data.data)
          wx.navigateTo({
            url: '../result/result',
            success (data) {
              console.log(data)
            },
            fail (data) {
              console.log(data)
            }
          })
        } else {
          this.alert(errorTips[i])
        }
      },
      fail (data) {
        this.alert(JSON.stringify(data))
      }
    })
    console.log(this.data)
  }
})