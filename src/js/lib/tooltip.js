var TOOLTIP = (function () {
    'use strict';
    var POSITIONS = ['top', 'left', 'right', 'bottom'];
    var EVENTS = [];
    var tooltip;
    var objectForTooltip;

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

        this.create = function () {
            parent.getId();
            this._element.id = parent.getId() + '_tooltip';
            var property = {}
            property.position = (obj['position'] && POSITIONS.includes(obj['position'])) ? obj['position'] : 'top';
            property.text = obj['text'] || 'undefined';
            this._element.appendChild(document.createTextNode(property.text));
            this.addClass(['red']);
        }
    }

    function ObjectForTooltip(id, obj) {
        DOMObjectWraper.call(this, document.getElementById(id));

        this.create = function () {
            var tooltip = new Tooltip(obj, this);
            tooltip.create();
            this._element.appendChild(tooltip._element);
        }

    }

    var create = function (id, obj = {}) {
        var objectForTooltip = new ObjectForTooltip(id, obj);
        objectForTooltip.create();
    }


    return {
        'create': create
    };
})();

window.onload = function () {
    (function () {
        'use strict';
        var tooltip = TOOLTIP.create('myh1', {
            position: 'right',
            text: 'uaua myh1_tooltip',
            event: 'hover'
        });
    })();
}
