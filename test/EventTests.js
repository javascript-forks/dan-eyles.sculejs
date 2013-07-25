/**
 * Copyright (c) 2013, Dan Eyles (dan@irlgaming.com)
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of IRL Gaming nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL IRL Gaming BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var assert = require('assert');
var Scule = require('../lib/com.scule');

describe('Observer', function() {
    describe('Event', function() {
       it('verifies that accessors on events function as excepted', function() {
            var event = Scule.getEvent('test', {foo:'bar'});
            assert.ok(event);
            assert.equal(event.getName(), 'test');
            assert.equal(JSON.stringify(event.getBody()), JSON.stringify({foo:'bar'}));           
       });
    });
    describe('EventListener', function() {
       it('verifies that accessors on event listeners function as expected', function() {
            var event    = Scule.getEvent('test', {foo:'bar'});
            var closure  = function(e) {
                assert.equal(e.getName(), 'test');
                assert.equal(JSON.stringify(e.getBody()), JSON.stringify({foo:'bar'}));
            };
            var listener = Scule.getEventListener(closure);
            assert.ok(listener);
            assert.equal(closure, listener.getClosure());
            listener.consume(event);           
       });
    });
    describe('EventEmitter', function() {
        it('verifies that events are emitted successfully', function() {
            var event   = Scule.getEvent('test', {foo:'bar'});
            var emitter = Scule.getEventEmitter();
            for (var i=0; i < 20; i++) {
                emitter.addEventListener('test', function(e) {
                    assert.ok(e);
                    assert.equal(e.getName(), 'test');
                    assert.equal(JSON.stringify(e.getBody()), JSON.stringify({foo:'bar'}));
                });
            }
            emitter.fireEvent('test', {foo:'bar'});            
        });
    });
});