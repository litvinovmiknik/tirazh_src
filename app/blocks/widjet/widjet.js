$('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 800);
    return false;
});
$(function() {
    $(window).scroll(function(){
        var top = $(document).scrollTop();
        if(top > 200) {
            $('.widjet').show();
        }
        else {
            $('.widjet').hide();
        }
    });
});
