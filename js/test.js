var infoOut;
pageInit();
function pageInit() {
    $(".info-tg").on("click",function (event) {
        event.stopPropagation();
        event.preventDefault();
        if(infoOut===2){
            infoOut=1;
        }else {
            infoOut=2;
        }
        infoToggle();
    });
    $(".info-tg").on("touchend",function (event) {
        event.stopPropagation();
    })

}
function infoToggle() {
    var infoW=$(".info").width();
    switch (infoOut){
        case 1:
            $(".info").css({
                "left":-infoW
            });
            $(".info-arrow").removeClass("inverse");
            break;
        case 2:
            $(".info").show().css({
                "left":0
            });
            $(".info-arrow").addClass("inverse");
            break;
        default:
            $(".info-arrow").css({
                "left":"-100%"
            });
            $(".info-arrow").removeClass("inverse");
            break;
    }
}