
document.body.onload = function () {
    $('.load').toggleClass('preloader_done');
    $('body').toggleClass('lock');
}

function ibg() {
    $.each($('.ibg'), function (index, val) {
        if ($(this).find('img').length > 0) {
            $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
        }
    });
}
ibg();

/*
Меню бургер
*/
$(document).ready(function () {

    $('.header__burger,.header__item').click(function (event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.header__logo').click(function (event) {
        $('.header__burger,.header__menu').removeClass('active');
        $('body').removeClass('lock');
    });
    /*
        $('.header__logo').click(function (event) {
            $('.header__burger,.header__menu').toggleClass('active');
            $('body').toggleClass('lock');
        });*/

});

/*Мы рекомендуем */
var fix_items_show = 4;
var fix_items = 0;
$(document).ready(function () {

    var fix_items = $(".fix__body").length;

    $('.fix__lable.spoiler').click(function (event) {
        if ($('.fix').hasClass('one-sm')) {
            $('.fix__lable.spoiler').not($(this)).removeClass('active');
            $('.fix__body').not($(this).next()).slideUp(400);
        }
        $(this).toggleClass('active').next().slideToggle(400);
    });

    // $('.fix__body').slice(0, fix_items_show).show();



    var sm_fix_size = false;
    if ($(window).width() > 767) {

        $('.fix__body').slice(0, fix_items_show).show();
        sm_fix_size = false;
    } else {
        $('.fix__body').slice(0, fix_items).hide();
        sm_fix_size = true;
    }

    $(window).on('resize', function () {
        if ($(window).width() > 767) {
            if (sm_fix_size == true) {
                $('.fix__body').slice(0, fix_items_show).show();
                $('.fix__body').slice(fix_items_show, fix_items).hide();
                sm_fix_size = false;
            }
        } else {
            if (sm_fix_size == false) {
                $('.fix__body').slice(0, fix_items).hide();
                sm_fix_size = true;
            }
        }
    });

    if (fix_items > fix_items_show) {
        $(".fix").append('<div class="fix__load-more"> <a href="#">[Показать ещё]</a> </div>');
    }


    $('.fix__load-more').click(function (event) {
        event.preventDefault();
        var speed = 500;
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.fix__body').slice(fix_items_show, fix_items).slideDown(speed);
            $(this).children().html("[Скрыть]");
        } else {
            $('.fix__body').slice(fix_items_show, fix_items).slideUp(speed);
            $(this).children().html("[Показать ещё]");
        }
    });
    var showChar = 410;
    var ellipsestext = ". . .";
    var moretext = "[Читать далее]";
    var lesstext = "[Скрыть]";

    $('.fix__text').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span class="moretext">' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);

        }
    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }

        $(this).prev().toggle();
        $(this).parent().prev().toggle();
        return false;
    });
});

/* Слайдер*/
$(document).ready(function () {

    $('.partners__slider').slick({
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="icon-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon-right"></i></button>',
        //dots: true,
        //adeptiveHight: true, flex-start
        slidesToShow: 6,
        slidesToScroll: 3,
        rows: 3,
        speed: 500,
        //easing: 'ease',
        autoplay: true,
        // autoplaySpeed: 100,
        responsive: [
            {
                breakpoint: 1218,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 425,//576,
                settings: {
                    slidesToShow: 2,
                    // dots: true,
                    arrows: false,
                }
            },
        ]
    });

    //Главный слайдер
    $('.carusel').slick({
        arrows: false,
        dots: true,
        //adeptiveHight: true, flex-start

        speed: 1000,
        //easing: 'ease',
        autoplay: false,//true,
        autoplaySpeed: 1700,
    });
});

var inputs = document.querySelectorAll('.letter__input-path');

Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
            fileName = e.target.value.split('\\').pop();
        }
        if (fileName)
            label.querySelector('.path').innerHTML = fileName;
        else
            label.innerHTML = labelVal;
    });
});




/*Переход на якорь*/
(function (document, history, location) {
    var HISTORY_SUPPORT = !!(history && history.pushState);

    var anchorScrolls = {
        ANCHOR_REGEX: /^#[^ ]+$/,
        //OFFSET_HEIGHT_PX: 100,

        /**
         * Establish events, and fix initial scroll position if a hash is provided.
         */
        init: function () {
            this.scrollToCurrent();
            $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
            $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
        },

        /**
         * Return the offset amount to deduct from the normal scroll position.
         * Modify as appropriate to allow for dynamic calculations
         */
        getFixedOffset: function () {
            return $("header").height();//this.OFFSET_HEIGHT_PX;
        },

        /**
         * If the provided href is an anchor which resolves to an element on the
         * page, scroll to it.
         * @param  {String} href
         * @return {Boolean} - Was the href an anchor.
         */
        scrollIfAnchor: function (href, pushToHistory) {
            var match, anchorOffset;

            if (!this.ANCHOR_REGEX.test(href)) {
                return false;
            }

            match = document.getElementById(href.slice(1));

            if (match) {
                anchorOffset = $(match).offset().top - this.getFixedOffset();
                $('html, body').animate({ scrollTop: anchorOffset });

                // Add the state to history as-per normal anchor links
                if (HISTORY_SUPPORT && pushToHistory) {
                    history.pushState({}, document.title, location.pathname + href);
                }
            }

            return !!match;
        },

        /**
         * Attempt to scroll to the current location's hash.
         */
        scrollToCurrent: function (e) {
            if (this.scrollIfAnchor(window.location.hash) && e) {
                e.preventDefault();
            }
        },

        /**
         * If the click event's target was an anchor, fix the scroll position.
         */
        delegateAnchors: function (e) {
            var elem = e.target;

            if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
                e.preventDefault();
            }
        }
    };

    $(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);


