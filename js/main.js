
var onIndex=0;//当前所在屏幕，从0开始。
var mt=0;//container的margin-top
var onScroll=false;//是否正在滚动
var infoOut=0;//info的弹出层状态
var infoTimer=null;//clearTimer
var p4Timer=null;
var p4Animat=true;
touch.config({
    tap: true,                   //tap类事件开关, 默认为true
    doubleTap: true,        //doubleTap事件开关， 默认为true
    hold: true,                 //hold事件开关, 默认为true
    holdTime: 650,           //hold时间长度
    swipe: true,                //swipe事件开关
    swipeTime: 300,             //触发swipe事件的最大时长
    swipeMinDistance: 18,   //swipe移动最小距离
    swipeFactor: 5,             //加速因子, 值越大变化速率越快
    drag: true,                 //drag事件开关
    pinch: true,                //pinch类事件开关
});
pageInit();
function pageInit() {
    // pageScroll();
    // swipe();
    $(".info-tg").on("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (infoOut === 2) {
            infoOut = 1;
        } else {
            infoOut = 2;
        }
        infoToggle();
    });
    touch.on(".info-tg","tap",function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (infoOut === 2) {
            infoOut = 1;
        } else {
            infoOut = 2;
        }
        infoToggle();
    })
    // 防止click引发的touchend冒泡
    $(".info-tg").on("touchend", function (event) {
        event.stopPropagation();
    });
    // 缩放页面时按照当前可视高度自动调整mt
    // $(window).resize(function () {
    //     setMtAndOn();
    // });
    // $(".fr").find(".item").each(function (index) {
    //     if (index !== 5) {
    //         $(this).click(function (event) {
    //             event.stopPropagation();
    //             onIndex = index;
    //             whenIndexChange();
    //         })
    //     }
    // })

}
//控制顶侧导航
// function whenIndexChange() {
//     //onIndex改变时的逻辑
//     setMtAndOn();
//     //info控制 在第五屏定时弹出 不在隐藏 在第一屏显示个按钮
//     clearTimeout(infoTimer);
//     switch (onIndex){
//         case 0:
//             infoOut=1;
//             break;
//         case 4:
//             infoTimer=setTimeout(function () {
//                 infoOut=2;
//                 infoToggle();
//             },4000);
//             break;
//         default:
//             infoOut=0;
//             break;
//     }
//     infoToggle();
//
//     //第四屏（工作经历）先演示一遍动画再绑定事件
//     if(onIndex===3){
//         if(!p4Animat){
//             return;
//         }
//         clearTimeout(p4Timer);
//         p4Animat=false;
//         $(".history").removeClass("cur");
//         $(".history").eq(0).addClass("cur");
//         p4Timer=setTimeout(function () {
//             $(".history").removeClass("cur");
//             $(".history").eq(1).addClass("cur");
//         },1000);
//         p4Timer=setTimeout(function () {
//             $(".history").removeClass("cur");
//             $(".history").eq(2).addClass("cur");
//         },2000);
//         p4Timer=setTimeout(function () {
//             $(".history").on("mouseover",function () {
//                 if($(this).attr("class").indexOf("cur")<0){
//                     $(".history").removeClass("cur");
//                     $(this).addClass("cur");
//                 }
//             });
//         },3000);
//     }else {
//         p4Animat=true;
//         $(".history").off("mouseover");
//         $(".history").removeClass("cur").eq(-1).addClass("cur");
//     }
//
// }
//通过onIndex的值来设置container的margin-top的值，并给当前的附上class-on
// function setMtAndOn() {
//     //给当前所在屏加上class-on,适用于column和nav-right
//     function currentOn(className) {
//         $(className).removeClass("on");
//         $(className).eq(onIndex).addClass("on");
//     }
//     var clientH=$(window).height();
//     mt=-clientH*onIndex;
//     $(".container").css({
//         "transform":"translateY("+mt+"px)"
//     });
//     setTimeout(function () {
//         currentOn(".column");
//         currentOn(".item");
//     },400);
// }
//弹出左侧个人信息
function infoToggle() {
    var infoW = $(".info").width();
    switch (infoOut) {
        case 2:
            $(".info").show().css({
                "left": 0
            });
            $(".info-arrow").addClass("inverse");
            break;
        case 1:
            $(".info").css({
                "left": -infoW
            });
            $(".info-arrow").removeClass("inverse");
            break;
        default:
            $(".info").css({
                "left": "-100%"
            });
            $(".info-arrow").removeClass("inverse");
            break;
    }
}

//如果没有在滚动，则开始滚动，并将onScroll设置为true
//设置一个倒计时，防止频繁触发滚动事件，滚动完成后将onScroll设置为false
// function preventCombo() {
//     if (!onScroll) {
//         onScroll = true;
//         setTimeout(function () {
//             onScroll = false;
//         }, 500);
//         return false;
//     } else {
//         return true;
//     }
// }

//给document绑定鼠标滚轮事件、键盘事件、鼠标移动事件
// function pageScroll() {
//     $(document).on("mousewheel keydown DOMMouseScroll", function (event) {
//         if (preventCombo()) {
//             return;
//         }
//         event = event || window.event;
//         var wheel = event.wheelDelta || -event.detail;
//         //滚轮向下滚动event.wheelDelta为负，firefox相反
//         if (wheel < 0 || event.keyCode == 40) {
//             if (onIndex <= 3) {
//                 onIndex++;
//             }
//         } else if (wheel > 0 || event.keyCode == 38) {
//             if(onIndex>=1){
//                 onIndex--;
//             }
//         }
//         whenIndexChange();
//     });
// }

//移动端滑动事件
function swipe() {
    var startX=0;
    var startY=0;
    var endX=0;
    var endY=0;
    $(document).on({
        'touchmove':function (event) {
            event.preventDefault();
        },
        'touchstart':function (event) {
            startX=event.touches[0].clientX;
            startY=event.touches[0].clientY;
        },
        'touchend':function (event) {
            if(preventCombo()){
                return;
            }
            endX=event.changeTouches[0].clientX;
            endY=event.changeTouches[0].clientY;
            var dX=endX-startX;
            var dY=endY-startY;
            switch (slideDirect(dX,dY)){
                case -2:
                    if(onIndex<4){
                        onIndex++;
                    }
                    break;
                case 2:
                    if(onIndex>0){
                        onIndex--;
                    }
                    break;
            }
            whenIndexChange();
        }
    })
}

//判断滑动方向，注意移动是与滑动相反的方向，左滑应该右移
// function slideDirect(dX,dY) {
//     var abs=Math.abs(dX)-Math.abs(dY);
//     if(Math.abs(dX)<10 && Math.abs(dY)<10){
//         //没有滑动
//         return 0;
//     }else if(abs>0){
//         if(dX>0){
//             //右滑
//             return 1;
//         }else {
//             //左滑
//             return -1;
//         }
//     }else {
//         if(dY>0){
//             //下滑
//             return 2;
//         }else {
//             //上滑
//             return -2;
//         }
//     }
//
// }

