window.onload = function () {
    (function () {
        'use strict';
        var tooltip1 = new TOOLTIP('myh1', {
            position: 'top',
            text: 'uaua myh1_tooltip',
            event: 'hover'
        });

        var tooltip2 = new TOOLTIP('mydiv1', {
            position: 'right',
            text: 'div tooltip',
            event: 'click'
        });
        var tooltip3 = new TOOLTIP('myh1', {
            position: 'bottom',
            text: 'uaua ',
            event: 'hover',
            delay: '5000'
        });
        var tooltip4 = new TOOLTIP('input1');

        console.log(tooltip4.options());

        console.log(tooltip4.id());
        setTimeout(function () {
            tooltip2.hide();
            console.log('hided');
        }, 5000);

    })();
}
