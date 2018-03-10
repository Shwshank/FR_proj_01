//  **Navigation js
$(function(){
    "use strict";
    $(".fa-bars").click(function(){
        //$(".black-shadow").addClass("active");
        $(this).siblings(".fa-times").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").removeClass("left-menu-close");
    });
    $(".fa-times").click(function(){
        //$(".black-shadow").removeClass("active");
        $(this).siblings(".fa-bars").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").addClass("left-menu-close");
    });
});
//  **Navigation Mobile js
$(function(){
"use strict";
    if ( window.innerWidth <= 1024 ) {
        $("body").addClass("left-menu-close");
        $('.navbar-toggleable-md').find(".fa-times").removeClass("active");
        $('.navbar-toggleable-md').find(".fa-bars").addClass("active");
        $(".nav-link").click(function(){
            $('body').addClass('left-menu-close');
            $('.navbar-toggleable-md').find(".fa-times").removeClass("active");
            $('.navbar-toggleable-md').find(".fa-bars").addClass("active");
        });
        $(document).on("mouseup touchend", function (e) {
            //"use strict";
            if(!$('body').hasClass('left-menu-close')){
                var fc = $(".slider-fix");
                if(!fc.is(e.target)&&fc.has(e.target).length===0){
                    $('body').addClass('left-menu-close');
                    $('.navbar-toggleable-md').find(".fa-times").removeClass("active");
                    $('.navbar-toggleable-md').find(".fa-bars").addClass("active");    
                }
            }
        });
    }
});