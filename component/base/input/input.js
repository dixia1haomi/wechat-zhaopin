
// ##toptips~~

//wxml


Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    //文字
    text: {
      type: String,
      value: '默认占位'
    },

    // input类型-默认text
    //## text	文本输入键盘
    //## number	数字输入键盘
    //## idcard	身份证输入键盘
    //## digit	带小数点的数字键盘
    input_type: {
      type: String,
      value: ''
    },

    // 默认占位
    zhanwei: {
      type: String,
      value: '默认占位'
    },

    // 上下间距px
    margin: {
      type: Number,
      value: 6
    },
  },

  data: {},

  methods: {
    bindinput(e) {
      console.log('bindinput', e.detail.value)
      this.triggerEvent('inputEvent', e.detail)
    }
  }

})