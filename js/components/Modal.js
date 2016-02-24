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
    this.getText = function() {return text;};

    /**
     * Get background value
     *
     * @returns {string}
     */
    this.getBackground = function() {return background;};

    /**
     * Two methods below are getters of default values of text and background
     *
     * @returns {string}
     */
    this.getDefaultText = function() {return defaultText;};
    this.getDefaultBackground = function() {return defaultBackground;};

    /**
     * Add popup markup and show it
     *
     * @returns {Modal}
     */
    this.popup = function () {
        testDefaults();
        $('body').append(
            "<div class='popup' style='background: " + this.background + "; display: none;'><span>" + this.text + "</span></div>"
            + "<div class='shadow' style='display: none;'></div>"
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

    /**
     * Testing defaults values
     */
    var testDefaults = function () {
        text = text == null ? defaultText : text;
        background = background == null ? defaultBackground : background;
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