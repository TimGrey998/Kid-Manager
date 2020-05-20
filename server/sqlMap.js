// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(name, password) values (?, ?)',
    select_name: 'SELECT * from user where name = ?', //查询 username
    select_password: 'SELECT * from user where password = ?', //查询 password
    select_point: 'SELECT point from user where name = ?', //查询 point
    set_point: 'UPDATE user SET point = ? WHERE name = ?' //更改point
  }
}

module.exports = sqlMap;
