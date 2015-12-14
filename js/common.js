/**
 * @category Common
 * @package Memory_test
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
(function ($, window, document) {
    "use strict";

    /**
     * Global class variables
     * @type {number}
     */
    var
    // volume sounds in app
        volume                      = 0.8,
        waitTime                    = 2000,
        failBackgroundColor         = '#56caef',
        successBackgroundColor      = '#7d77b7';

    /**
     * Test generating constructor
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
        this.start(param);
        this.parameters = param;

        this.levelLinksGenerate();
    };

    /**
     * Test generating function initialization
     * @type {{toInt: Function, toObj: Function, shuffle: Function, getLevel: Function, nextLevel: Function, setLevel: Function, levelLinksGenerate: Function, getImagesToRemember: Function, getAllImages: Function, successSound: Function, failSound: Function, start: Function}}
     */
    Test.prototype = {

        /**
         * Collect all things app should work with
         * @param param
         */
        start : function (param) {
            /**
             * All images
             * @type {Array}
             */
            var allImages = [];
            // makes an object of each image, added `path` and `id`
            param.images.forEach(function (item, index) {
                allImages.push({'id' : index, 'item' : item});
            });
            // shuffle all images
            this.shuffle(allImages);
            /**
             * Array with images we work with
             * @type {Array.<T>}
             */
            this.images = allImages.slice(0, 42);

            /**
             * Current level
             * @type {number}
             */
            this.level = this.toInt(param.level, 1);
            /**
             * Amount of images user has to remember on each level
             * @type {number}
             */
            this.imagesToRemember = this.toInt(param.imagesToRemember, 2);
            /**
             * Level amount
             * @type {number}
             */
            this.levelsAmount = this.toInt(param.levelsAmount, 10);
            /**
             * Container with level links
             * @type {Object}
             */
            this.levelLinksContainer = this.toObj(param.levelLinksContainer, '.pyvil_level_list');
            /**
             * Container where displaying all images
             * @type {Object}
             */
            this.imagesOutContainer = this.toObj(param.imagesOutContainer, '.pyvil_images_list');
            /**
             * Container where displaying items to remember
             * @type {Object}
             */
            this.rememberContainer = this.toObj(param.rememberContainer, '.pyvil_remember_list');

            /**
             * Array of images user have to remember
             * @type {Array}
             */
            this.rememberArray = [];

            /**
             * Modal instance
             * @type {Modal}
             */
            this.modal = new Modal();

            /**
             * Success texts for popup
             * select random
             * @type {string[]}
             */
            this.successText = [
                'well done',
                'this is your<br>moment',
                'absolutely<br>correct',
                'you got it<br>right',
                'master!',
                'you rock!',
                'fantastic!',
                'you\'re right!',
            ];

            /**
             * Fail texts for popup
             * @type {string[]}
             */
            this.failText = [
                'better luck<br>next time',
                'don\'t give up<br>and<br>chase your dream',
                'cheer up!',
                'don\'t give up<br>so soon<br>try again',
                'try again,<br>baby!',
                'free<br>your mind',
                'stay cool,<br>do it again!',
                'use<br>your mind!',
            ];

            /**
             * Text display when user successfully finish 10-th level
             * @type {string}
             */
            this.coolText = 'you\'re on<br>target!<br>your memory<br>is perfect!';

            /**
             *
             * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string}}
             */
            this.imagesLevelSize = {
                1 : '260x260',
                2 : '250x250',
                3 : '210x210',
                4 : '210x210',
                5 : '210x210',
                6 : '190x190',
                7 : '165x165',
                8 : '150x150',
                9 : '190x190',
                10 : '120x120'
            };

            /**
             * Current page link
             * @type {XML|*}
             */
            this.currentPage = $(this.levelLinksContainer).parent();
        },

        /**
         * shuffle current image sequence
         * @param arr
         */
        shuffle : function (arr) {
            for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        },

        /**
         * Get random value from array by index
         * @param arr
         * @returns {*}
         */
        getRandomText : function (arr) {
            this.shuffle(arr);
            var rand = Math.floor(Math.random() * (arr.length - 1));
            return arr[rand];
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
            this.setLevel(this.getLevel() + 1);
            $('body').attr('id', '');
        },

        /**
         * Start screen image
         */
        startScreen : function () {
            this.center_overlay_modal({obj : '.screen'});
            $('.shadow-screen').fadeIn('slow', function () {
                $('.screen').fadeIn('slow', function () {
                    $('.shadow-screen, .screen').bind('touchmove', function (e) {
                        $('.screen').fadeOut('slow', function () {
                            $('.shadow-screen').fadeOut('slow');
                        });
                    });

                    $('.shadow-screen, .screen').bind('mousemove', function (e) {
                        $('.screen').fadeOut('slow', function () {
                            $('.shadow-screen').fadeOut('slow');
                        });
                    });
                });
            });
        },

        /**
         * set level
         * @param {number|string} level
         */
        setLevel : function (level) {
            this.start(this.parameters);
            this.level = this.toInt(level, 1);

            this.imagesToRemember = this.level * 2;
            var imgs = this.getImagesToRemember();

            this.rememberArray = [];

            $(this.rememberContainer).html("");
            var self = this;
            var size = this.imagesLevelSize[this.getLevel()].split('x');
            var id = 'obs-' + this.getLevel();
            imgs.forEach(function (item) {
                $(self.rememberContainer).append (
                    "<img src = '" + item.item + "' data-id='" + item.id + "' style='width: " + size[0] + "px; height: " + size[1] + "px;' id = '" + id + "'>"
                );
                // push `id`s of elements user have to remember
                self.rememberArray.push(item.id);
            });
            self.redirect($(self.rememberContainer).parent());
            $('.start-test').unbind();
            $('.start-test').bind('click', function () {
                self.getAllImages();
                self.sound('click');
                self.redirect($(self.imagesOutContainer).parent());
                $('body').attr('id', 'images');
            });
        },
        /**
         * Generate list of levels
         */
        levelLinksGenerate : function () {
            this.startScreen();
            $('body').attr('id', 'levels');
            $(this.levelLinksContainer).html('');
            console.log(this.levelsAmount);
            for (var i = 1; i <= this.levelsAmount; i++)
                $(this.levelLinksContainer).append(
                    "<a href='javascript:void(0)' data-level='" + i + "' id='level-" + i + "'>" + i + "</a>"
                );
            var self = this;
            //self.center_overlay_modal({obj : $(self.levelLinksContainer).parent()});
            // links click
            $(self.levelLinksContainer).undelegate();
            $(self.levelLinksContainer).delegate('a', 'click', function (e) {
                self.sound('click');
                self.setLevel($(this).attr('data-level'));
                $('body').attr('id', '');
            });
        },
        /**
         * Get an array of images you have to remember
         * @returns {Array.<T>}
         */
        getImagesToRemember : function () {
            this.shuffle(this.images);
            return this.images.slice(0, this.imagesToRemember);
        },
        /**
         * Display all image items we have and test start! :3
         */
        getAllImages : function () {
            $(this.imagesOutContainer).html("");
            this.shuffle(this.images);
            var self = this;
            var i = 1;
            this.images.forEach(function (item) {
                var _class = '';// ((i % 7 == 0) || (i % 7 == 1)) ? '' : 'all-img-position';
                $(self.imagesOutContainer).append(
                    "<img src = '" + item.item + "' data-id='" + item.id + "' class = '" + _class + "'>"
                );
                i++;
            });
            var count = this.rememberArray.length,
                id    = 0;
            $(self.imagesOutContainer).undelegate('img', 'click');
            $(self.imagesOutContainer).delegate('img', 'click', function() {
                if (self.rememberArray.indexOf(self.toInt($(this).attr('data-id'), 0)) != -1) {
                    if ($(this).hasClass('check')) return false;

                    $(this).addClass('check');
                    self.sound('check');
                    --count;
                    console.log(count);

                    if (count == 0) {
                        id = setTimeout(function () {self.sound('success_message');}, 100);
                        var text = self.getLevel() == 10 ? self.coolText : self.getRandomText(self.successText);
                        self.modal
                            .setBlockBackground(successBackgroundColor)
                            .setText(text)
                            .popup()
                            .closeAfter(waitTime);
                        if (self.getLevel() == 10) {
                            self.redirect($(self.levelLinksContainer).parent(), waitTime);
                            self.waitForAndRedirect(waitTime, 'home');
                        } else {
                            self.redirect($(self.rememberContainer).parent(),  waitTime);
                            self.waitForAndRedirect(waitTime, 'next');
                        }
                    }
                } else {
                    if ($(this).hasClass('uncheck')) return false;

                    $(this).addClass('uncheck');
                    self.sound('fail');
                    id = setTimeout(function () {self.sound('fail_message');}, 400);
                    self.modal
                        .setBlockBackground(failBackgroundColor)
                        .setText(self.getRandomText(self.failText))
                        .popup()
                        .closeAfter(waitTime);
                    self.redirect($(self.levelLinksContainer).parent(), waitTime);
                    self.waitForAndRedirect(waitTime, 'home');
                }
            });
        },

        /**
         * Redirect to other block
         * @param url
         * @param time
         */
        redirect : function (url, time) {
            time = time || 0;
            var self = this;
            $(self.currentPage).delay(time).slideUp('fast', function () {
                $(url).slideDown('fast', function (e) {
                    if ( $(url).attr('id') == $(self.rememberContainer).parent().attr('id') ) {
                        self.center_overlay_modal({obj : $(url)})
                    }
                    self.currentPage = $(url);
                });
            });
        },

        /**
         *
         * @param  time
         * @param where
         */
        waitForAndRedirect : function (time, where) {
            where = where || 'home';
            var id = 0;
            var self = this;
            switch (where) {
                case 'next' :
                    id = setTimeout(function() {self.nextLevel();}, time);
                    break;
                default :
                    id = setTimeout(function() {self.levelLinksGenerate();}, time);
                    break;
            }
        },

        /**
         * When smth happened in app we add a sound
         */
        sound : function (name) {
            var snd = new Howl({
                urls : ['audio/' + name +'.wav', 'audio/' + name +'.ogg'],
                volume : volume
            });
            snd.play();
        }
    };
    // extends from Helper class
    $.extend(Test.prototype, Helper.prototype);
    /** init Test class in global scope */
    window.Test = Test || {};

} (jQuery, window, document) );