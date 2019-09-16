// 侧边栏
var m = document.querySelectorAll(".move");

for (var i = 0; i < m.length; i++) {
    m[i].onmouseenter = function () {
        var bar = this.children[1];
        var right = 47;
        var time = setInterval(function () {
            right--;
            if (right < 36) {
                clearInterval(time)
            } else {
                bar.style.right = right + 'px';
            }
        }, 20)
    }
    m[i].onmouseleave = function () {
        this.children[1].style.right = 46 + 'px';
    }
}

// 返回顶部
var returnTop = document.getElementsByClassName("return");
returnTop[0].onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// 推荐商品楼层内容显示
var show = document.querySelectorAll(".show");

function showing() {
    for (var i = 1; i < show.length; i++) {
        show[i].onmouseenter = function () {
            show[0].children[0].style.display = 'none';
        }
        show[i].onmouseleave = function () {
            show[0].children[0].style.display = 'block';
        }
    }
}

showing();
// 楼层不同内容显示
var oneFloor = document.querySelectorAll(".one-floor2");
var floorLists = document.querySelectorAll(".floor-lists");
// function showFloor(x, y) {
//     for (var i = 0; i < x.length; i++) {
//         // console.log(j);
//         (function (i) {
//             for (var j = 0; j < x[i].children.length; j++) {
//                 (function (j) {
//                 x[i].children[j].onmouseenter = function () {
//                     for (var k = 0; k < y[i].children.length; k++) {
//                         y[i].children[k].style.display = 'none';
//                     }
//                     y[i].children[j].style.display = 'block';
//                 }
//             })(j);
//             }
//         })(i);
//         // oneFloor[i].children[0].style.difunction () {splay = 'none';
//         // hide[j].style.display = 'block';
//     }
// }

function showFloor(x, y) {
    for (var i = 0; i < x.length; i++) {
        // console.log(j);
        for (var j = 0; j < x[i].children.length; j++) {
            (function (i, j) {
                x[i].children[j].onmouseenter = function () {
                    for (var k = 0; k < y[i].children.length; k++) {
                        y[i].children[k].style.display = 'none';
                        x[i].children[k].classList.remove("active");
                    }
                    this.classList.add("active");
                    y[i].children[j].style.display = 'block';
                }
            })(i, j);
        }
    }
}

showFloor(oneFloor, floorLists);

// 侧边栏购物车与联系方式显示

var barSlideALL = document.querySelectorAll(".bar-slide");
var buy = document.querySelectorAll(".buyCar");
var s;
var ready = true;
for (var i = 0; i < buy.length; i++) {
    (function (i) {
        buy[i].onclick = function () {
            slide(barSlideALL[i]);
        }
    })(i);
}

//弹出
function slideout(x) {
    // var right='';
    // if(barSlide.currentStyle){
    //     right=barSlide.currentStyle.right;
    // }else{
    //     right=getComputedStyle(barSlide,null)['right'];
    // }
    right = -214;
    time = setInterval(function () {
        right = right + 12;
        if (right > 36) {
            clearInterval(time);
        } else {
            x.style.right = right + 'px';
        }
    }, 10)
    console.log("弹出");
}
// 收回
function slidein(x) {
    right = 36;
    time = setInterval(function () {
        right = right - 12;
        if (right < -216) {
            clearInterval(time);
        } else {
            x.style.right = right + 'px';
        }
    }, 10)
    console.log("收回");
}

function slide(x) {
    if (ready) {
        slideout(x);
        s = x;
        ready = false;
    } else if (x == s) {
        slidein(x);
        ready = true;
        s = null;
    } else {
        x.style.right = 36 + 'px';
        s.style.right = -214 + 'px';
        s = x;
    }
}


// 轮播
window.onload = function () {
    var lunBoImg = document.querySelector(".lunbo-img");
    var btnRight = document.querySelector(".lunbo-btn.right");
    var btnLeft = document.querySelector(".lunbo-btn.left");
    var circle = document.querySelector(".circle-box");
    var lunBo = document.querySelector(".lunbo");

    var w = lunBoImg.children[0].offsetWidth;
    var l = lunBoImg.children.length;
    lunBoImg.style.width = w * l + 'px';
    var count = 1;
    var p = 0;
    var left = -w;

// 获取轮播图盒子left
    function leftSpace() {
        var left = '';
        if (lunBoImg.currentStyle) {
            left = lunBoImg.currentStyle.left;
        } else {
            left = getComputedStyle(lunBoImg, null)['left'];
        }

        return parseInt(left);
    }

    function playAuto() {
        timer = setInterval(function () {
            play(1);
        }, 2000)
    }

    playAuto();
// 鼠标置于轮播图上时停止播放
    lunBo.onmouseenter = function () {
        clearInterval(timer)
    }
    lunBo.onmouseleave = function () {
        playAuto();
    }

// aim:运动方向 正为左;
    function play(aim) {
        if (aim > 0) {
            if (count == l - 1) {
                count = 0;
                left = 0;
            }
            p = count;
        } else {
            if (count == 0) {
                count = l - 1;
                left = -count * w;
            }
            if (count == 1) {
                p = l - 2;
            } else {
                p = count - 2;
            }
        }
        var stop = -count * w - aim * w;
        var a = aim * 20;
        time = setInterval(function () {
            left -= a;
            lunBoImg.style.left = left + 'px';
            if (left == stop) {
                clearInterval(time);
                count += aim;
            }
        }, 2)
        clearActive(circle);
        circle.children[p].classList.add("active");
    }

    // 左右按钮
    btnRight.onclick = function () {
        play(1);
    }
    btnLeft.onclick = function () {
        play(-1);
    }

    // 移除x的子集的active,
    function clearActive(x) {
        for (var i = 0; i < x.children.length; i++) {
            x.children[i].classList.remove("active");
        }
    }

// 为圆点添加click事件
    function click(x) {
        for (var i = 0; i < x.children.length; i++) {
            (function (i) {
                x.children[i].onclick = function () {
                    var a = p - i;
                    if (a < 0) {
                        count = i;
                        play(1);
                    } else if (a > 0) {
                        if (i == l - 2) {
                            count = 1;
                        } else {
                            count = i + 2;
                        }
                        play(-1);
                    }
                }
            })(i)
        }
    }

    click(circle);


    // function playLeft(i) {
    //     var left = leftSpace();
    //     time1 = setInterval(function () {
    //         left -= 20;
    //         if (-left / w == i + 1) {
    //             clearInterval(time1)
    //         }
    //         if (-left / w >= 4) {
    //             left = 0;
    //         }
    //         lunBoImg.style.left = left + 'px';
    //     }, 1)
    // }

    // function playRight(i) {
    //     var left = leftSpace();
    //     time1 = setInterval(function () {
    //         left += 20;
    //         lunBoImg.style.left = left + 'px'
    //         if (left / w >= 0) {
    //             left = -4 * w;
    //         }
    //         if (-left / w == i + 1) {
    //             clearInterval(time1)
    //         }
    //     }, 1)
    // }

    // 根据远近选择轮播图方向

    // function click(x) {
    //     for (var i = 0; i < x.children.length; i++) {
    //         (function (i) {
    //             x.children[i].onclick = function () {
    //                 var left = leftSpace();
    //                 var a = -left / w - i - 1;
    //                 if (a < 0 && a >= -l / 2 || a > l / 2) {
    //                     // time1 = setInterval(function () {
    //                     //     left -= 20;
    //                     //     lunBoImg.style.left = left + 'px';
    //                     //     if (-left / w == i + 1) {
    //                     //         clearInterval(time1)
    //                     //     }
    //                     //     if (-left / w >= 4) {
    //                     //         left = 0;
    //                     //     }
    //                     // }, 1)
    //                     playLeft(i);
    //                 } else if (a != 0) {
    //                     playRight(i);
    //                     // time1 = setInterval(function () {
    //                     //     left += 20;
    //                     //     if (left / w >= 0) {
    //                     //         left =-4*w;
    //                     //     }
    //                     //     lunBoImg.style.left = left + 'px';
    //                     //     if (-left / w == i + 1) {
    //                     //         clearInterval(time1)
    //                     //     }
    //                     // }, 1)
    //                 }
    //                 clearActive(x);
    //                 x.children[i].classList.add("active");
    //             }
    //         })(i)
    //     }
    // }

// 监听页面是否最小化或被切换
    if (document.addEventListener) {
        document.addEventListener('webkitvisibilitychange', function () {
            // console.log(document.webkitVisibilityState);
            // console.log(document.hidden);
            var isHidden = document.hidden;
            if (isHidden) {
                clearInterval(timer)
            } else {
                playAuto();
            }
        });
    }

}




