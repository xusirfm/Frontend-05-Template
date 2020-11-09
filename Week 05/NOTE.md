
#学习笔记

## proxy
proxy 是ES6中新增的api，是对象的代理，实现了**对象的劫持**

```js
const p = new Proxy(target, handler)

```
Vue 3 使用 proxy 实现数据的响应式，替代了过去使用的 Object.defineProperty

## 支持拦截操作

  * get(target, propKey, receiver)  
        拦截对象属性的读取，比如proxy.foo和proxy['foo']
  * set(target, propKey, value, receiver)  
      拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  * has(target, propKey)  
      拦截propKey in proxy的操作，返回一个布尔值。
  * getOwnPropertyDescriptor(target, propKey)  
      拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  * defineProperty(target, propKey, propDesc)  
      拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  * setPrototypeOf(target, proto)  
      拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  * apply(target, object, args)  
      拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  * construct(target, args)  
      拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
  * deleteProperty(target, propKey)  
      拦截delete proxy[propKey]的操作，返回一个布尔值。
  * ownKeys(target)  
      拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  
  * preventExtensions(target)  
      拦截Object.preventExtensions(proxy)，返回一个布尔值。
  * getPrototypeOf(target)  
      拦截Object.getPrototypeOf(proxy)，返回一个对象。
  * isExtensible(target)  
      拦截Object.isExtensible(proxy)，返回一个布尔值。

## 玩具 vue3.0 reactive
### 原理

  使用 es6 Proxy 对 Object 进行拦截，拦截 get 和 set 操作。set 的时候触发属性绑定的回调函数，get 的时候记录读取的属性。另外使用一个函数处理属性与回调函数的绑定关系。

### 具体实现

   * 全局变量 callbacks 用于保存引用到属性的与其对应 callback；全局变量 usedReactivties 主要用于记录有 callback 使用到的对象的属性；reactivties 缓存 reactive 函数返回的 reactive proxy 对象。

   * effect 函数传入一个 callback，首先执行一次 callback 获知使用到了哪些属性，将对应的属性与 callback 绑定，以供 set 属性的时候执行相应的callback。  

   * reactive 函数传入一个对象，使用 proxy 对对象的 get 和 set 进行拦截。get 拦截将使用到的属性记录下来；set 拦截判断属性是否有 callback 调用，有则执行对应 callback 。 

 
