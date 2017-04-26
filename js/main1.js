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
function whenIndexChange() {
    //onIndex改变时的逻辑

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
            switch ()
        }
    })
}
//判断滑动方向，注意移动是与滑动相反的方向，左滑应该右移
function slideDirect(dX,dY) {
    var abs=Math.abs(dX)-Math.abs(dY);
    
}