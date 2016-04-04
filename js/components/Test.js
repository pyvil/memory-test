/**
 * Generate tests
 *
 * @category Components
 * @package Components_Test
 *
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
var Test = (function() {
    var appDefaults = {
        'volume'                    : 0.8,
        'waitTime'                  : 2000,
        'failBackgroundColor'       : '#56caef',
        'successBackgroundColor'    : '#7d77b7',

        'amountLevels'              : 10,
        'imagesToRemember'          : 2,
        'level'                     : 1,
        'imagesToShow'              : 42,

        'levelContainerClass'       : '.mt-level-container',
        'imageContainerClass'       : '.mt-image-container',
        'rememberContainerClass'    : '.mt-remember-container',

        'startButton'               : '.mt-start-test',

        'images'                    : []
    };

    var
        /**
         * all uploaded images
         *
         * @type {Array}
         */
        allImages                   = [],

        /**
         * shuffle images which used to display to user
         *
         * @type {Array}
         */
        usedImages                  = [],

        /**
         * current level
         *
         * @type {number}
         */
        level                       = 0,

        /**
         * current count images user have to remember
         *
         * @type {number}
         */
        imagesToRemember            = 0,

        /**
         * all levels which is available
         *
         * @type {number}
         */
        levelsAmount                = 0,

        /**
         * Images to show
         *
         * @type {number}
         */
        imagesToShow                = 0,

        // /**
        //  * link on level list container
        //  *
        //  * @type {object}
        //  */
        // levelContainerLink          = null,
        //
        // /**
        //  * container where displaying all images
        //  *
        //  * @type {object}
        //  */
        // imageContainerLink          = null,
        //
        // /**
        //  * container where displaying items to remember
        //  *
        //  * @type {object}
        //  */
        // rememberContainerLink       = null,

        /**
         * array of images user have to find on current level
         *
         * @type {array}
         */
        rememberArray               = [],

        /**
         * current user position
         * 
         * @type {object}
         */
        currentLink                 = null,

        /**
         * all messages from json data file
         *
         * @type {string}
         */
        messages                    = null,

        /**
         * all images size from json data file
         *
         * @type {number}
         */
        imagesSize                  = 0,

        // /**
        //  * start btn
        //  *
        //  * @type {null}
        //  */
        // startButton                 = null,

        /**
         * JSON data with messages
         *
         * @type {*|array}
         */
        jsonData                    = Helper.parseJSON('/data/messages.json');

    /**
     * Initialize module
     *
     * @returns {void|null}
     */
    var init = function () {
        var youShallNotPass = false;
        for(var item in appDefaults) {
            if (Array.isArray(appDefaults[item]) && (appDefaults[item] == null || appDefaults[item] == []) ) {
                youShallNotPass = true;
                break;
            }
            if ((typeof appDefaults[item] == 'object') && (appDefaults[item] == null || appDefaults[item] == 'undefined') ) {
                youShallNotPass = true;
                break;
            }
            if((typeof appDefaults[item] == 'number') && (appDefaults[item] == null || appDefaults[item] == 'undefined') && (appDefaults[item] <= 0)){
                youShallNotPass = true;
                break;
            }
        }

        if(youShallNotPass) {
            Helper.fatalError();
            return null;
        }

        initVariables();
    };

    /**
     * Variables initialization
     *
     * @return void
     */
    var initVariables = function() {
        allImages                   = appDefaults.images;
        level                       = Helper.toInt(appDefaults.level);
        imagesToRemember            = Helper.toInt(appDefaults.imagesToRemember);
        levelsAmount                = Helper.toInt(appDefaults.amountLevels);
        // levelContainerLink          = appDefaults.levelContainerClass;
        // imageContainerLink          = appDefaults.imageContainerClass;
        // rememberContainerLink       = appDefaults.rememberContainerClass;
        // startButton                 = appDefaults.startButton;

        messages                    = jsonData.messages;
        imagesSize                  = jsonData.imagesSize;

        // makes an object of each image, added `path` and `id`
        // in array usedImages - array of images links for using
        allImages.forEach(function (item, index) {
            usedImages.push({'id' : index, 'item' : item});
        });

        usedImages                  = Helper.shuffle(usedImages);
        usedImages                  = usedImages.slice(0, 42);
    };

    /**
     * Setup test
     *
     * @param {object} [config]
     *
     * @returns this
     */
    this.setup = function (config) {
        config = config || {};
        if ( typeof config !== 'object' ) return null;
        appDefaults = Helper.merge(appDefaults, config);
        init();
    };

    /**
     * Redirect to some block (means hide current and show given)
     *
     * TODO: do generic method
     *
     * @param link
     */
    var redirect = function (link) {
        $(currentLink).hide('fast', function() {
            $(url).show('fast', function () {
                if ($(link).attr('id') == $(rememberContainerLink).parent().attr('id')) {
                    Helper.centerObject($(url));
                }
                currentLink = $(url);
            })
        })

    };

    /**
     * Get random value from array by index
     *
     * @param {array} arr
     *
     * @returns {array}
     */
    this.getRandomText = function (arr) {
        this.shuffle(arr);
        var rand = Math.floor(Math.random() * (arr.length - 1));
        return arr[rand];
    };

    /**
     * Get current level
     *
     * @returns {number}
     */
    this.getLevel = function () {
        return level;
    };

    /**
     * Set current level
     *
     * @param {number} _level
     *
     * @returns {this}
     */
    this.setLevel = function(_level) {
        level = _level;
        return this
    };

    /**
     * Set next level
     *
     *  @return void
     */
    var nextLevel = function () {
        //redirect($(rememberContainerLink).parent());
        this.setLevel(level + 1 == levelsAmount + 1 ? 1 : level + 1);
        startLevel();
    };

    /**
     * Set prev level
     *
     * @return void
     */
    var prevLevel = function () {
        this.setLevel( level - 1 == 0 ? levelsAmount : level - 1);
        //redirect($(rememberContainerLink).parent());
        startLevel();
    };

    /**
     * Get list of images user have to remember
     *
     * @returns {Array.<T>}
     */
    var getImagesToRemember = function () {
        usedImages = Helper.shuffle(usedImages);
        return usedImages.slice(0, level)
    };

    // /**
    //  * Clean click events e.g. start button, click on level
    //  *
    //  * @returns {void}
    //  */
    // var clearEvents = function() {
    //     $(startButton).unbind();
    //     $(levelContainerLink).undelegate('a', 'click');
    //     $(imageContainerLink).undelegate('img', 'click');
    // };

    // this.getImagesList = function () {
    //     $(imageContainerLink).html('');
    //     usedImages = Helper.shuffle(usedImages);
    //     usedImages.forEach(function (item) {
    //         "<img src = '" + item.item + "' data-id='" + item.id + "'>"
    //     });
    //     var count = usedImages.length;
    //     var showMessageTimer = null;
    //     $(imageContainerLink).delegate('img','click')
    // };

    // /**
    //  * Start the level
    //  * After user click on some level
    //  *
    //  * @return {void}
    //  */
    // var startLevel = function () {
    //     // make container with images user have to remember empty
    //     $(rememberContainerLink).html('');
    //     imagesToRemember = this.getLevel() * 2;
    //     // clear array of images link
    //     rememberArray = [];
    //     var listImagesToRemember = getImagesToRemember();
    //     var size = imagesSize[ this.getLevel() ].split('x');
    //     // add images user have to remember on current level
    //     listImagesToRemember.forEach(function (item) {
    //         $(rememberContainerLink).append(
    //             "<img src = '" + item.item + "' data-id='" + item.id + "' style='width: " + size[0] + "px; height: " + size[1] + "px;' id = '" + id + "'>"
    //         );
    //         rememberArray.push(item.id);
    //     });
    //     $(startButton).bind('click', function () {
    //         clearEvents();
    //         getImagesList();
    //         sound('click');
    //         redirect(imageContainerLink);
    //     });
    // };



    return this;
})();

if (typeof define === 'function' && define.amd) {
    define('test', ['../tests/node_modules/jquery/dist/jquery', 'helper'], function() {
        return Test;
    })
}

if(typeof module != 'undefined') {
    module.exports = Test;
} else {
    window.Test = Test;
}