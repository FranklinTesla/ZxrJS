/**
 * Zxr实例构造函数
 * @param options
 * @constructor
 */
function Zxr(options) {
    if (options == null) throw new Error('an object param named must be pass in!');
    let el = options.el;
    el = document.querySelector(el);
    this.$data = options.data;
    // 编译模板
    this.__walker(el);
}
export {Zxr};