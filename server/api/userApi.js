var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 用户注册接口
router.post('/addUser', (req, res) => {
  let sql_name = $sql.user.select_name;
  let sql_add = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql_name, params.username, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      conn.query(sql_add, [params.username, params.password], function (err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          jsonWrite(res, result);
        }
      })
    } else {
      res.send('-1');
    }
  })
});

//用户登录接口
router.post('/login', (req, res) => {
  let sql_name = $sql.user.select_name;
  let sql_password = $sql.user.select_password;
  var params = req.body;
  console.log(params);
  conn.query(sql_name, [params.username], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      res.send('-1');
    } else {
      conn.query(sql_password, [params.password], function (err, result) {
        if (err) {
          console.log(err);
        }
        if (result[0] === undefined) {
          res.send('0');
        } else {
          jsonWrite(res, result);
        }
      })
    }
  })
})

//查询积分接口
router.post('/point', (req, res) => {
  let sql_point = $sql.user.select_point;
  var params = req.body;
  console.log(params);
  conn.query(sql_point, params.username, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
});

module.exports = router;
