/* global jQuery, window, document */
(function ($, moment, window, document, undefined) {
    'use strict';

    var pluginName = 'widgetDate',
        defaults = {
            locale: 'en',
        };
    
    function getDefaultYears() {
        var now = new Date(),
            currentYear = now.getFullYear(),
            i = currentYear - 5,
            lastYear = currentYear + 5,
            availableYears = [];
        while (i < lastYear)  {
            availableYears.push(i++);
        }
        return availableYears;
    }

    function Plugin(element, options) {
        this.element = element;
        this.$el = $(this.element);
        this.options = $.extend({}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;

        console.log(this.options.locale);
        this.setLocale(this.options.locale);

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var plugin = this,
                now = new Date(),
                month = now.getMonth() + 1,
                day = now.getDate();
            this.selectedDay = day < 10 ? '0' + day : day;
            this.selectedMonth = month < 10 ? '0' + month : month;
            this.selectedYear = now.getFullYear();
            this.currentYear = now.getFullYear();
            this.lastYear = this.currentYear - 1;
            
            this.availableYears = this.options.years || getDefaultYears();

            this.createDateElements();
            this.$el.attr('autocomplete', 'off');
            this.$el.on('focus click', function () {
                plugin.placeWrapper();
            });

            this.printSelectedDate();
            this.checkInput();

            $(window).on('click', function (e) {
                var isDateWrapper = false;
                $(e.target).parents().each(function (i, el) {
                    if (el === plugin.$dateWrapper.get(0)) {
                        isDateWrapper = true;
                    }
                });
                if (e.target !== plugin.element && !isDateWrapper) {
                    plugin.hideWrapper();
                }
            });

            this.$el.on('keyup', this.checkInput.bind(this));
        },

        checkInput: function (e) {

            var plugin = this,
                monthInput = plugin.element.value.replace(/(?:^|.*[\W])([a-zA-Z]+).*/i, '$1'),
                dayInput = plugin.element.value.replace(/(?:^|.*[\W])([0-9]{1,2})(\W.*|$)/, '$1'),
                yearInput = plugin.element.value.replace(/(?:^|.*[\W])([0-9]{4})(\W.*|$)/, '$1'),

                matches = this.highlightMatches(plugin.$monthsElement, monthInput);

            plugin.selectedMonth = matches.length ? matches[0].data('id') : plugin.selectedMonth;

            matches = this.highlightMatches(plugin.$daysElement, dayInput, true);
            plugin.selectedDay = matches.length ? matches[0].data('id') : plugin.selectedDay;

            matches = this.highlightMatches(plugin.$yearsElement, yearInput, true);
            plugin.selectedYear = matches.length ? matches[0].data('id') : plugin.selectedYear;

            if (e && e.which === 13) {
                e.preventDefault();
                plugin.placeWrapper();
                plugin.printSelectedDate();
                plugin.element.focus();
            }

            if (e && e.which === 27) {
                e.preventDefault();
                plugin.hideWrapper();
            }
            
        },

        highlightMatches: function highlightMatches($el, input, exact) {
            var matches = [];
            $el.children().each(function (i, el) {
                if (exact) {
                    if (el.innerHTML === input) {
                        matches.push($(el).addClass('widget-date-selected'));
                    }
                } else if (input && el.innerHTML.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                    matches.push($(el).addClass('widget-date-selected'));
                } else {
                    $(el).removeClass('widget-date-selected');
                }
            });

            if (matches.length === 1) {
                this.scrollToSelection(matches[0]);
            }
            return matches;

        },

        printSelectedDate: function () {
            var dateAsString = this.selectedYear + '-' + this.selectedMonth +  '-' + this.selectedDay;
            var formattedDate = moment(dateAsString).format('LL');
            this.$el.val(formattedDate);
            return this;
        },

        scrollToSelection: function ($el) {
            $el.siblings().removeClass('widget-date-selected');
            $el.parent().animate({
                scrollTop: $el.addClass('widget-date-selected').position().top + $el.parent().scrollTop()
            }, 500);
            return this;
        },

        createDateElements: function () {
            this.$monthsElement = $('<ul class="widget-date-list  widget-date-months  nano-content">');
            var monthsHtml = '';
            $.each(moment.months(), function (i, month) {
                i++;
                monthsHtml += '<li data-id="' + (i < 10 ? ('0' + i) : i) + '">' + month + '</li>';
            });
            this.$monthsElement.append(monthsHtml).on('click', 'li', function (e) {
                this.selectedMonth = e.target.dataset.id;
                this.scrollToSelection($(e.target));
                this.printSelectedDate();
                this.updateNumberOfDays();
            }.bind(this));

            this.$yearsElement = $('<ul class="widget-date-list  widget-date-years  nano-content">')
                .appendTo($('<div class="nano  col-xs-3">'));
            var yearsHtml = '';
            $.each(this.availableYears, function (i, year) {
                yearsHtml += '<li data-id="' + year + '">' + year + '</li>';
            });
            this.$yearsElement.append(yearsHtml).on('click', 'li', function (e) {
                this.selectedYear = e.target.dataset.id;
                this.scrollToSelection($(e.target));
                this.printSelectedDate();
                this.updateNumberOfDays();
            }.bind(this));

            this.$daysElement = $('<ul class="widget-date-list  widget-date-days  nano-content">')
                .appendTo($('<div class="nano  col-xs-3">'));
            this.updateNumberOfDays();

            this.$daysElement.on('click', 'li', function (e) {
                this.selectedDay = e.target.dataset.id;
                this.scrollToSelection($(e.target));
                this.printSelectedDate();
            }.bind(this));

            
            this.M = this.$monthsWrapper = $('<div class="nano  col-month">').append(this.$monthsElement);
            this.D = this.$daysWrapper = $('<div class="nano  col-day">').append(this.$daysElement);
            this.Y = this.$yearsWrapper = $('<div class="nano  col-year">').append(this.$yearsElement);
            this.$dateWrapper = $('<div class="widget-date-wrapper  row">')
                .append(this[this.dateElementsOrder[0].charAt(0)])
                .append(this[this.dateElementsOrder[1].charAt(0)])
                .append(this[this.dateElementsOrder[2].charAt(0)])
                .appendTo(document.body);

            return this;
        },
        
        updateNumberOfDays: function () {
            var daysHtml = '';
            var numberOfDays = moment().month(parseInt(this.selectedMonth)).year(this.selectedYear).date(0).date();
            for (var i = 1; i <= numberOfDays; i++) {
                daysHtml += '<li data-id="' + (i < 10 ? ('0' + i) : i) + '">' + i + '</li>';
            }
            this.$daysElement.html(daysHtml);
        },

        hideWrapper: function () {
            this.$dateWrapper.removeClass('widget-date--active');
            this.$el.trigger('date-picker:close');
        },

        placeWrapper: function () {
            var offset = this.$el.offset();
            this.$dateWrapper.css({
                'left': offset.left + 'px',
                'width': this.$el.width() +
                    parseInt(this.$el.css('paddingLeft')) +
                    parseInt(this.$el.css('paddingRight')) + 'px',
                'top': offset.top + this.$el.height() +
                    parseInt(this.$el.css('borderTopWidth')) +
                    parseInt(this.$el.css('borderBottomWidth')) + 'px'
            }).addClass('widget-date--active');
            window.setTimeout(function () {
                var withFlash = {
                    flash: true
                };
                this.$monthsElement.parent().nanoScroller(withFlash);
                this.$daysElement.parent().nanoScroller(withFlash);
                this.$yearsElement.parent().nanoScroller(withFlash);
            }.bind(this), 500);
            
            this.$el.trigger('date-picker:open');
        },

        setLocale: function (locale) {
            this.options.locale = locale;
            moment.locale(locale);
            console.log('moment locale set', moment.locale());
            this.dateElementsOrder = moment.localeData().longDateFormat('LL').split(' ');
            console.log('moment locale set', locale, this.options.locale, moment.locale(), this.dateElementsOrder);
        },
        
        getDate: function () {
            return new Date(this.selectedYear, this.selectedMonth-1, this.selectedDay);
        },
        
        storeMoment: function () {
            this.moment = moment(this.getDate());
        },

        getMoment: function () {
            this.storeMoment();
            return this.moment;
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, moment, window, document);

//# sourceMappingURL=rolling-date.js.map