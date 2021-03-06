function TOOLTIPS_COLECTION() {
    var tooltips = [];

    this.create = function (id, obj) {
        var tmpObj = new TOOLTIP(id, obj);
        tooltips.push(tmpObj);
        return tmpObj;
    }

    this.getTooltips = function () {
        return tooltips;
    }

    function hideAll() {
        tooltips.forEach(function (item) {
            item.hide();
        });
    }

    function TOOLTIP(id, obj) {
        'use strict';
        var POSITIONS = ['top', 'left', 'right', 'bottom'];
        var EVENTS = ['click', 'dbclick', 'mouseover'];
        var EVENTS_HIDE = ['click', 'time'];
        var WITHOUT_END_TAG = ['INPUT', 'IMG', 'BUTTON'];
        var TOOLTIP_CONTAINER_ID_ENDING = 'tooltip_container';

        var objectForTooltip;
        var event, position, delay, text, dismiss, hideType;

        (function create(id, obj = {}) {
            objectForTooltip = new ObjectForTooltip(id, obj);
            objectForTooltip.create();
        })(id, obj);

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
            var self = this;

            function _idGenerator(id) {
                if (!document.getElementById(id)) {
                    return id;
                } else {
                    return _idGenerator(id + (Math.random() * 100).toFixed(0));
                }
            }

            this.create = function () {
                this._element.id = _idGenerator(parent.getId() + '_tooltip');
                this._element.appendChild(document.createTextNode(text));
                this.addClass(['tooltip']);
            }

            this.setPosition = function () {
                self.addClass([position]);
            }

        }

        function ObjectForTooltip(id, obj) {
            DOMObjectWraper.call(this, document.getElementById(id));
            var self = this;
            var tooltip = new Tooltip(this);
            var tooltipContainer;
            var timeout;

            function _addListeners() {
                var hideService = {
                    'time': function () {
                        self._element.addEventListener('mouseout', function () {
                            timeout = setTimeout(function () {
                                tooltip.removeClass(['display']);
                            }, delay);
                        });
                    },
                    'click': function () {
                        document.addEventListener('click', function () {
                            tooltip.removeClass(['display']);

                        });
                    }
                };

                self._element.addEventListener(event, function () {
                    clearTimeout(timeout);
                    if (dismiss) {
                        hideAll();
                    }
                    tooltip.addClass(['display']);
                });
                hideService[hideType]();
            }

            function _setProperty(callback) {
                event = (obj.event && EVENTS.includes(obj.event)) ? obj.event : 'mouseover';
                position = (obj.position && POSITIONS.includes(obj.position)) ? obj.position : 'top';
                text = obj.text || 'undefined';
                delay = +obj.delay || 1000;
                dismiss = obj.dismiss || true;
                hideType = (obj.hide && EVENTS_HIDE.includes(obj.hide)) ? obj.hide : 'time';
                callback();
            }

            function _createTooltipNode(callback) {
                if (!WITHOUT_END_TAG.includes(self._element.tagName)) {
                    self._element.appendChild(tooltip._element);
                } else {
                    if (!document.getElementById(self.getId + TOOLTIP_CONTAINER_ID_ENDING)) {
                        tooltipContainer = new TooltipContainer(self.getId(), null, tooltip);
                        self._element.parentNode.insertBefore(tooltipContainer._element, self._element);
                        tooltipContainer._element.appendChild(self._element);
                    } else {
                        tooltipContainer = new TooltipContainer(null, document.getElementById(self.getId + TOOLTIP_CONTAINER_ID_ENDING), tooltip);
                    }
                }
                callback();
            }

            this.create = function () {
                this.addClass(['object-for-tooltip']);
                _setProperty(function () {
                    tooltip.create();
                    _createTooltipNode(function () {
                        _addListeners();
                        tooltip.setPosition();
                    });
                });
            };

            this.getTooltip = function () {
                return tooltip;
            };

            this.hide = function () {
                clearTimeout(timeout);
                tooltip.removeClass(['display']);
            }
        }

        function TooltipContainer(id, elem, tooltip) {
            var self = this;

            if (id) {
                DOMObjectWraper.call(this, document.createElement('div'));
                this.addClass(['tooltip-container']);
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
                self._element.appendChild(tooltip._element);
            }
        }

        this.options = function () {
            return {
                'event': event,
                'position': position,
                'delay': delay,
                'text': text,
                'dismiss': dismiss,
                'hideType': hideType
            }
        }

        this.getId = function () {
            return objectForTooltip.getTooltip()
                ._element.id;
        }

        this.hide = function () {
            objectForTooltip.hide();
            return this;
        }
    }
}
