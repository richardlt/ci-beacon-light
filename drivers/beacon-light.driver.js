var CiTrafficlightDriver = require('ci-trafficlight-driver');

var StatusConstant = require('../constants/status.constant.js');

var _animationInterval = null;
var _status = StatusConstant.UNKNOWN;
var _readyCallback = null;
var _driver = null;

module.exports = {

    init: function () {
        _driver = CiTrafficlightDriver.init(500);
        if (_readyCallback) {
            _readyCallback();
        }
        return this;
    },

    startAnimation: function () {
        _driver.setBlink(true);
        return this;
    },

    stopAnimation: function () {
        _driver.setBlink(false);
        // Set the color based on current status to avoid light shutdown when stop blinking
        var color = this.statusToColor(_status);
        if (color) {
            _driver.setColor(color);
        }
        return this;
    },

    setStatus: function (status) {
        if (_status !== status) {
            _status = status;
            var color = this.statusToColor(_status);
            if (color) {
                _driver.setColor(color);
            }
        }
        return this;
    },

    onReady: function (callback) {
        _readyCallback = callback;
        return this;
    },

    statusToColor: function (status) {
        if (status == StatusConstant.SUCCESS) { return "green"; }
        if (status == StatusConstant.UNSTABLE) { return "orange"; }
        if (status == StatusConstant.FAILURE) { return "red"; }
        return "";
    }

};
