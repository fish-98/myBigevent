$(function () {
    //调用获取用户信息的函数
    getUserInfo();


    //点击按钮退出页面
    $('#btnOut').on('click', function () {
        layui.layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
});
















// 封装函数用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('登录成功')
            rederAuthor(res.data)
        }, 
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空 token
        //         localStorage.removeItem('token')

        //         // 强制回到当前页面
        //         location.href = '/login.html';

        //     }
        // }
    })
}


//封装一个 渲染头像的的函数
function rederAuthor(user) {
    // 获取用户信息
    var name = user.nickname || user.username
    //渲染欢迎头像
    $('#wolcome').html('欢迎&nbsp;&nbsp;' + name)
    // 
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }

}