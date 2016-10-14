$(function () {
    var index = 0;
    var arr0 = [];
    var arr1 = [];
    var arr2 = [];
    var index1 = 0
    var date = new Date()
    var days = {
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
        0: "Sun"
    }
    var mous = {
        0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "June", 6: "July", 7: "Aug", 8: "Sept",
        9: "Oct", 10: "Nov", 11: "Dec"
    }
    var day = date.getDay()
    var time = date.getDate()
    var mouth = date.getMonth()
    var year = date.getFullYear()
    var left = null;
    var t;
    //判断localstorage中是否有数组字符串，无就加，有就写在界面中
    if (localStorage.love) {
        arr0 = JSON.parse(localStorage.love)
        arr1 = JSON.parse(localStorage.live)
        arr2 = JSON.parse(localStorage.secret)
        render()
    } else {
        localStorage.love = JSON.stringify(arr0)
        localStorage.live = JSON.stringify(arr1)
        localStorage.secret = JSON.stringify(arr2)
    }
    $(".lists").eq(0).addClass("col")
    //目录栏切换
    $(".header-bottom").on("touchend", ".lists", function () {
        index = $(this).index()
        $(".lists").removeClass("col")
        $(this).addClass("col")
        $(".love-content-box").removeClass("show")
        $(".love-content-box").eq(index).addClass("show")

    })
    //添加按钮
    $(".add").on("touchend", function () {
        if (index == 0) {
            addthing(arr0)
            localStorage.love = JSON.stringify(arr0)
            render()
        }
        if (index == 1) {
            addthing(arr1)
            localStorage.live = JSON.stringify(arr1)
            render()
        }
        if (index == 2) {
            addthing(arr2)
            localStorage.secret = JSON.stringify(arr2)
            render()
        }
    })
    //添加时间中添加的内容
    function addthing(arr) {
        arr.push({
            content: "请添加内容",
            state: 0,
            data: (mouth + 1) + "月" + time
        })
    }

    //渲染函数，将localstroge的东西渲染在界面中的函数
    function render() {
        $(".love-content-box").empty()
        buile(arr0, 0)
        buile(arr1, 1)
        buile(arr2, 2)
    }

    //创建标签
    function buile(arr, num) {
        if (arr) {
            $.each(arr, function (i, v) {
                $("<div class='love-content-inner'><div class='love-content'>" + v.content + "</div><div class='time'>" + v.data + "</div> <div class='delete'>删除</div><div class='fuyuan'>复原</div></div>").appendTo($("  .love-content-box").eq(num))
                if (v.state == 1) {
                    $(".love-content-box").eq(num).find(".love-content").eq(i).addClass("del")
                }

            })
        }
    }

    $(".love-content-box").on("touchend", ".love-content-inner", function () {
        $(".write-box .write-content").val($(this).find(".love-content").val())
        clearTimeout(t)
    })
    function hide() {
        $(".write-box").addClass("lefts")
        $(".love-content-box").removeClass("show")
        $(".add").addClass("hide")
    }

    //列表的拖动
    $(".love-content-box").on("touchstart", ".love-content-inner", function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
        index1 = $(this).index()
        t = setTimeout(hide, 500)
        $(".write-content").val($(this).find(".love-content").text())
        if ($(this).find(".love-content").hasClass("move")) {
            $(this).find(".love-content").removeClass("move")
            $(this).find(".time").removeClass("move")
            $(this).find(".fuyuan").delay(50).queue(function () {
                $(this).removeClass("show").dequeue()
            })
            $(this).find(".delete").delay(50).queue(function () {
                $(this).removeClass("show").dequeue()
            })
        }
    })
    //划去已经完成的任务
    $(".love-content-box").on("touchmove", ".love-content-inner", function (e) {
        var n = e.originalEvent.changedTouches[0].pageX;
        if ((n > left) && (n - left) >= 40) {
            var s = $(".love-content-box").index($(this).parent())
            if (index == 0) {
                arr0[$(this).index()].state = 1
                $(this).find(".love-content").addClass("del")
                localStorage.love = JSON.stringify(arr0)

            }
            if (index == 1) {
                arr1[$(this).index()].state = 1
                $(this).find(".love-content").addClass("del")
                localStorage.live = JSON.stringify(arr1)
            }
            if (index == 2) {
                arr2[$(this).index()].state = 1
                $(this).find(".love-content").addClass("del")
                localStorage.secret = JSON.stringify(arr2)
            }
        }

        if ((n < left) && (left - n) >= 40) {
            $(this).find(".love-content").addClass("move")
            $(this).find(".time").addClass("move")
            $(this).find(".fuyuan").delay(100).queue(function () {
                $(this).addClass("show").dequeue()
            })
            $(this).find(".delete").delay(100).queue(function () {
                $(this).addClass("show").dequeue()
            })
        }
    })
//复原按钮的实现
    $(".love-content-box").on("touchend", ".fuyuan", function () {
        var pre = $(this).closest(".love-content-box")
        if (index == 0) {
            arr0[$(".fuyuan").index($(this))].state = 0
            pre.find(".love-content").eq(pre.find(".fuyuan").index($(this))).removeClass("del")
            localStorage.love = JSON.stringify(arr0)
        }
        if (index == 1) {
            arr1[$(".fuyuan").index($(this))].state = 0
            pre.find(".love-content").eq(pre.find(".fuyuan").index($(this))).removeClass("del")
            localStorage.live = JSON.stringify(arr1)
        }
        if (index == 2) {
            arr2[$(".fuyuan").index($(this))].state = 0
            pre.find(".love-content").eq(pre.find(".fuyuan").index($(this))).removeClass("del")
            localStorage.secret = JSON.stringify(arr2)
        }
        pre.find(".love-content").removeClass("move")
        pre.find(".time").removeClass("move")
        pre.find(".fuyuan").delay(100).queue(function () {
            $(this).removeClass("show").dequeue()
        })
        pre.find(".delete").delay(100).queue(function () {
            $(this).removeClass("show").dequeue()
        })
    })
//删除按钮的实现
    $(".love-content-box").on("touchend", ".delete", function () {
        var pre = $(this).closest(".love-content-box")
        if (index == 0) {
            arr0.splice(pre.find(".delete").index($(this)), 1)
            localStorage.love = JSON.stringify(arr0)
            render()
        }
        if (index == 1) {
            arr1.splice(pre.find(".delete").index($(this)), 1)
            localStorage.live = JSON.stringify(arr1)
            render()
        }
        if (index == 2) {
            arr2.splice(pre.find(".delete").index($(this)), 1)
            localStorage.secret = JSON.stringify(arr2)
            render()
        }
    })
    //编辑
    $(".write-content").on("focus", function () {
        $(".write-box").find(".close").removeClass("icon-left").addClass("icon-2dagou")
    })
    $(".write-content").on("blur", function () {
        $(".write-box").find(".close").addClass("icon-left").removeClass("icon-2dagou")
    })
    $(".close").on("touchend", function () {
        if ($(".write-box").find(".close").hasClass("icon-left")) {
            $(".love-content-box").eq(index).addClass("show")
            $(".write-box").removeClass("lefts")
            $(".add").removeClass("hide")
        } else {
            $(".write-box").find(".close").removeClass("icon-dagou").addClass("icon-left")
        }
        if (index == 0) {
            $(".love-content-box").eq(0).find(".love-content-inner").eq(index1).find(".love-content").text($(".write-content").val())
            arr0[index1].content = $(".write-content").val();
            localStorage.love = JSON.stringify(arr0)
        }
        if (index == 1) {
            $(".love-content-box").eq(1).find(".love-content-inner").eq(index1).find(".love-content").text($(".write-content").val())
            arr1[index1].content = $(".write-content").val();
            localStorage.live = JSON.stringify(arr1)
        }
        if (index == 2) {
            $(".love-content-box").eq(2).find(".love-content-inner").eq(index1).find(".love-content").text($(".write-content").val())
            arr2[index1].content = $(".write-content").val();
            localStorage.secret = JSON.stringify(arr2)
        }
    })
    $(".nowtime").text(days[day] + "  " + mous[mouth] + "  " + year)
    // $(".list-icon").on("touchstart", function () {
    //     // $(".del").closest(".love-content-inner").remove()
    //     $.map(arr0, function (v, i) {
    //         if (v.state == 1) {
    //             arr0.splice(i, 1)
    //         }
    //
    //     })
    //     localStorage.love = JSON.stringify(arr0);
    //     $.each(arr1, function (i, v) {
    //         if (v.state == 1) {
    //             arr1.splice(i, 1)
    //         }
    //     })
    //     localStorage.live = JSON.stringify(arr1);
    //     $.each(arr2, function (i, v) {
    //         if (v.state == 1) {
    //             arr2.splice(i, 1)
    //         }
    //     })
    //     localStorage.secret = JSON.stringify(arr2);
    // })

})