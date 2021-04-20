$('.calc__help-format').click(function() {
    $('.calc__help-popup-format').toggle();
});
$('.calc__help-edition').click(function() {
    $('.calc__help-popup-edition').toggle();
});
$('.calc__help-color').click(function() {
    $('.calc__help-popup-color').toggle();
});
$('.calc__help-paper').click(function() {
    $('.calc__help-popup-paper').toggle();
});
$('.calc__help-perforation').click(function() {
    $('.calc__help-popup-perforation').toggle();
});
$('.calc__help-number').click(function() {
    $('.calc__help-popup-number').toggle();
});
$('.calc__help-lamination').click(function() {
    $('.calc__help-popup-lamination').toggle();
});
$('.calc__help-thickness').click(function() {
    $('.calc__help-popup-thickness').toggle();
});
$(function(){
    $('.calc__paper-type').jScrollPane({
        showArrows: true
    });
});
$(function(){
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        if(top < 325) {
            $('.calc__right').removeClass('absolute');
            $('.calc__right').removeClass('fixed');
        }
        if(top > 325 && top < 1060) {
            $('.calc__right').removeClass('absolute');
            $('.calc__right').addClass('fixed');
        }
        if(top > 1060) {
            $('.calc__right').removeClass('fixed');
            $('.calc__right').addClass('absolute');
        }
    });
});
$('.calc__size-width').blur(function(){
    var width = $(this).val();
    if(width != '') {
        $(this).css({border: '1px solid #f88249', color: '#f88249'});
    }
    else {
        $(this).css({border: '1px solid #e7e7e9', color: '#96979a'});
    }
    if(width != '' && $('.calc__size-height').val() != '') {
        $('.calc__size').css({border: '1px solid #f88249', color: '#f88249'});
    }
    else {
        $('.calc__size').css({border: '1px solid #96979a', color: '#96979a'});
    }
});
$('.calc__size-height').blur(function(){
    var height = $(this).val();
    if(height != '') {
        $(this).css({border: '1px solid #f88249', color: '#f88249'});
    }
    else {
        $(this).css({border: '1px solid #e7e7e9', color: '#96979a'});
    }
    if(height != '' && $('.calc__size-width').val() != '') {
        $('.calc__size').css({border: '1px solid #f88249', color: '#f88249'});
    }
    else {
        $('.calc__size').css({border: '1px solid #96979a', color: '#96979a'});
    }
});
$('.calc__edition-input').blur(function(){
    if($(this).val() != '') {
        $('input[name=edition]').removeAttr('checked');
        $(this).css({border: '1px solid #f88249', color: '#f88249'});
    }
    else {
        $(this).css({border: '1px solid #e7e7e9', color: '#96979a'});
    }
});