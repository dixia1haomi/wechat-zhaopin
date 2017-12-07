
// ##toptips~~

//wxml
// <my-cell title="Str" text="Str" jiantou="Bool" fujia="Str,Bool" hover="Bool"></my-cell>

Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    // 双行的附加描述开关-可以直接传值直接显示-不传不显示
    fujia: {
      type: [Boolean, String],
      value: ''
    },

    // 头
    title: {
      type: String,
      value: '单行列表'
    },

    // 箭头左边的详细描述
    text: {
      type: [String,Number],
      value: '详细描述'
    },

    // 是否有小箭头
    jiantou: {
      type: Boolean,
      value: true
    },

    // 是否有点击态-默认有
    hover: {
      type: Boolean,
      value: true
    },

    // 设置间距
    margin: {
      type: Number,
      value: 6
    },
  },

  data: {},

  methods: {}

})