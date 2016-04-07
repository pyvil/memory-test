/**
 * Creating modal
 *
 * @category Components
 * @package Components_Modal
 *
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 *
 * @copyright (c) Vitaliy Pyatin
 */
var Modal = (function () {
    // defaultText        = 'the best!',
    // defaultBackground  = '#7d77b7';

    /**
     * Popup content
     *
     * @type {string}
     */
    var content             = '<span>The best!</span>';
    // generate random ids to prevent matches
    /**
     * Popup unique id
     *
     * @type {string}
     */
    var popupId             = Helper.getRandomString() + '_popup';

    /**
     * Shadow unique id
     *
     * @type {string}
     */
    var shadowId            = Helper.getRandomString() + '_shadow';

    // set classes for popup and shadow
    /**
     * Popup class
     *
     * @type {string}
     */
    var popupClass          = 'popup';

    /**
     * Shadow class
     *
     * @type {string}
     */
    var shadowClass         = 'shadow';

    // popup template
    var popupTemplate       =
        "<div class=':popup_class' id=':popup_id'" +
            ":content" +
        "</div>" +
        "<div class=':shadow_id' id=':shadow_id' style='display: none;'></div>";

    // popup template replacements
    var replacements        = {
        ':popup_class'      : popupClass,
        ':popup_id'         : popupId,

        ':content'          : content,

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
     * Set content
     *
     * @param value
     */
    this.setText = function (value) {
        content = value;
        return this;
    };

    /**
     * Get replacements object
     *
     * @returns {object}
     */
    this.getReplacements = function() {return replacements;};

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
        config = config || {};
        if ( typeof config !== 'object' ) return null;
        replacements = Helper.merge(replacements, config);
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