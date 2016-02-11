var JenkinsStatusShaker = require('jenkins-status-shaker'),
    Optimist = require('optimist');

var argv = Optimist.argv;

var Config = require('./configs/' + (argv.config ? argv.config : 'default.config.json')),
    BeaconLightDriver = require('./drivers/beacon-light.driver.js');

var shaker = JenkinsStatusShaker.init(Config.url, Config.username, Config.password).setJobs(Config.jobs).setViews(Config.views);

var lastStatus = {
    working: false
};

shaker.onStatusReceived(function(status) {
    BeaconLightDriver.setStatus(status.status);
    if (status.working && !lastStatus.working) {
        BeaconLightDriver.startAnimation();
    } else if (!status.working && lastStatus.working) {
        BeaconLightDriver.stopAnimation();
    }
    lastStatus = status;
});

BeaconLightDriver.onReady(function() {
    setInterval(function() {
        console.log('test');
        shaker.getStatus();
    }, Config.refreshDelay);
}).init();
