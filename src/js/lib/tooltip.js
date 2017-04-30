var TOOLTIP = (function () {
    'use strict';
    var POSITIONS = ['top', 'left', 'right', 'bottom'];
    var EVENTS = ['click', 'dbclick', 'mouseover'];
    var tooltip;
    var objectForTooltip;
    var property = {};


    function DOMObjectWraper(elem) {
        this._element = elem;

        var self = this;

        this.addClass = function (arr, callback) {
            arr.forEach(function (value) {
                self._element.classList.add(value);
            }, this);
            if (callback) {
                callback();
            }
            return this._element;
        }

        this.removeClass = function (arr, callback) {
            arr.forEach(function (value) {
                self._element.classList.remove(value);
            }, this);
            if (callback) {
                callback();
            }
            return this._element;
        }

        this.getId = function () {
            return this._element.id;
        }
    }


    function Tooltip(obj = {}, parent) {
        DOMObjectWraper.call(this, document.createElement('div'));

        function _idGenerator(id) {
            if (!document.getElementById(id)) {
                return id;
            } else {
                return _idGenerator(id + (Math.random() * 100).toFixed(0));
            }
        }

        this.create = function () {

            this._element.id = _idGenerator(parent.getId() + '_tooltip');


            this._element.appendChild(document.createTextNode(property.text));

            this.addClass(['tooltip', property.position]);
        }

    }

    function ObjectForTooltip(id, obj) {
        DOMObjectWraper.call(this, document.getElementById(id));
        var tooltip = new Tooltip(obj, this);
        var timeout;
        var self = this;
        var positionService = {
            'top': function () {
                tooltip._element.style.top = '-' + self._element.clientHeight + 'px';
            },
            'bottom': function () {
                tooltip._element.style.bottom = '-' + self._element.clientHeight + 'px';
            },
            'left': function () {

            },
            'right': function () {

            }
        }

        var _addListeners = function () {
            self._element.addEventListener(property.event, function () {
                clearTimeout(timeout);
                tooltip.addClass(['display']);
            });

            self._element.addEventListener('mouseout', function () {
                timeout = setTimeout(function () {
                    tooltip.removeClass(['display']);
                }, 3000);
            });
        }

        function _setProperty(callback) {
            property.event = (obj.event && EVENTS.includes(obj.event)) ? obj.event : 'mouseover';
            property.position = (obj.position && POSITIONS.includes(obj.position)) ? obj.position : 'top';
            property.text = obj.text || 'undefined';
            callback();
        }

        this.create = function () {
            this.addClass(['object-for-tooltip']);
            _setProperty(function () {
                tooltip.create();
                self._element.appendChild(tooltip._element);
                _addListeners();
                positionService[property.position]();
            });

        };

    }

    var create = function (id, obj = {}) {
        var objectForTooltip = new ObjectForTooltip(id, obj);
        objectForTooltip.create();
        return this;
    }


    return {
        'create': create
    };
})();

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
        // var tooltip3 = TOOLTIP.create('input1');

        console.log(tooltip1, tooltip2);
    })();
}
