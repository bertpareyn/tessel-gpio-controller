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

try {
    var tessel = require("tessel");
} catch(e) {
    console.error("Running locally, using tessel-mocks");
    var Tessel = require('tessel-mocks');
    tessel = new Tessel();
}

var toggleLeds = exports.toggleLeds = function() {
    // Don't attempt to access leds when none are found
    /* istanbul ignore if */
    if (!tessel.led || !tessel.led.length) {
        return;
    }

    tessel.led[0].toggle();
    tessel.led[1].toggle();
    tessel.led[2].toggle();
    tessel.led[3].toggle();
};

var turnLedsOff = exports.turnLedsOff = function() {
    // Don't attempt to access leds when none are found
    /* istanbul ignore if */
    if (!tessel.led || !tessel.led.length) {
        return;
    }

    tessel.led[0].off();
    tessel.led[1].off();
    tessel.led[2].off();
    tessel.led[3].off();
};

var turnLedsOn = exports.turnLedsOn = function() {
    // Don't attempt to access leds when none are found
    /* istanbul ignore if */
    if (!tessel.led || !tessel.led.length) {
        return;
    }

    tessel.led[0].on();
    tessel.led[1].on();
    tessel.led[2].on();
    tessel.led[3].on();
};

var loadFinished = false;
var finishLoadIndication = exports.finishLoadIndication = function() {
    loadFinished = true;
};

var startLoadIndication = exports.startLoadIndication = function(ledId) {
    // Don't attempt to access leds when none are found
    /* istanbul ignore if */
    if (!tessel.led || !tessel.led.length) {
        return;
    }

    tessel.led[ledId].toggle(function() {
        /* istanbul ignore else */
        if (!loadFinished) {
            setTimeout(function() {
                if (!ledId) {
                    ledId = 3;
                } else {
                    ledId--;
                }

                /* istanbul ignore else */
                if (!loadFinished) {
                    startLoadIndication(ledId);
                } else {
                    ledController.turnLedsOff();
                }
            }, 100);
        }
    });
};