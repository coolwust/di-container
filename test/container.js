'use strict';

var assert = require('assert');
var Container = require('../lib/container.js');

describe('Container', function () {
  it('initialize container', function () {
    var container = new Container();
    assert(container);
  });

  it('initialize dependencies.', function () {
    var container = new Container();
    container
      .fac('a', require('./fixtures/a'))
      .fac('b', require('./fixtures/b'));
    assert.equal(container.get('b').hello, 'world');
  });
});
