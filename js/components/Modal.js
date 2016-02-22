/**
 * Creating modal
 *
 * @category Components
 * @package Components_Modal
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
var Modal = {
    text :               null,
    background :         null,

    defaultText :        'the best!',
    defaultBackground :  '#7d77b7',
    /**
     * Set modal text
     * @param text
     */
    setText : function (text) {
        this.text = text;
        return this;
    },

    /**
     * Set bakground of popup
     * @param color
     */
    setBlockBackground : function(color) {
        this.background = color;
        return this;
    },

    /**
     * Add popup markup and show it
     * @returns {Modal}
     */
    popup : function () {
        this.testDefaults();
        $('body').append(
            "<div class='popup' style='background: " + this.background + "; display: none;'><span>" + this.text + "</span></div>"
            + "<div class='shadow' style='display: none;'></div>"
        );
        Helper.centerObject('.popup');
        $('.shadow').fadeIn('fast', function () {
            $('.popup').delay(100).fadeIn('slow');
        });
        return this;
    },

    /**
     * Close popup after time in param
     * @param time
     */
    closeAfter : function (time) {
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
    },

    /**
     * When start using add defaults if necessary
     */
    start : function () {
        this.testDefaults();
        //this.popup();
    },

    /**
     * Testing defaults values
     */
    testDefaults : function () {
        this.text = this.text == null ? this.defaultText : this.text;
        this.background = this.background == null ? this.defaultBackground : this.background;
    }
};

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