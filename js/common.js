/**
 *
 */
(function ($, window, document) {
    "use strict";

    var
        testLinkActive = "active",

        testLinInactive = "disabled";

    /**
     * @param {Object} param
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
        /**
         *
         * @type {Array}
         */
        this.images = [];
        var self = this;
        // makes an object of each image, added `path` and `id`
        param.images.forEach(function (item, index) {
            self.images.push({'id' : index, 'item' : item});
        });
        /**
         *
         * @type {number}
         */
        this.level = this.toInt(param.level, 1);
        /**
         *
         * @type {number}
         */
        this.imagesToRemember = this.toInt(param.imagesToRemember, 2);
        /**
         *
         * @type {number}
         */
        this.levelsAmount = this.toInt(param.levelsAmount, 10);
        /**
         *
         * @type {Object}
         */
        this.levelLinksContainer = this.toObj(param.levelLinksContainer, '.pyvil_level_list');
        /**
         *
         * @type {Object}
         */
        this.imagesOutContainer = this.toObj(param.imagesOutContainer, '.pyvil_images_list');
        /**
         *
         * @type {Object}
         */
        this.rememberContainer = this.toObj(param.rememberContainer, '.pyvil_remember_list');

        /**
         * Array of images user have to remember
         * @type {Array}
         */
        this.rememberArray = [];

        /** */
        this.levelLinksGenerate();
    };

    Test.prototype = {
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
            return $(_default)
            //throw new Error("You pass a wrong parameter, please check parameters you pass!");
        },
        /**
         * shuffle current image sequence
         */
        shuffle : function () {
            for(var j, x, i = this.images.length; i; j = Math.floor(Math.random() * i), x = this.images[--i], this.images[i] = this.images[j], this.images[j] = x);
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
            this.levelLinksGenerate();
        },
        /**
         * set level
         * @param {number|string} level
         */
        setLevel : function (level) {
            this.level = this.toInt(level, 1);
            this.imagesToRemember = this.level * 2;
            var imgs = this.getImagesToRemember();
            var self = this;
            this.rememberArray = [];
            $(this.rememberContainer).html("");
            imgs.forEach(function (item) {
                $(self.rememberContainer).append(
                    "<img src = '" + item.item + "' data-id='" + item.id + "'>"
                );
                // push `id`s of elements user have to remember
                self.rememberArray.push(item.id);
            });
            console.log(self.rememberArray);
            $('.start-test').bind('click', function () {
                $(self.rememberContainer).parent().slideUp('fast', function () {
                    self.getAllImages();
                    $(self.imagesOutContainer).parent().slideDown('fast');
                });
            });
        },
        /**
         * Generate list of levels
         */
        levelLinksGenerate : function () {
            var item = null;
            $(this.levelLinksContainer).html('');
            for (var i = 1; i <= this.levelsAmount; i++)
                $(this.levelLinksContainer).append(
                    "<a href='javascript:void(0)' data-level='"+i+"' class='list-group-item " + (i <= this.level ? testLinkActive : testLinInactive) + "'>Level "+i+"</a>"
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
            $(self.levelLinksContainer).parent().slideUp('fast', function () {
                $(self.rememberContainer).parent().slideDown('fast');
            });
            return this.images.slice(0, this.imagesToRemember);
        },
        /**
         *
         */
        getAllImages : function () {
            var self = this;
            $(this.imagesOutContainer).html("");
            this.shuffle();
            this.images.forEach(function (item) {
                $(self.imagesOutContainer).append(
                    "<img src = '" + item.item + "' data-id='" + item.id + "'>"
                );
            });
            $('.img-left').text(this.rememberArray.length);
            var count = this.rememberArray.length;

            $(self.imagesOutContainer).delegate('img', 'click', function() {
                if (self.rememberArray.indexOf(self.toInt($(this).attr('data-id'), 0)) != -1) {
                    if ($(this).hasClass('check')) return false;
                    $(this).toggleClass('check');
                    var snd = new Howl({
                        urls : ['audio/check.mp3'],
                        volume : 0.5
                    });
                    snd.play();
                    console.log(count);

                    $('.img-left').text((--count));
                    if (count == 0) {
                        $('.modal').modal('show');
                        $(self.imagesOutContainer).parent().slideUp('fast', function () {
                            self.nextLevel();
                            $(self.levelLinksContainer).parent().slideDown('fast');
                        });
                    }
                } else {
                    $(this).toggleClass('uncheck');
                }

            });
        }
    };
    /** makes class global */
    window.Test = Test || {};
} (jQuery, window, document) );