$(function () {
    // 点击登录页面 跳转 注册页面链接
    $('#link_login').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    // 点击注册页面 跳转 登录页面链接
    $('#link_reg').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //通过 layui.from 自定义正则表达式
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码逻辑
        //两次密码比较一致
        repwd: function(value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd != value) {
                return '密码不一致！';
            }
        }
    })
    //注册提交请求
    $('#form-reg').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data : {
                username: $('#form-reg [name="username"]').val(),
                password: $('#form-reg [name="password"]').val()
            }, 
            success : function(res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功 请登录！')
                $('#link_reg').click()
            }
            
        })
    })

    //登录提交请求
    $('#form-login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data:$(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                // layui.layer.msg('注册成功')
                localStorage.setItem('token',res.token);
                location.href = '/index.html'
            }
        })
    })
})