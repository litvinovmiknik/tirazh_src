$('.card-product__slider').bxSlider({
    mode: 'horizontal',
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    slideWidth: 586,
    pagerCustom: '.card-product__pager',
    responsive: true
});
function getFileName () {
    var file = document.getElementById ('uploaded-file').value;
    file = file.replace (/\\/g, "/").split ('/').pop ();
    document.getElementById ('file-name').innerHTML = 'Имя файла: ' + file;
}
