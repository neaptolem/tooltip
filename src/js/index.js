window.onload = function () {
    (function () {
        'use strict';
        // var tooltip1 = new TOOLTIP('myh1', {
        //     position: 'top',
        //     text: 'uaua myh1_tooltip',
        //     event: 'hover'
        // });

        // var tooltip2 = new TOOLTIP('mydiv1', {
        //     position: 'right',
        //     text: 'div tooltip',
        //     event: 'click'
        // });
        // var tooltip3 = new TOOLTIP('myh1', {
        //     position: 'bottom',
        //     text: 'uaua ',
        //     event: 'hover',
        //     delay: '5000'
        // });
        // var tooltip4 = new TOOLTIP('input1');

        // console.log(tooltip4.options());

        // console.log(tooltip4.id());
        // setTimeout(function () {
        //     tooltip2.hide();
        //     console.log('hided');
        // }, 5000);
        var colection = new TOOLTIPS_COLECTION();

        var tooltip1 = colection.create('div1', {
            position: 'top',
            text: 'div1 top',
            event: 'mouseover',
            hide: 'click'
        });

        var tooltip2 = colection.create('div2', {
            position: 'right',
            text: 'div2 right',
            event: 'mouseover',
            delay: 3000
        });

        var tooltip3 = colection.create('div3', {
            position: 'bottom',
            text: 'div1 bottom',
            event: 'mouseover'
        });

        var tooltip4 = colection.create('div4', {
            position: 'left',
            text: 'div2 left',
            event: 'mouseover'
        });

        var colection2 = new TOOLTIPS_COLECTION();

        var tooltip5 = colection2.create('input1', {
            position: 'right',
            text: 'First Name',
            event: 'click'
        });

        var tooltip6 = colection2.create('input2', {
            position: 'left',
            text: 'Last Name',
            event: 'click'
        });

        var tooltip7 = colection2.create('btn1', {
            position: 'top',
            text: 'Submit',
            event: 'mouseover'
        });

        var colection3 = new TOOLTIPS_COLECTION();

        var tooltip8 = colection3.create('btn2', {
            position: 'top',
            text: 'Submit',
            event: 'mouseover'
        });

        var tooltip9 = colection3.create('btn3', {
            position: 'top',
            text: 'Submit',
            event: 'mouseover'
        });


    })();
}
