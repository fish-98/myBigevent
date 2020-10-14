$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '名称必须是1~6位数之间'
            }
        }
    })

    initUserIfo()
    //初始化用户信息
    function initUserIfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
               if (res.status != 0) {
                   return layui.layer.msg('获取信息失败')
               } 
            //    console.log(res);
               // 快速位表单赋值
               layui.form.val('userInfoName', res.data)
            }
        })
    }

    //重置数据
    $('#btnuser').on('click',function(e){
        e.preventDefault();
        initUserIfo();
    })


    // 监听 form表单
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
              if (res.status !== 0) {
                return layui.layer.msg('更新用户信息失败！')
              }
              layui.layer.msg('更新用户信息成功！')
              // 调用父页面中的方法，重新渲染用户的头像和用户的信息
              window.parent.getUserInfo()
            }
          })
    })
})