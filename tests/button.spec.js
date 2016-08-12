/*
 * The MIT License (MIT)
 *
 * Copyright(c) 2013 Bert Pareyn
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

var Button = require('../controller/Button').Button;
var ButtonClass = require('../controller/Button');
var should = require('should');
var stdout = require('test-console').stdout;

describe('Button', function() {
    describe('Buttons', function() {
        it('should be able to be initialised', function(done) {
            var buttonConfig =         {
                "id": "a",
                "name": "A Button",
                "port": "B",
                "pin": 4,
                "led": {
                    "symbol": "warning"
                },
                "events": ["error", "press", "release"]
            };
            buttonConfig.pusher = {
                "appId": "233404",
                "key": "bb2a1923d9cf75f8fec1",
                "secret": "e0d4804fe670283088a5",
                "host": "api-eu.pusher.com"
            };
            var button = new Button(buttonConfig);
            done();
        });

        it('should be able to be pressed', function(done) {
            var buttonConfig =         {
                "id": "a",
                "name": "A Button",
                "port": "B",
                "pin": 4,
                "led": {
                    "symbol": "info"
                },
                "events": ["press"]
            };
            buttonConfig.pusher = {
                "appId": "233404",
                "key": "bb2a1923d9cf75f8fec1",
                "secret": "e0d4804fe670283088a5",
                "host": "api-eu.pusher.com"
            };
            var button = new Button(buttonConfig);
            ButtonClass.pressButton.apply(button);
            done();
        });

        it('should be able to be released', function(done) {
            var buttonConfig =         {
                "id": "a",
                "name": "A Button",
                "port": "B",
                "pin": 4,
                "led": {
                    "symbol": "success"
                },
                "events": ["release"]
            };
            buttonConfig.pusher = {
                "appId": "233404",
                "key": "bb2a1923d9cf75f8fec1",
                "secret": "e0d4804fe670283088a5",
                "host": "api-eu.pusher.com"
            };
            var button = new Button(buttonConfig);
            ButtonClass.releaseButton.apply(button);
            done();
        });

        it('should be able to log an error', function(done) {
            var buttonConfig =         {
                "id": "a",
                "name": "A Button",
                "port": "B",
                "pin": 4,
                "led": {
                    "symbol": "error"
                },
                "events": ["error"]
            };
            buttonConfig.pusher = {
                "appId": "233404",
                "key": "bb2a1923d9cf75f8fec1",
                "secret": "e0d4804fe670283088a5",
                "host": "api-eu.pusher.com"
            };
            var button = new Button(buttonConfig);
            ButtonClass.buttonError.apply(button);
            done();
        });

        it('should default to using the `info` LED', function(done) {
            var buttonConfig =         {
                "id": "a",
                "name": "A Button",
                "port": "B",
                "pin": 4,
                "led": {
                    "symbol": ""
                },
                "events": ["press"]
            };
            buttonConfig.pusher = {
                "appId": "233404",
                "key": "bb2a1923d9cf75f8fec1",
                "secret": "e0d4804fe670283088a5",
                "host": "api-eu.pusher.com"
            };
            var button = new Button(buttonConfig);
            button.led.info.name.should.be.equal('LED2');
            done();
        });
    });
});
