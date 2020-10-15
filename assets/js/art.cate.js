$(function () {

    initArtCate();

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 添加类名添加点击事件
    var indexAdd = null;
    $('#btnArtCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#disWenAdd').html()

        })
    })


    // 添加事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('增添失败！')
                }
                initArtCate();
                layui.layer.msg('增添成功')
                layui.layer.close(indexAdd);
            }
        })
    })

    var indexCdd = null;
    //点击编辑按钮展示修改文章分类的弹出层
    $('tbody').on('click', '.btn-edit', function () {
        indexCdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#disWenEdit').html()
        })
        //在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                layui.form.val('form-edit', res.data)
            }
        })
    })


    //更新文章分类的数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新失败！')
                }
                layui.layer.msg('更新成功')
                layui.layer.close(indexCdd)
                initArtCate()

            }
        })
    })


    // 删除分类列表
    $('tbody').on('click', '.btnDelete', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id')
        // console.log(id);
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除分类失败')
                    }
                    layui.layer.msg('删除分类成功')
                    layui.layer.close(index)
                    initArtCate()

                }
            })
        })
    })

})