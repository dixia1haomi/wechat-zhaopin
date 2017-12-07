
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
        state && this.setData({ donghua: 'up', maskState: 'show' })   // 监听state状态，为ture时，开启up动画，显示蒙层
      }
    },

    // 接受的菜单数据
    list: {
      type: [Object, Array],
      value: ['qqq', 'www']
    },

    // 是否显示title
    title: {
      type: Boolean,
      value: false
    },

    // 是否显示取消按钮
    cancel: {
      type: Boolean,
      value: false
    },
  },

  data: {
    donghua: '',  //动画-up-down
    maskState: '' //蒙层-控制mask基础组件的状态
  },

  methods: {
    hid(e) {
      // 延迟消失
      // this.setData({ donghua: 'down' }, () => {
      //   setTimeout(() => {
      //     this.setData({ maskState: 'hid' }, () => { this.setData({ state: false }) })
      //   }, 300)
      // })
      this.setData({ state: false })   //瞬间消失
      let obj = {}

      if (e) {
        obj.index = e.currentTarget.dataset.index
        obj.item = e.currentTarget.dataset.item
        obj.state = false
      } else {
        obj.index = false
        obj.item = false
        obj.state = false
      }

      this.triggerEvent('itemEvent', obj) // 携带一个自定义参数出去让调用页面知道state关闭了
    },

    // 接收菜单item数据，并传给页面，需要页面bind:itemEvent="page事件"接收
    item(e) {
      // console.log('itemEvent', e.currentTarget.dataset)
      // this.triggerEvent('itemEvent', e.currentTarget.dataset)
      // this.setData({ state: false })  // 隐藏菜单
      this.hid(e)
    },

    // 取消按钮
    cancel() {
      this.hid()  // 隐藏菜单
    }
  }

})