
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
      state:{
        type:String,
        value:'hid'
      }
  },

  data: {
    // state:'hid'
  },

  methods: {
    // 这里是一个自定义方法
    // show(){
    //   this.setData({ state:'show'})
    // },
    hidtap(){
      this.setData({ state:'hid'})
    }
  }

})