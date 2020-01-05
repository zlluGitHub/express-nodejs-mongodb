
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: {
        type: String,
        default: ""
    }, //用户账号
    userpwd: { type: String }, //密码
    userage: { type: Number }, //年龄
    logindate: { type: Date } //最近登录时间
});

// 输出(导出)
module.exports = mongoose.model('studqws', UserSchema);
// 定义一个模型，可以根据这个模型调用其API方法。
// 这个模型定义的是数据库的goods集合数据，所以这个model取名good是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"goods"来查找数据集合。
// module.exports = mongoose.model('good',produtSchema,'goods'); 也可以后面注明链接的是数据库的goods集合



