
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
        currentLink                 = null;

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
     * Setup test
     *
     * @param {object} config
     *
     * @returns this
     */
    this.setup = function (config) {
        if ( typeof config !== 'object' ) return null;
        $.extend( true, appDefaults, config );
    };


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
            return null;
        }

        allImages                   = appDefaults.images;
        level                       = Helper.toInt(appDefaults.level);
        imagesToRemember            = Helper.toInt(appDefaults.imagesToRemember);
        levelsAmount                = Helper.toInt(appDefaults.amountLevels);
        levelContainerLink          = appDefaults.levelContainerClass;
        imageContainerLink          = appDefaults.imageContainerClass;
        rememberContainerLink       = appDefaults.rememberContainerClass;

        return this;
    }


    return init();
});