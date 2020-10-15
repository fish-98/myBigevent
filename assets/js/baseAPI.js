$.ajaxPrefilter(function (optins) {
    // console.log(optins);
    optins.url = 'http://ajax.frontend.itheima.net' + optins.url


    //接口
    if (optins.url.indexOf('/my/') != -1) {
        optins.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    optins.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空 token
            localStorage.removeItem('token')

            // 强制回到当前页面
            location.href = '/login.html';

        }
    }
})