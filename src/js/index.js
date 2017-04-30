window.onload = function () {
    (function () {
        'use strict';
        var tooltip1 = TOOLTIP.create('myh1', {
            position: 'top',
            text: 'uaua myh1_tooltip',
            event: 'hover'
        });

        var tooltip2 = TOOLTIP.create('mydiv1', {
            position: 'right',
            text: 'div tooltip',
            event: 'click'
        });
        var tooltip3 = TOOLTIP.create('myh1', {
            position: 'bottom',
            text: 'uaua ',
            event: 'hover'
        });
        var tooltip4 = TOOLTIP.create('input1');

        console.log(tooltip1, tooltip2);
    })();
}
