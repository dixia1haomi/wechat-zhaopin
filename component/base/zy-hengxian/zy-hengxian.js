
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
      value: '左右横线'
    },

    // 上下间距
    margin: {
      type: Number,
      value: 20
    },
  },

  data: {},

  methods: {}

})