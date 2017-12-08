
// ##toptips~~

// js
// toptips_kaiguan: null,
// toptips_text:'',
// cuowu(){
//   this.setData({ toptips_kaiguan: true, toptips_text: '654' })
// }

//wxml
// <my-toptips state= "{{toptips_kaiguan}}" tipsText= "{{toptips_text}}" > </my-toptips>
// <button bindtap= 'cuowu' > aaa </button>


Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    //基础属性-控制菜单显示隐藏
    state: {
      type: Boolean,
      value: false,
      observer(state) {
        console.log('state', state)
        // 监听state状态，如果state状态改成true让动画出现，展示1秒，1秒后让动画收起（收起动画的过程0.3秒）
        if (state) {
          this.setData({ donghua: 'down' })
          var aa = setTimeout(() => { this.setData({ donghua: 'up' }, () => { setTimeout(() => { this.setData({ state: false }) }, 300) }) }, 1000)
        }
      }
    },

    // 接受的菜单数据
    tipsText: {
      type: String,
      value: '组件默认值'
    }

  },

  data: {
    donghua: '',  //动画-up-down
  },

  methods: {
  }

})