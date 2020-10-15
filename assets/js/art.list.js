$(function () {

    //美化时间器
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date);
        var y = dt.getFullYear()
        var m = parZaoer(dt.getMonth() + 1)
        var s = parZaoer(dt.getDate());

        var hh = parZaoer(dt.getHours())
        var mm = parZaoer(dt.getMinutes())
        var ss = parZaoer(dt.getSeconds())
        return y + '-' + m + '-' + s + '-' + hh + ':' + mm + ':' + ss

    }

    function parZaoer(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                //调用分页渲染的方法
                redaer(res.total)
            }
        })
    }

    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name="cate_id"]').html(htmlStr)
                //通知layui 重新渲染页面
                layui.form.render()
            }
        })
    }


    //需要先绑定表单的 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name="cate_id"]').val()
        var state = $('[name="state"]').val()
        q.cate_id = cate_id
        q.state = state

        initTable()

    })

    // 定义一个渲染分页的方法
    function redaer(total) {
        // console.log(total);
        //调用laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8],

            //调用 jump 的函数 方法 获得里面的值
            jump: function (obj, first) {
                // console.log(obj.curr);
                // console.log(first);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }


    //删除的方法
    $('tbody').on('click', '.btnsDelete', function () {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 获取删除按钮的个数
        var len = $('.btnsDelete').length
        layui.layer.confirm('确定要删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败')
                    }
                    layui.layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layui.layer.close(index);
        });
    })
})