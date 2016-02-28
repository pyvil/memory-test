/**
 * Creating modal
 *
 * @category Components
 * @package Components_Modal
 *
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
var Modal = (function () {
    var
        text               = null,
        background         = null,

        defaultText        = 'the best!',
        defaultBackground  = '#7d77b7';

    // generate random ids to prevent matches
    var popupId             = Helper.getRandomString() + '_popup';
    var shadowId            = Helper.getRandomString() + '_shadow';

    // set classes for popup and shadow
    var popupClass          = 'popup';
    var shadowClass         = 'shadow';

    // popup template
    var popupTemplate       =
        "<div class=':popup_class' id=':popup_id' style='background: :background; display: none;'>" +
            "<span>:text</span>" +
        "</div>" +
        "<div class=':shadow_id' id=':shadow_id' style='display: none;'></div>";

    // popup template replacements
    var replacements        = {
        ':popup_class'      : popupClass,
        ':popup_id'         : popupId,

        ':background'       : this.getBackground(),
        ':text'             : this.getText(),

        ':shadow_id'        : shadowId,
        ':shadow_class'     : shadowClass
    };

    /**
     * Prepare popup with formatting
     *
     * @returns {*|string}
     */
    this.preparePopup = function () {
        return Helper.format(popupTemplate, replacements);
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
     * Get replacements object
     *
     * @returns {object}
     */
    this.getReplcements = function() {return replacements;};

    /**
     * Add popup markup and show it
     *
     * @returns {Modal}
     */
    this.popup = function () {
        $('body').append(this.preparePopup());
        Helper.centerObject('#' + popupId);
        $('#' + shadowId).fadeIn('fast', function () {
            $('#' + popupId).delay(100).fadeIn('slow');
        });
        return this;
    };

    /**
     * Close popup after time in param
     *
     * @param time
     */
    var closeAfter = function ( time ) {
        var iterator = 0;
        var close = function () {
            if (iterator == (time / 1000)) {
                $('#' + popupId).fadeOut('slow', function () {
                    $('#' + shadowId).fadeOut('fast', function () {
                        $('#' + popupId).remove();
                        $('#' + shadowId).remove();
                    });
                });
            } else {
                iterator++;
                setTimeout(close, 1000);
            }
        };
        close();
    };

    /**
     * Add own configs like so:
     * <code>
     *       {
     *         ':popup_id' : 'my-popup-id', // without leading #
     *         ':popup_class' : 'my-popup-class' // without leading .
     *        }
     * </code>
     * and so on (see README.md is /js/components)
     *
     * @param {object} config
     *
     * @returns {void|null}
     */
    this.setup = function (config) {
        if ( typeof config !== 'object' ) return null;
        $.extend( true, replacements, config );
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