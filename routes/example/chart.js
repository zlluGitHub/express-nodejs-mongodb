const express = require('express');
const router = express.Router();
const tools = require("../../public/javascripts/tools");
const chart = require("../../schema/template/chart");

//获取数据
router.get('/', (req, res, next) => {
    let query = req.query;
    let pageNo = query.pageNo ? query.pageNo : 1;
    let pageSize = query.pageSize ? query.pageSize : 10;
    let queryObj = {}
    if (query.bid) {
        queryObj._id = query.bid;
    };
    if (query.type) {
        queryObj.type = query.type;
    };
    if (query.author) {
        queryObj.author = { $regex: new RegExp(query.author, 'gi') };
    };
    if (query.publish) {
        queryObj.publish = query.publish;
    };
    if (query.title) {
        queryObj.title = { $regex: new RegExp(query.title, 'gi') };
    }

    chart.find(queryObj, (err, data) => {
        if (err) {
            console.log('错误信息：', err);
            res.json({ result: false, code: 500 });
            return;
        } else {
            //数据分页处理
            data = tools.setPage(data, pageNo, pageSize);
            data.list = data.list.map(item => {
                let each = {
                    title: item.title,
                    type: item.type,
                    look: item.look,
                    author: item.author,
                    publish: item.publish,
                    chartClass: item.chartClass,
                    imgSrc: item.imgSrc,
                    url: item.url,
                    date: item.date.slice(0, 10),
                    bid: item._id
                };
                //若存在id 则返回全部数据
                if (query.bid) {
                    each.option = item.option;
                    each.theme = item.theme;
                    each.data = item.data;
                    each.explain = item.explain;
                }
                return each;
            })
            //判断返回数据格式
            let warpData = { result: true, code: 200 };
            if (!query.bid) {
                warpData.list = data.list;
                warpData.total = data.total;
            } else {
                warpData.content = data.list[0];
            }
            res.json(warpData);
        };
    });
});

//添加
router.post('/', (req, res, next) => {
    let body = req.body;
    chart.create(body, (err, data) => {
        if (err) {
            console.log('错误信息：', err);
            res.json({ result: false, code: 500 });
            return;
        } else {
            res.json({ result: true, code: 200, data });
        };
    });
});

//删除
router.delete('/', (req, res, next) => {
    let a = req.query.id;
    chart.deleteOne({ type: "pie" }, (err, data) => {
        if (err) {
            console.log('错误信息：', err);
            res.json({ result: false, code: 500 });
            return;
        } else {
            res.json({ result: true, code: 200, data });
        };
    });
});

//更新
router.put('/', (req, res, next) => {
    let body = req.body;
    console.log('zcsdcvsd');

    chart.update({ _id: body.bid }, { $set: body.data }, (err, data) => {
        if (err) {
            res.json({ result: false, code: 500 });
            console.log('错误信息：', err);
            return;
        } else {
            res.json({ result: true, code: 200, data });
        };
    });
});

module.exports = router;