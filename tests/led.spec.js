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

var led = require('../controller/leds');
var should = require('should');
var stdout = require('test-console').stdout;

describe('Led', function() {
    describe('Leds', function() {
        it('should be able to toggle all leds', function(done) {
            var inspect = stdout.inspect();
            led.toggleLeds();
            setTimeout(function() {
                inspect.restore();
                inspect.output.length.should.be.equal(4);
                done();
            }, 100);
        });

        it('should be able to turn all leds off', function(done) {
            var inspect = stdout.inspect();
            led.turnLedsOff();
            setTimeout(function() {
                inspect.restore();
                inspect.output.length.should.be.equal(4);
                done();
            }, 100);
        });

        it('should be able to turn all leds off', function(done) {
            var inspect = stdout.inspect();
            led.turnLedsOn();
            setTimeout(function() {
                inspect.restore();
                inspect.output.length.should.be.equal(4);
                done();
            }, 100);
        });

        it('should be able to start initialization led blinking', function(done) {
            var inspect = stdout.inspect();
            led.startLoadIndication(3);

            setTimeout(function() {
                inspect.restore();
                inspect.output.length.should.not.be.equal(0);
                led.finishLoadIndication();
                done();
            }, 500);
        });
    });
});
