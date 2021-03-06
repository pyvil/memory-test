/**
 * Helper
 *
 * @category Components
 * @package  Components_Helper
 * @author Vitaliy Pyatin <mail.pyvil@gmail.com>
 */
var Helper = {
    /**
     * Helper: convert variable to integer value
     *
     * @param _var
     *
     * @returns {number}
     */
    toInt : function ( _var ) {
        if (_var === null || _var === undefined) return 0;
        var data = _var;
        var pattern = /\d+/g;

        var match = data.match( pattern );

        if (!match) return 0;
        match = match.join('');
        return parseInt( match, 10 );
    },

    /**
     * Put block in the center of the screen
     *
     * @param {object} obj
     * @param {string} [dir]
     *
     * @return void
     */
    centerObject : function(obj, dir){
        dir = dir || 'both';
        if ( dir == 'both' || dir == 'left' ) {
            $(obj).css( "left", Math.max( 0, ( ( $(window).width() - $(obj).outerWidth() )  / 2 ) ) + "px" );
        }
        if ( dir == 'both' || dir == 'right' ) {
            $(obj).css( "top", Math.max( 0, ( ($(window).height() - $(obj).outerHeight() ) / 2 ) ) + "px" );
        }
    },

    /**
     * Check device on mobile
     * @returns {boolean}
     */
    isMobile : function () {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },

    /**
     * Replace all stuff like :stuff etc in string with given object (associative array)
     * e.g. :
     *          <code>'Lorem :string1 dolor :string2', {':string1' : 'ipsum', ':string2' : 'amet'}</code>
     *          Will return this :
     *          'Lorem ipsum dolor amet'
     *
     * All stuff you want to replace must start with ':' and must be exist with some value
     * in given object otherwise it will display the same way as in the string
     *
     * The source is here:
     * @see http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
     *
     * @param {string} format string you want to format
     * @param {object} args   object to replace with
     *
     * @returns {string}
     */
    format : function ( format, args ) {
        if( typeof args !== 'object' ) return format;
        return format.replace(/:(\w+)/g, function( match ) {
            return typeof args[ match ] != 'undefined' ? args[ match ] : match;
        });
    },

    /**
     * Get random string
     *
     * @param {number} [n]  number from 1 and so on
     * @returns {*|number}
     */
    getRandomString : function( n ) {
        n = n || 10;
        var string = "";
        while(string.length < n && n > 0){
            var r = Math.random();
            string += (
                        r < 0.1 ?
                            Math.floor( r * 100 ) :
                            String.fromCharCode( Math.floor(r  * 26 ) + ( r > .5 ? 97 : 65 ) )
                      );
        }
        return string;
    },
    /**
     * Parse JSON file
     *
     * @param {string} file
     * @returns {array}
     */
    parseJSON : function (file) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlHttp = new XMLHttpRequest();
        var data = null;

        xmlHttp.open('GET', 'file:' + file, false);
        xmlHttp.send();

        try{
            if(xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                data = JSON.parse(xmlHttp.responseText);
            }
        }catch ( error ) {
            console.log('error occur while processing: ' + error.message);
        }

        return data;
    },
    /**
     * shuffle current image sequence
     * @param arr
     */
    shuffle : function (arr) {
        arr = arr.slice();
        for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    },

    /**
     * Merge 2 objects
     *
     * @param {object} obj1
     * @param {object} obj2
     * @returns {object}
     */
    merge : function (obj1, obj2) {
        for(var attr in obj2) {
            obj1[attr] = obj2[attr];
        }
        return obj1;
    },

    /**
     * Display fatal error
     *
     * @return {void}
     */
    fatalError : function() {
        $('body').append(
            '<div style="background: rgba(255,255,255,0.7); position:fixed;left: 0; top: 0; width: 100%; height: 100%; z-index: 9999">' +
            '<div style="position: fixed; width: 300px; padding: 10px; color: #444; font-size: 16px; top: 40%; left: 40%">' +
            'Sorry but site in temporary unavailable...<br>' +
            'We now working on the problem.<br>' +
            'Try to <a href="javascript:location.reload()" style="color: #222;">refresh </a> this page.' +
            '</div>' +
            '</div>'
        );
    }
};

if (typeof define === 'function' && define.amd) {
    define('help', ['jquery', 'xmlhttprequest'], function($) {
        return Helper;
    })
}

if(typeof module != 'undefined') {
    module.exports = Helper;
} else {
    window.Helper = Helper;
}