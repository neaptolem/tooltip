var TOOLTIP = (function () {
    'use strict';
    var POSITIONS = ['top', 'left', 'right', 'bottom'];
    var EVENTS = ['click', 'dbclick', 'mouseover'];
    var WITHOUT_END_TAG = ['INPUT', 'IMG', 'BUTTON'];
    var TOOLTIP_CONTAINER_ID_ENDING = 'tooltip_container';

    var tooltip;
    var tooltipContainer;
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


    function Tooltip(parent) {
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
        var timeout;
        var self = this;
        var tooltip = new Tooltip(this);


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

        function _addListeners() {
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

        function _createTooltipNode() {
            if (!WITHOUT_END_TAG.includes(self._element.tagName)) {
                self._element.appendChild(tooltip._element);
                console.log(self._element.tagName);
            } else {
                if (!document.getElementById(self.getId + TOOLTIP_CONTAINER_ID_ENDING)) {
                    tooltipContainer = new TooltipContainer(self.getId(), null, tooltip);
                    self._element.parentNode.insertBefore(tooltipContainer._element, self._element);
                    tooltipContainer._element.appendChild(self._element);
                } else {
                    tooltipContainer = new TooltipContainer(null, document.getElementById(self.getId + TOOLTIP_CONTAINER_ID_ENDING), tooltip);
                }
            }
        }

        this.create = function () {
            this.addClass(['object-for-tooltip']);
            _setProperty(function () {
                tooltip.create();
                _createTooltipNode();
                _addListeners();
                positionService[property.position]();
            });

        };

    }

    function TooltipContainer(id, elem, tooltip) {
        var self = this;
        if (id) {
            DOMObjectWraper.call(this, document.createElement('div'));
            _create();
        } else {
            DOMObjectWraper.call(this, elem);
            _add();
        }

        function _create() {
            self._element.id = id + TOOLTIP_CONTAINER_ID_ENDING;
            _add();
        }

        function _add() {
            console.log(tooltip);
            debugger;
            self._element.appendChild(tooltip._element);
        }
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
