window.onload = function () {
    // Year
    const year = new Date();
    $('#year').text(year.getFullYear());

    // accordion
    $('.accordion-content').hide();
    $('.accordion-title').on('click', function() {
        let showed = $('.content').find('.accordion-content:not([style*="display: none"])');
        $('.accordion-content').hide();
        if (
            showed.length === 0
            || (
                showed.length > 0
                && this.getAttribute('href') !== '#' +showed[0].getAttribute('id')
            )
        ){
            console.log('zero or if not same as the one clicked open it');
            $(this.getAttribute('href') + '.accordion-content').show();
        }
    });
};