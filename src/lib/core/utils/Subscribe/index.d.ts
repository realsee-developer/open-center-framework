declare const __EVENT__ = '__events__'
/**
 * 订阅类。
 * 观察者模式（供前端使用），Node端推荐<a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a>。
 */
export default class Subscribe {
  private [__EVENT__]
  constructor()
  /**
   * 判断是否注册时事件
   * @param  {string|[string]}  name     事件类型
   */
  hasListener(name: string): any
  /**
   * 注册事件
   * @param  {string|[string]}  names    事件类型
   * @param  {function}         callback 事件回调函数
   * @param  {any}              context  事件回调函数调用的上下文
   * @param  {boolean}          once     是否只执行一次
   */
  on(
    names: string | string[],
    callback: (...args: any[]) => void,
    context?: any,
    once?: boolean,
  ): () => this | undefined
  /**
   * 注册事件(是否只执行一次)
   * @param  {string|[string]}  names    事件类型
   * @param  {function}         callback 事件回调函数
   * @param  {any}              context  事件回调函数调用的上下文
   */
  once(names: string | string[], callback: (...args: any[]) => void, context?: any): () => this | undefined
  /**
   * 解除事件
   * @param  {string|[string]}  names    事件类型
   * @param  {function}         callback 事件回调函数
   *
   * 如果 name 不传的话解除对应所有事件
   * 如果 name, callback 不传的话解除所有name的所有事件
   */
  off(names?: string | string[], callback?: (...args: any[]) => void): this | undefined
  /**
   * 触发事件
   * @param  {string|[string]}    name      事件类型
   * @param  {...any}             data      触发事件的数据
   */
  emit(name: string, ...data: any[]): boolean
}
export {}
