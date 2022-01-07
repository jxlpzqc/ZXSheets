/**
 * 给数组加入一些关于栈的方法和属性
 */
Object.defineProperty(Array.prototype, "top", {
    get() {
        //@ts-ignore
        return (this[this.length - 1]);
    }
})

interface Array<T> {
    get top(): T;
}