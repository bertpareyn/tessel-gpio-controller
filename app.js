/*
 * The MIT License (MIT)
 *
 * Copyright(c) 2016 Bert Pareyn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var tessel = require('tessel');
var bunyanFormatter = require('bunyan-format');
var bunyanOutStream = bunyanFormatter({ outputMode: 'short' });
var log = require('bunyan').createLogger({
    name: 'app',
    stream: bunyanOutStream
});

var buttonController = require('./controller/buttons');
var ledController = require('./controller/leds');
var config = require('./config.json');

// Show loading indication on the Tessel
ledController.startLoadIndication(3);

// Initialize all configured controller buttons
buttonController.initButtons(config, function(err) {
    if (err) {
        log.error(err);
    }

    ledController.finishLoadIndication();
    ledController.turnLedsOff();

    var i = 0;
    var toggleLedsInterval = setInterval(function() {
        ledController.toggleLeds();
        i++;
        if (i === 10) {
            clearInterval(toggleLedsInterval);
            if (tessel.led && tessel.led.length) {
                tessel.led[3].on();
            }
        }
    }, 200);

    log.info('Controller ready to go');
});

