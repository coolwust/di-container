'use strict';

var argsList = require('args-list');

function Container() {
  this.deps = {};
  this.facs = {};
}

function fac(name, fac) {
  this.facs[name] = fac;
  return this;
}

function set(name, dep) {
  this.deps[name] = dep;
  return this;
}

function get(name) {
  if (!this.deps[name]) {
    this.deps[name] = this.facs[name] && this.create(this.facs[name]);
    if (!this.deps[name]) {
      throw new Error(name + ' cannot be instantiated.');
    }
  }
  return this.deps[name];
}

function create(fac) {
  var args = argsList(fac)
    .map(function (name) {
      return this.get(name);
    }.bind(this));
  return fac.apply(null, args);
}

Container.prototype.fac = fac;
Container.prototype.set = set;
Container.prototype.get = get;
Container.prototype.create = create;
module.exports = Container;
