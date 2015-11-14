/**
 * @category Test_Model
 * @package Model
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */

/**
 *
 * @param param
 * @constructor
 */
var Modal = function (param) {
    this.start();
};

/**
 *
 * @type {{setText: Function, setBlockBackground: Function, popup: Function, closeAfter: Function, start: Function}}
 */
Modal.prototype = {

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

    popup : function () {
        this.testDefaults();
        $('body').append(
            "<div class='popup' style='background: " + this.background + "; display: none;'>" + this.text + "</div>"
            + "<div class='shadow' style='display: none;'></div>"
        );
        this.center_overlay_modal({obj : '.popup'});
        $('.shadow').fadeIn('fast', function () {
            $('.popup').delay(100).fadeIn('slow');
        });
        return this;
    },

    /**
     *
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
     *
     */
    start : function () {
        this.text = this.text == null ? 'the best!' : this.text;
        this.background = this.background == null ? '#7d77b7' : this.background;
        //this.popup();
    },

    /**
     *
     */
    testDefaults : function () {
        this.text = this.text == null ? 'the best!' : this.text;
        this.background = this.background == null ? '#7d77b7' : this.background;
    }
};
// extends from Helper class
$.extend(Modal.prototype, Helper.prototype);
/** init Modal class in global scope */
window.Modal = Modal || {};