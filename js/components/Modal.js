/**
 * Creating modal
 *
 * @category Components
 * @package Components_Modal
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
var Modal = (function () {
    var
        text               = null,
        background         = null,

        defaultText        = 'the best!',
        defaultBackground  = '#7d77b7';

    var popupTemplate =
        "<div class='popup' style='background: {1}; display: none;'>" +
            "<span>{2}</span>" +
        "</div>" +
        "<div class='shadow' style='display: none;'></div>";

    /**
     * Prepare popup with formatting
     *
     * @returns {*|string}
     */
    this.prepatePopup = function () {
        return Helper.format(popupTemplate, this.getBackground(), this.getText());
    };

    /**
     * Get popup not formatted template
     *
     * @returns {string}
     */
    this.getPopupTemplate = function () {
        return popupTemplate;
    };

    /**
     * Set modal text
     *
     * @param _text
     */
    this.setText = function (_text) {
        text = _text;
        return this;
    };

    /**
     * Set background of popup
     *
     * @param color
     */
    this.setBackground = function(color) {
        background = color;
        return this;
    };

    /**
     * Get text value
     *
     * @returns {string}
     */
    this.getText = function() {return text == null ? defaultText : text;};

    /**
     * Get background value
     *
     * @returns {string}
     */
    this.getBackground = function() {return background == null ? defaultBackground : background;};

    /**
     * Add popup markup and show it
     *
     * @returns {Modal}
     */
    this.popup = function () {
        $('body').append(
            popupTemplate
        );
        Helper.centerObject('.popup');
        $('.shadow').fadeIn('fast', function () {
            $('.popup').delay(100).fadeIn('slow');
        });
    };

    /**
     * Close popup after time in param
     *
     * @param time
     */
    var closeAfter = function (time) {
        var iterator = 0;
        var close = function () {
            if (iterator == (time / 1000)) {
                $('.popup').fadeOut('slow', function () {
                    $('.shadow').fadeOut('fast', function () {
                        $('.popup').remove();
                        $('.shadow').remove();
                    });
                });
            } else {
                iterator++;
                console.log(iterator);
                setTimeout(close, 1000);
            }
        };
        close();
    };

    return this;
})();

if (typeof define === 'function' && define.amd) {
    define('modal', ['../tests/node_modules/jquery/dist/jquery', 'helper'], function() {
        return Modal;
    })
}

if(typeof module != 'undefined') {
    module.exports = Modal;
} else {
    window.Modal = Modal;
}