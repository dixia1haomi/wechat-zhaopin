class Validata {

  constructor() {

  }


  //参数是空
  isEmpty(param) {
    if (param == '' || param == null || param == undefined) return true;
    return false;
  }

  //必须是整数
  isNum(param) {
    if (typeof param === 'number' && param % 1 === 0) return true
    return false
  }

  //电话号码


}




export { Validata }