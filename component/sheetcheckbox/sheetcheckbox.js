
// ##下拉菜单复选框~~
// ##依赖基础mask组件

// wxml
// <my-sheetcheckbox state= "{{checkboxState}}" list= "{{checkboxlist}}" bind: itemEvent = "checkboxitemE" cancel title>
//   <view catchtap="checkboxTap" class='view' > {{checkboxValueStr || '请选择' }}</view>  
// < /my-sheetcheckbox>   

// js
// checkboxTap() { this.setData({ checkboxState: true })},
// checkboxitemE(e) { this.setData({ checkboxValue: e.detail, checkboxValueStr: e.detail.toString() })},

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
        if (state) {
          this.__edit_checked(this.data.confirmCheckValue)     // 获取上次用户已点击确定后的数据，恢复已选中的样式
          this.setData({ donghua: 'up', maskState: 'show' })   // 监听state状态，为ture时，开启up动画，显示蒙层
        }
      }
    },

    // 接受的菜单数据
    list: {
      type: [Object, Array],
      value: [
        { name: '中国', value: 0 },   ////checked
        { name: '美国', value: 1 },
        { name: '日本', value: 2 },
        { name: '中国1', value: 0 },
        { name: '美国1', value: 1 },
        { name: '日本1', value: 2 },
        { name: '中国2', value: 0 },
        { name: '美国2', value: 1 },
        { name: '日本2', value: 2 },
        { name: '中国3', value: 0 },
        { name: '美国3', value: 1 },
        { name: '日本3', value: 2 },
        { name: '中国4', value: 0 },
        { name: '美国4', value: 1 },
        { name: '日本4', value: 2 },
        { name: '中国5', value: 0 },
        { name: '美国5', value: 1 },
        { name: '日本5', value: 2 },
      ]
    },

    // 是否显示取消按钮
    cancel: {
      type: Boolean,
      value: false
    },
  },

  data: {
    donghua: '',  //动画-up-down
    maskState: '', //蒙层-控制mask基础组件的状态
    checkValue: [],  //保存checkbox选择事件的值
    confirmCheckValue: [] //保存confirm后选择事件的值
  },

  methods: {
    hid() {
      // 延迟消失
      // this.setData({ donghua: 'down' }, () => { setTimeout(() => { this.setData({ maskState: 'hid', state: false }) }, 300) })
      this.setData({ state: false })   //瞬间消失
      this.triggerEvent('itemEvent', this.data.checkValue)  // 把用户选择的值传出去给调用的页面
    },

    //checkbox事件
    checkE(e) {
      this.setData({ checkValue: e.detail.value })  // 保存value，用户点确定的时候用
      this.__edit_checked(e.detail.value)           // 组件私有方法，处理list数组，设置list中checked属性-用来标识选中还是未选中
    },

    // 组件私有方法，处理list数组，设置list中checked属性-用来标识选中还是未选中
    __edit_checked(value) {
      let list = this.data.list
      for (let i in list) { if (value.indexOf(list[i].name) !== -1) { list[i].checked = true } else { list[i].checked = false } }
      this.setData({ list: list })
    },

    // 确定按钮
    confirm() {
      this.setData({ confirmCheckValue: this.data.checkValue }) // 保存confirm后选择事件的值,用来再次打开组件时恢复confirm后的样式
      this.hid()     // 隐藏菜单
    },

    // 取消按钮
    cancel() {
      this.hid()  // 隐藏菜单
    }
  }

})