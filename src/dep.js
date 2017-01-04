let uid = 0;
export class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }
}

Dep.target = null;
/**
 * Add a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

/**
 * Remove a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.removeSub = function (sub) {
    this.subs.$remove(sub)
}

/**
 * Add self as a dependency to the target watcher.
 */

Dep.prototype.depend = function () {
    Dep.target.addDep(this)
}

/**
 * Notify all subscribers of a new value.
 */

Dep.prototype.notify = function (newVal) {
    // stablize the subscriber list first
    var subs = this.subs
    for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update(newVal);
    }
}