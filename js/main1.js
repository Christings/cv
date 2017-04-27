var infoOut;
var onIndex;
pageInit();
function pageInit() {
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
    $(".info-tg").on("touchend", function (event) {
        event.stopPropagation();
    });
    $(".fr").find(".item").each(function (index) {
        if (index !== 5) {
            $(this).click(function (event) {
                event.stopPropagation();
                onIndex = index;
            })
        }
    })

}
//控制顶侧导航
var infoTimer;
function whenIndexChange() {
    //onIndex改变时的逻辑
    setMtAndOn();
    //info控制 在第五屏定时弹出 不在隐藏 在第一屏显示个按钮
    clearTimeout(infoTimer);
    switch (onIndex){
        case 0:
            infoOut=1;
            break;
        case 4:
            infoTimer=setTimeout(function () {
                infoOut=2;
                infoToggle();
            },4000);
            break;
        default:
            infoOut0;
            break;
    }
    infoToggle();

}
//通过onIndex的值来设置container的margin-top的值，并给当前的附上class-on
function setMtAndOn() {
    //给当前所在屏加上class-on,适用于column和nav-right
    function currentOn(className) {
        $(className).removeClass("on");
        $(className).eq(onIndex).addClass("on");
    }
    var clientH=$(window).height();
    mt=-clientH*onIndex;
    $(".container").css({
        "transform":"translateY("+mt+"px)"
    });
    setTimeout(function () {
        currentOn(".column");
        currentOn(".item");
    },400);
}
//弹出左侧个人信息
function infoToggle() {
    var infoW = $(".info").width();
    switch (infoOut) {
        case 1:
            $(".info").css({
                "left": -infoW
            });
            $(".info-arrow").removeClass("inverse");
            break;
        case 2:
            $(".info").show().css({
                "left": 0
            });
            $(".info-arrow").addClass("inverse");
            break;
        default:
            $(".info-arrow").css({
                "left": "-100%"
            });
            $(".info-arrow").removeClass("inverse");
            break;
    }
}

//如果没有在滚动，则开始滚动，并将onScroll设置为true
//设置一个倒计时，防止频繁触发滚动事件，滚动完成后将onScroll设置为false
var onScroll = false;
function preventCombo() {
    if (!onScroll) {
        onScroll = true;
        setTimeout(function () {
            onScroll = false;
        }, 500);
        return false;
    } else {
        return true;
    }
}

//给document绑定鼠标滚轮事件、键盘事件、鼠标移动事件
function pageScroll() {
    $(document).on("mousewheel keydown DOMMouseScroll", function (event) {
        if (preventCombo()) {
            return;
        }
        event = event || window.event;
        var wheel = event.wheelDelta || -event.detail;
        //滚轮向下滚动event.wheelDelta为负，firefox相反
        if (wheel < 0 || event.keyCode == 40) {
            if (onIndex <= 3) {
                onIndex++;
            }
        } else if (wheel > 0 || event.keyCode == 38) {
            if(onIndex>=1){
                onIndex--;
            }
        }
        whenIndexChange();
    });
}

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
function slideDirect(dX,dY) {
    var abs=Math.abs(dX)-Math.abs(dY);
    if(Math.abs(dX)<10 && Math.abs(dY)<10){
        //没有滑动
        return 0;
    }else if(abs>0){
        if(dX>0){
            //右滑
            return 1;
        }else {
            //左滑
            return -1;
        }
    }else {
        if(dY>0){
            //下滑
            return 2;
        }else {
            //上滑
            return -2;
        }
    }

}