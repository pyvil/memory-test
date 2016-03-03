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

        'levelContainerClass'       : '.mt-level-container',
        'imageContainerClass'       : '.mt-image-container',
        'rememberContainerClass'    : '.mt-remember-container',

        'startButton'               : '.mt-start-test',

        'images'                    : []
    };

    var
        // all uploaded images
        allImages                   = [],
        // shuffle images which used to display to user
        usedImages                  = [],
        // current level
        level                       = 1,
        // current count images user have to remember
        imagesToRemember            = 2,
        // all levels which is available
        levelsAmount                = 10,
        // link on level list container
        levelContainerLink          = null,
        // container where displaying all images
        imageContainerLink          = null,
        // container where displaying items to remember
        rememberContainerLink       = null,
        // array of images user have to find on current level
        rememberArray               = [],
        // current user position
        currentLink                 = null,
        // all messages from json data file
        messages                    = null,
        // all images size from json data file
        imagesSize                  = null,
        //
        jsonData                    = Helper.parseJSON('/data/messages.json');

    /**
     * Display fatal error
     *
     * @return {void}
     */
    var fatalError = function() {
        $('body').append(
            '<div style="background: rgba(255,255,255,0.7); position:fixed;left: 0; top: 0; width: 100%; height: 100%; z-index: 9999">' +
                '<div style="position: fixed; width: 300px; padding: 10px; color: #444; font-size: 16px; top: 40%; left: 40%">' +
                'Sorry but site in templrary unavailable...<br>' +
                'We now working on the problem.<br>' +
                'Try to <a href="javascript:location.reload()" style="color: #222;">refresh </a> this page.' +
                '</div>' +
            '</div>'
        );
    };

    /**
     * Initialize module
     *
     * @returns init
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
            fatalError();
            return false;
        }

        allImages                   = appDefaults.images;
        level                       = Helper.toInt(appDefaults.level);
        imagesToRemember            = Helper.toInt(appDefaults.imagesToRemember);
        levelsAmount                = Helper.toInt(appDefaults.amountLevels);
        levelContainerLink          = appDefaults.levelContainerClass;
        imageContainerLink          = appDefaults.imageContainerClass;
        rememberContainerLink       = appDefaults.rememberContainerClass;

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
     * @param arr
     * @returns {*}
     */
    this.getRandomText = function (arr) {
        this.shuffle(arr);
        var rand = Math.floor(Math.random() * (arr.length - 1));
        return arr[rand];
    };

    /**
     *
     * @returns {number}
     */
    this.getLevel = function () {return level;};
    /**
     *
     * @param _level
     * @returns {this}
     */
    this.setLevel = function(_level) {level = _level; return this};

    /**
     *
     */
    var nextLevel = function () {
        redirect($(rememberContainerLink).parent());
        this.setLevel(level + 1 == levelsAmount + 1 ? 1 : level + 1);
        startLevel();
    };

    /**
     *
     */
    var prevLevel = function () {
        this.setLevel( level - 1 == 0 ? levelsAmount : level - 1);
        redirect($(rememberContainerLink).parent());
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

    /**
     * Start the level
     * After user click on some level
     *
     * @return {void}
     */
    var startLevel = function () {
        // make container with images user have to remember empty
        $(rememberContainerLink).html('');
        imagesToRemember = this.getLevel() * 2;
        // clear array of images link
        rememberArray = [];
        var listImagesToRemember = getImagesToRemember();
        var size = imagesSize[ this.getLevel() ].split('x');
        // add images user have to remember on current level
        listImagesToRemember.forEach(function (item) {
            $(rememberContainerLink).append(
                "<img src = '" + item.item + "' data-id='" + item.id + "' style='width: " + size[0] + "px; height: " + size[1] + "px;' id = '" + id + "'>"
            );
            rememberArray.push(item.id);
        });
    };



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