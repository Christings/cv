/**
 * Created by Administrator on 2017/4/21.
 */

$(function(){

    var infoOut=null;

    // $(window).resize();
    $("#block-nav").css("z-index", 1);

    // 导航条固定顶部
    $("#block-nav").navFixed();

    // //平滑滚动导航
    $('nav a, #logo').bind('click',function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top-52}, 600);
        event.preventDefault();
    });

    $('.info-tg, .info-tg2').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (infoOut === 2) {
            infoOut = 1
        } else {
            infoOut = 2
        }
        infoToggle();
    });
    // 防止click引发的touchend冒泡
    $('.info-tg, .item').on('touchend', function (event) {
        event.stopPropagation();
    });
});

function infoToggle() {
    var infoW = $('.info').width();
    switch (infoOut) {
        case 2:
            $('.info').show().css({
                'left': 0
            });
            $('.info-arrow').addClass('inverse');
            break;
        case 1:
            $('.info').css({
                'left': -infoW
            });
            $('.info-arrow').removeClass('inverse');
            break;
        default:
            $('.info').css({
                'left': '-100%'
            });
            $('.info-arrow').removeClass('inverse');
            break;
    }
}

// $(window).resize(function(){
//
//     //首页满屏
//     $("#block-firstPage").css("height", $(window).height());
//     //首页文字效果
//     $('.blockTitle').stop().fadeIn("normal").animate({
//         "top" : ($(window).height() - $('.blockTitle').outerHeight())/2
//     },500);
//
//     $("#block-wantMore").css("height", $(window).height()-52 + "px");
//     $('#block-wantMore>p').css("top", ($("#block-wantMore").outerHeight(true) - $('#block-wantMore>p').outerHeight())/2 + "px");
// });
