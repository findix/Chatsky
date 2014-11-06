// Generated by CoffeeScript 1.7.1
(function() {
  var express, mongoose, needLogin, router, user;

  express = require("express");

  mongoose = require('mongoose');

  router = express.Router();

  user = mongoose.model('User');

  needLogin = false;

  router.get("/", function(req, res) {
    if (!needLogin) {
      req.session.username = 'Chatsky';
    }
    if (req.session.username != null) {
      return res.render("index");
    } else {
      return res.render("login", {
        status: ''
      });
    }
  });

  router.post('/login', function(req, res) {
    var _password, _username;
    _username = req.body.email;
    _password = req.body.password;
    return user.find({
      username: _username,
      password: _password
    }, function(err, data) {
      if (data.length === 0) {
        return res.end('<div class="option_result">用户名或密码错误</div>');
      } else {
        req.session.username = _username;
        return res.end("SUCCESS");
      }
    });
  });

  router.post('/register', function(req, res) {
    var _password, _username;
    _username = req.body.email;
    _password = req.body.password;
    return user.find({
      username: _username
    }, function(err, data) {
      var userEntity;
      if (data.length === 0) {
        userEntity = new user({
          username: _username,
          password: _password
        });
        return userEntity.save(function(err) {
          if (err != null) {
            return console.log(err);
          } else {
            req.session.username = _username;
            return res.end("SUCCESS");
          }
        });
      } else {
        return res.end("" + _username + "已被注册");
      }
    });
  });

  router.use('/logout', function(req, res) {
    req.session.username = null;
    return res.redirect('/');
  });

  router.get('/changepasswd', function(req, res) {
    if (req.session.username == null) {
      return res.redirect('/');
    } else {
      return res.render('changePasswd', {
        username: req.session.username,
        status: ''
      });
    }
  });

  router.post('/Changepasswd', function(req, res) {
    var oldPassword, password, username;
    if (req.session.username == null) {
      return res.redirect('/');
    } else {
      username = req.session.username;
      oldPassword = req.body.oldPassword;
      password = req.body.password;
      console.log(username, oldPassword, password);
      return user.findOne({
        username: username,
        password: oldPassword
      }, function(err, data) {
        var passwordRegex;
        if (data == null) {
          return res.render('changePasswd', {
            username: username,
            status: '<div class="alert alert-danger">您输入的密码有错误</div>'
          });
        } else {
          passwordRegex = new RegExp(/\w{6,16}/);
          if (!passwordRegex.test(password)) {
            res.render('changePasswd', {
              username: username,
              status: '<div class="alert alert-danger">密码不规范，应为6~16位字母和数字！</div>'
            });
          } else {
            data.password = password;
          }
          data.save();
          return res.render('changePasswd', {
            username: username,
            status: '<div class="alert alert-success">密码修改成功！</div>'
          });
        }
      });
    }
  });

  router.post('/user', function(req, res) {
    if (req.session.username != null) {
      return res.end(req.session.username);
    } else {
      return res.end('ERROR');
    }
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=route.map
