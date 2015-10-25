/**
 *
 */
(function ($, window, document) {
    "use strict";

    var
        testLinkActive = "test_active",

        testLinInactive = "test_inactive";

    /**
     * @param {Object} param
     * @param {String} [param.folder] Is a name of the folder where located images for test
     * @param {Array} param.images Is a array with images name.ext
     * @param {Number|String} [param.level] The level to start, by default = 1
     * @param {Number|String} [param.imagesToRemember] The number of images to remember on the 1-st
     * (or level pass as parameter) level, by default = 2
     * @param {Number|String} [param.levelsAmount] Wanted amount of levels, by default = 10
     * @param {String|Object} [param.levelLinksContainer]
     * @param {String|Object} [param.imagesOutContainer]
     * @param {String|Object} [param.rememberContainer]
     * @constructor
     */
    var Test = function (param) {
        var folder = param.folder;
        // folder with images for test
        this.folder = (folder != null && folder != '') ? folder : 'test';
        // array of images
        this.images = param.images;
        // start level
        this.level = this.toInt(param.level);
        // how many images to remember on the 1-st level
        this.imagesToRemember = this.toInt(param.imagesToRemember);
        // amount of levels
        this.levelsAmount = this.toInt(param.levelsAmount);
        //
        this.levelLinksContainer = this.toObj(param.levelLinksContainer, '.pyvil_level_list');
        //
        this.imagesOutContainer = this.toObj(param.imagesOutContainer, '.pyvil_images_container');
        //
        this.rememberContainer = this.toObj(param.rememberContainer, '.pyvil_remember_container');

        /** */
        this.levelLinksGenerate();
    };

    Test.prototype = {
        /**
         * Helper: convert variable to integer value
         * @param _var
         * @returns {number}
         */
        toInt : function (_var) {
            return (_var == null || _var == 0)
                ? 1 : parseInt(_var, 10) ;
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
            return $(_default)
            //throw new Error("You pass a wrong parameter, please check parameters you pass!");
        },
        /**
         * shuffle current image sequence
         */
        shuffle : function () {
            this.images.shuffle();
        },
        /**
         * set level
         * @param {number|string} level
         */
        setLevel : function (level) {
            this.level = this.toInt(level);
            var imgs = this.getImagesToRemember();
            var self = this;
            imgs.forEach(function (item) {
                $(self.rememberContainer).append()
            })
        },
        /**
         * get current level
         * @returns {number}
         */
        getLevel : function() {
            return this.level;
        },
        /**
         * Next level double images to remember
         * and increment current level (cap :D)
         */
        nextLevel : function () {
            this.level += 1;
            this.imagesToRemember *= 2;
        },
        /**
         * Set images sequence
         * @param {Array} arr
         */
        setImages : function (arr) {
            this.images = arr;
        },
        /**
         * Generate list of levels
         */
        levelLinksGenerate : function () {
            var item = null;
            for (var i = this.level; i <= this.levelsAmount; i++)
                $(this.levelLinksContainer).append(
                    "<a href='javascript:void(0)' data-level='"+i+"' class='" + (i <= this.level ? testLinkActive : testLinInactive) + "'>Level "+i+"</a>"
                );
            var self = this;
            $(this.levelLinksContainer).delegate('a', 'click', function (e) {
                if ($(this).hasClass(testLinInactive)) return false;
                self.setLevel($(this).attr('data-level'));
            });
        },
        /**
         * Get an array of images you have to remember
         * @returns {Array.<T>}
         */
        getImagesToRemember : function () {
            this.shuffle();
            var self = this;
            var _left = $(this.levelLinksContainer).css('left');
            $(this.levelLinksContainer).animate({
                left : -$(this.levelLinksContainer).width()
            }, 100, 'swing', function () {
                $(self.levelLinksContainer).slideUp('fast', function () {
                    $(self.levelLinksContainer).css('left', _left);
                    $(self.rememberContainer).slideDown('fast');
                });
            });
            return this.images.slice(0, this.imagesToRemember);
        },
    };

} (jQuery, window, document) );