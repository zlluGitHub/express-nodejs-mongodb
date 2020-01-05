let mongoose = require('mongoose'); //引入mongoose
//mongodb://user:password@127.23.23.77:27017/SimpleDesign
const DATA_BASE_URL ="mongodb://@wry520.cn:27017/SimpleDesign"; //数据库地址
mongoose.connect(DATA_BASE_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Connection Error:' + err);
  } else {
    console.log('Connection success!');
  };
});