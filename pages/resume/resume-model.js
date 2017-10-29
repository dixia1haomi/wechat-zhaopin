
import { Base } from '../utils/base.js'

class Resume extends Base {

  constructor() {
    super()
  }

  //查询简历列表
  get_Resume_List(area, callBack) {
    var params = {
      url: 'resume/' + area,
      sCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  //查询简历详细信息
  get_Resume_Detail(id, callBack) {
    var params = {
      url: 'resume/detail/' + id,
      data: id,
      sCallback: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }

  //创建岗位

  //更新岗位

  //删除岗位


}



// 年龄
const date = new Date()
let age_data = []
for (let i = date.getFullYear(); i >= 1962; i--) { age_data.push(i) }

Resume.age_data = age_data,

// 期望岗位
Resume.expectation_position_data = [
  '销售', '客服', '普工/技工', '人事/行政/后勤', '餐饮', '旅游', '酒店', '超市/百货/零售', '美容/美发', '保健/按摩', '运动健身',
  '服装/纺织/食品', '生产管理/研发', '建筑', '物业管理', '房产中介', '家政保洁/安保', '司机/交通服务', '物流/仓储', '贸易/采购',
  '汽车制造/服务', '淘宝职位', '美术/设计/创意', '化工', '市场/媒介/公关', '广告/会展/咨询', '娱乐/休闲', '教育/培训',
  '财务/审计/统计', '法律', '翻译', '编辑/出版/印刷', '计算机/互联网/通信', '电子/电器', '机械/仪器仪表', '金融/银行/证劵/投资',
  '保险', '医院/医疗/护理', '环保/能源', '制药/生物工程', '质控/安防', '农/林/牧/渔业', '其他职位'
]

// 期望薪资
Resume.expectation_pay_data = [
  '面议', '1000元以下', '1000-2000元', '2000-3000元', '3000-5000元', '5000-8000元', '8000-12000元', '12000-20000元', '20000元以上'
]

// 性别
Resume.sex_data = ['男', '女']

// 经验
Resume.work_exp_data = ['无经验', '应届生', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上']

// 学历
Resume.education_data = ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士', 'MBA/EMBA']

// 求职区域
Resume.work_place_data = ['曲靖', '麒麟', '沾益']

// 工作性质
Resume.work_nature_data = ['全职', '兼职', '全职/兼职']

// 到岗时间
Resume.report_time_data = ['随时到岗', '一周以内', '两周以内', '一月以内', '无法确定']

// 目前状态
Resume.current_state_data = ['已离职', '暂未离职']

export { Resume }






