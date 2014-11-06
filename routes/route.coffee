express = require "express"
mongoose = require 'mongoose'
router = express.Router()

user = mongoose.model('User')

# setting whether need login
needLogin = false

# GET home page.
router.get "/", (req, res) ->
    if !needLogin
        req.session.username = 'Chatsky'
    if req.session.username?
        res.render "index"
    else res.render "login",
        status: ''


# GET login listing.
router.post '/login', (req, res) ->
    _username = req.body.email
    _password = req.body.password
    user.find
        username: _username
        password: _password
    , (err, data) ->
        if data.length is 0
            res.end '<div class="option_result">用户名或密码错误</div>'
        else
            req.session.username = _username
            res.end "SUCCESS"

router.post '/register', (req, res) ->
    _username = req.body.email
    _password = req.body.password
    user.find
        username: _username
    , (err, data) ->
        if data.length is 0
            userEntity = new user
                username: _username
                password: _password
            userEntity.save((err)->
                if err?
                    console.log err
                else
                    req.session.username = _username
                    res.end "SUCCESS"
            )
        else
            res.end "#{_username}已被注册"


router.use '/logout', (req, res) ->
    req.session.username = null
    res.redirect '/'

router.get '/changepasswd', (req, res)->
    unless req.session.username?
        res.redirect '/'
    else res.render 'changePasswd',
        username: req.session.username
        status: ''

router.post '/Changepasswd', (req, res)->
    unless req.session.username?
        res.redirect '/'
    else
        username = req.session.username
        oldPassword = req.body.oldPassword
        password = req.body.password
        console.log username, oldPassword, password
        user.findOne
            username: username
            password: oldPassword
        , (err, data)->
            if not data?
            then res.render 'changePasswd',
                username: username
                status: '<div class="alert alert-danger">您输入的密码有错误</div>'
            else
                passwordRegex = new RegExp(/\w{6,16}/)
                if not passwordRegex.test(password)
                then res.render 'changePasswd',
                    username: username
                    status: '<div class="alert alert-danger">密码不规范，应为6~16位字母和数字！</div>'
                else data.password = password
                data.save()
                res.render 'changePasswd',
                    username: username
                    status: '<div class="alert alert-success">密码修改成功！</div>'

router.post '/user', (req, res) ->
    if req.session.username?
        res.end req.session.username
    else
        res.end 'ERROR'

module.exports = router