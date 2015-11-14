/**
 * @category Test_Helper
 * @package Helper
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 * @type {{toInt: Function, toObj: Function}}
 */
var Helper = function () {};
Helper.prototype = {
    /**
     * Helper: convert variable to integer value
     * @param _var
     * @returns {number}
     * @param _default
     */
    toInt : function (_var, _default) {
        return (_var == null || _var == 0)
            ? _default : parseInt(_var, 10) ;
    },
    /**
     * Helper: convert variable to Object value
     * @param _var
     * @returns {Object}
     * @param _default
     */
    toObj : function (_var, _default) {
        if (typeof _var == 'String') {
            if ($(_var)) return $(_var);
            if ($('.' + _var)) return $('.' + _var);
            if ($('#' + _var)) return $('#' + _var);
        } else if (typeof _var == 'Object') {
            return $(_var);
        }
        return $(_default);
        //throw new Error("You pass a wrong parameter, please check parameters you pass!");
    },

    /**
     * Put block in the center of the screen
     * @param parameters
     */
    center_overlay_modal : function(parameters){
        var
            cn              = parameters.obj;

        $(cn).css("top", Math.max(0, (($(window).height() - $(cn).outerHeight()) / 2)) + "px");
        $(cn).css("left", Math.max(0, (($(window).width() - $(cn).outerWidth()) / 2)) + "px");
    }
};