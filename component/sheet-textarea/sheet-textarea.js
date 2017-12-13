
// ##下拉菜单~~
// ##依赖基础mask组件
// ##阻止页面滑动
// 组件隐藏时携带一个state出去让页面控制page是否能滑动，当打开蒙层时调用的页面不能滑动
// class="{{rootSheetState && 'page-noscroll'}}"    .page-noscroll {position: fixed;width: 100 %;height: 100 %;}
// e.detail.state == false && this.setData({ rootSheetState: false })


// js
// sheetState: '',
// sheetDownItem:'',
// sheetDownIndex:'',

// sheetTap() {
//   this.setData({ sheetState: true })
//   console.log('sheetTap')
// },
// itemE(e) {
//   console.log('index-itemE', e.detail)
//   this.setData({ sheetDownItem: e.detail.item, sheetDownIndex: e.detail.index })
// }

// wxml
// <my-sheetdown class="" state= "{{sheetState}}" list= "{{mylist}}" bind: itemEvent = "itemE" cancel title>
//   <view catchtap="sheetTap" class='view' > {{sheetDownItem || '请选择' }}{ { sheetDownIndex } } </view>
// < /my-sheetdown>

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
        // console.log('state', state)
        state && this.setData({ donghua: 'textareadonghuashow' })   // 监听state状态，为ture时，开启up动画
      }
    },

    // title横线描述
    hengxianText: {
      type: String,
      value: '岗位描述'
    },

    // 是否显示ft_tips提示
    ft_tips: {
      type: Boolean,
      value: true
    },

    confirmValue: {
      type: String,
      value: ''
    }


  },

  data: {
    donghua: '',  //动画-up-down
    value: '',     //bindinput事件的value
    confirmValue: '' // 用户点击完成后保存的value
  },

  methods: {

    // 取消按钮
    quxiao() {
      this.hid()  // 隐藏菜单
    },

    // 完成
    wancheng() {
      // this.triggerEvent('textareaEvent', this.data.value)
      this.setData({ confirmValue: this.data.value })  //保存确定后的值，用来显示到textarea的value里，确保用户改变了value却点了取消下次在进入显示错误
      this.hid(this.data.value)
      console.log('wancheng')
    },

    textareaEvent(e) {
      console.log('textareaEvent', e.detail)
      this.setData({ value: e.detail.value, count: e.detail.cursor })
    },

    hid(value) {
      // this.setData({ donghua: 'textareadonghuahid' }, () => {
      //   setTimeout(() => {
      //     this.setData({ state: false })
      //   }, 300)
      // })
      this.setData({ state: false })
      this.triggerEvent('textareaEvent', value)
    },


  }

})