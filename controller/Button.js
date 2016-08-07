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
var t2Button = require('t2-button');
var bunyanFormatter = require('bunyan-format');
var bunyanOutStream = bunyanFormatter({ outputMode: 'short' });
var log = require('bunyan').createLogger({
    name: 'app',
    stream: bunyanOutStream
});
var Pusher = require('pusher');

/**
 * Define and create a button component
 *
 * @param {Object}    config    Configuration for the button to initialise
 */
var Button = exports.Button = function(config) {
    this.id = config.id;
    this.name = config.name;
    this.port = config.port;
    this.pin = config.pin;
    this.events = config.events;
    this.led = config.led;
    this.pusher = new Pusher(config.pusher);

    var buttonPin = tessel.port[this.port].pin[this.pin];
    var button = Object.create(t2Button);

    var led = tessel.led[_getLedId(this.led.symbol)];

    // Listen for press/release events on the button hardware
    button.listen({
            frequency: 100,
            pin: buttonPin
        })
        .on('press', function() {
            // Only trigger push messages when the config for the button requires it
            if (this.events.indexOf('press') > -1) {
                this.pusher.trigger('gpio_channel', 'press_' + this.id, {
                    'message': 'Pressed "' + this.name + '" button'
                });
            }

            // Turn on the associated led
            led.on();

            // Log the button press to the console
            log.info('Pressed "' + this.name + '" button');
        }.bind(this))
        .on('release', function() {
            // Only trigger push messages when the config for the button requires it
            if (this.events.indexOf('release') > -1) {
                this.pusher.trigger('gpio_channel', 'release_' + this.id, {
                    'message': 'Pressed "' + this.name + '" button'
                });
            }

            // Turn off the associated led
            led.off();

            // Log the button release to the console
            log.info('Released "' + this.name + '" button');
        }.bind(this))
        .on('error', function(err) {
            // Only trigger push messages when the config for the button requires it
            if (this.events.indexOf('error') > -1) {
                this.pusher.trigger('gpio_channel', 'communication_error', {
                    'message': 'Could not send the message'
                });
            }

            // Log the error to the console
            log.error('Issue processing "' + this.name + '" button');
        }.bind(this));

    log.info("Successfully initialized controller button \"" + this.name + "\"");
};

/**
 * Get the ID based on the human readable symbol for the led
 *
 * @param  {String}    ledSymbol    Human readable name of the led to get the ID for
 * @return {String}                 The ID of the led on the Tessel hardware
 */
var _getLedId = function(ledSymbol) {
    switch (ledSymbol) {
        case 'info':
            return 3;
        case 'success':
            return 2;
        case 'warning':
            return 1;
        case 'error':
            return 0;
        default:
            return 3;
    }
};