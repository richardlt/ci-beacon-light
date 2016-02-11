var StatusConstant = require('../constants/status.constant.js');

var _animationInterval = null;
var _status = StatusConstant.UNKNOWN;
var _readyCallback = null;

module.exports = {

    init: function() {
        if (_readyCallback) {
            _readyCallback();
        }
        return this;
    },

    startAnimation: function() {
        console.log('start animation');
        return this;
    },

    stopAnimation: function() {
        console.log('stop animation');
        return this;
    },

    setStatus: function(status) {
        if (_status !== status) {
            console.log('set status to ' + status);
            _status = status;
        }
        return this;
    },

    onReady: function(callback) {
        _readyCallback = callback;
        return this;
    }

};
