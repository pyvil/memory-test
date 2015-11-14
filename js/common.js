/**
 * @category Common
 * @package Memory_test
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
(function ($, window, document) {
    "use strict";

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
         * shuffle current image sequence
         * @param arr
         */
        shuffle : function (arr) {
            for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        },

        /**
         *
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
            this.level += 1;
            this.imagesToRemember *= 2;
            this.levelLinksGenerate();
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
            imgs.forEach(function (item) {
                $(self.rememberContainer).append (
                    "<img src = '" + item.item + "' data-id='" + item.id + "'>"
                );
                // push `id`s of elements user have to remember
                self.rememberArray.push(item.id);
            });
            self.redirect($(self.rememberContainer).parent());
            $('.start-test').bind('click', function () {
                self.getAllImages();
                self.redirect($(self.imagesOutContainer).parent());
                $('body').attr('id', 'images');
            });
        },
        /**
         * Generate list of levels
         */
        levelLinksGenerate : function () {
            $('body').attr('id', 'levels');
            var item = null;
            $(this.levelLinksContainer).html('');
            console.log(this.levelsAmount);
            for (var i = 1; i <= this.levelsAmount; i++)
                $(this.levelLinksContainer).append(
                    "<a href='javascript:void(0)' data-level='"+i+"'>"+i+"</a>"
                );
            var self = this;
            // links click
            $(this.levelLinksContainer).delegate('a', 'click', function (e) {
                //if ($(this).hasClass(testLinInactive)) return false;
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
            this.images.forEach(function (item) {
                $(self.imagesOutContainer).append(
                    "<img src = '" + item.item + "' data-id='" + item.id + "'>"
                );
            });
            var count = this.rememberArray.length;
            console.log(count);
            $(self.imagesOutContainer).undelegate('img', 'click');
            $(self.imagesOutContainer).delegate('img', 'click', function() {
                var time = 5000;
                if (self.rememberArray.indexOf(self.toInt($(this).attr('data-id'), 0)) != -1) {
                    if ($(this).hasClass('check')) return false;

                    $(this).addClass('check');
                    self.sound('check');
                    --count;
                    console.log(count);

                    if (count == 0) {
                        self.modal
                            .setBlockBackground('#56caef')
                            .setText(self.getRandomText(self.failText))
                            .popup()
                            .closeAfter(time);
                        self.redirect($(self.levelLinksContainer).parent(), time);
                        var iter  = 0;
                        var close = function () {
                            if (iter == (time / 1000)) {
                                self.levelLinksGenerate();
                            } else {
                                iter++;
                                setTimeout(close, 1000);
                            }
                        };
                        close();
                    }
                } else {
                    if ($(this).hasClass('uncheck')) return false;

                    $(this).addClass('uncheck');
                    //self.sound('fail');
                    self.sound('fail_message');
                    self.modal
                        .setBlockBackground(null)
                        .setText(self.getRandomText(self.failText))
                        .popup()
                        .closeAfter(time);
                    self.redirect($(self.levelLinksContainer).parent(), time);
                    var iter  = 0;
                    var close = function () {
                        if (iter == (time / 1000)) {
                            self.levelLinksGenerate();
                        } else {
                            iter++;
                            setTimeout(close, 1000);
                        }
                    };
                    close();
                }
            });
        },

        /**
         *
         * @param url
         */
        redirect : function (url, waitTime) {
            waitTime = waitTime || 0;
            var self = this;
            $(this.currentPage).delay(waitTime).slideUp('fast', function () {
                $(url).slideDown('fast');
                self.currentPage = $(url);
            });
        },

        /**
         * When smth happened in app we add a sound
         */
        sound : function (name) {
            var snd = new Howl({
                urls : ['audio/' + name +'.wav'],
                volume : 0.2
            });
            snd.play();
        },

        /**
         * Collect all things app should work with
         * @param param
         */
        start : function (param) {
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
             *
             * @type {Modal}
             */
            this.modal = new Modal();

            /**
             * Success texts for popup
             * select random
             * @type {string[]}
             */
            this.successText = [
                'the best!',
                'good job!',
                'it was a success',
                'you\'re right!',
                'well done',
                'this is your moment',
                'absolutely correct',
                'you got it right'
            ];

            /**
             * Fail texts for popup
             * @type {string[]}
             */
            this.failText = [
               'don\'t get upset about it!',
                'next time lucky',
                'pull yourself together',
                'believe in yourself',
                'better luck next time',
                'don\'t give up and chase your dream!',
                'cheer up!',
                'don\'t give up so soon, try again'
            ];

            /**
             *
             * @type {XML|*}
             */
            this.currentPage = $(this.levelLinksContainer).parent();
        }
    };
    // extends from Helper class
    $.extend(Test.prototype, Helper.prototype);
    /** init Test class in global scope */
    window.Test = Test || {};

} (jQuery, window, document) );