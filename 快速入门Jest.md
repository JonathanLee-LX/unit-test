# 快速入门Jest

@(学习笔记)


[Jest官方文档](https://jestjs.io/docs/zh-Hans/getting-started.html)

创建一个**helloworld.js**
``` javascript
const hello = ()=> 'hello world!'
module.exports = hello
```
然后再创建一个**helloword.test.js**
``` javascript
const hello = require('./helloword.js')
test('hello world', () => {
	expect(hello()).toBe('hello world!')
})
```
我们已经完成了第一个Jest测试！

看看我们使用的几个api
-  **test**
-  **expect**
-  **toBe**
### test()
`test(name: string, fn: Function, timeout)`
另外还有一个相同的方法`it(name,  fn, timeout)` 
`name`是个这个测试的名称,`fn`是一个函数，函数里面需要编写测试方法。

###expect()
`expect(value)`的参数应该是您的代码产生的值，匹配器的任何参数应该是**正确**的值。 如果您混合使用，您的测试仍然可以工作，但是失败测试的错误信息将会显得奇怪，`value`  < any > 可以是任何类型的数据，`expect()`返回一个“期望”的对象，后面可以接[匹配器（Matchers）。](https://jestjs.io/docs/zh-Hans/expect)

###toBe()
`toBe(value)` 就是上文提到的一个匹配器。
`value`< any >可以是任何类型的数据，用来和expect()中的`value`进行比较，`toBe()`是精确比较，使用Object.is(a, b)来判断，如果想要比较对象字面量是否相同，就需要使用`toEqual()`来比较，`toEqual()`会递归的检查对象或数组的每个字段是否相等。
例如下面这个例子：
``` javascript
test('Object a is equal to Object b', () => {
	const a = {
		one: 1,
		two: 2
	}
	expect(a).toEqual({
		one: 1,
		two: 2
	})
})
// success
```

####怎么样测试特殊值
在测试中，当我们需要明确区分一些特殊值例如`undefined`, `null`和`false`时，Jest为此提供了专门的匹配器。例如：
-  `toBeNull` 只匹配`null`
- `toBeUndefined`只匹配`undefined`
- `toBeDefined` 与 `toBeUndefined` 相反
- `toBeTruthy`匹配所有`if`语句为真
- `toBeFalsy`匹配所有`if`语句为假
``` javascript
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```
####数字
####字符串
####数组
####测试异常
如果你想要测试一个特定的函数抛出一个错误，在`expect()`中传入一个函数`fn`，在函数调用中会抛出**(通过`throw`)**一个异常`error`，使用`toThrow`(或者使用`toThrowError`)匹配器接收捕获这个异常。
```javascript
const compileES6ToES5 = () => {
  throw new Error('something error happen.');
};
test('compile ES6 goes as expected', () => {
  expect( compileES6ToES5 ).toThrow();
});
```
当Jest运行一个测试用例时，它会跟踪所有失败的匹配器，然后会打印出所有的错误信息，如果在想要往被测试的代码中传入参数，可以像下面一样，给`fn`外围在包裹一层匿名函数。
``` javascript
const compileES6ToES5 = (msg) => {
if(msg) throw new Error('there are has a non-empty msg parameter');
}
test('compile ES6 with a non-empty parameter', () => {
	expect(() => {
		compileES6ToES5(msg)
	}).toThrow();
});
```
这段测试代码会在参数`msg`不为空的情况下，抛出一个错误，被`toThrow`捕获到，符合预期，测试通过。
###测试异步代码
在前端代码中经常会执行异步代码，测试异步代码也有特定的方式。
####回调
**最常见的异步调用方式是回调函数**
例如，您有一个`readFile(callback)的函数`,异步获取数据并在完成时调用`callback(data)`。测试返回的数据是不是`Hello World`。例如：
```javascript
const fs = require('fs')
const readFile = (callback) => {
	fs.readFile('1.txt', 'utf8', callback)
}
test('read "hello world" from "1.txt"', () => {
	const callback = (err, data) => {
		expect(data).toBe('hello world')
	}
	readFile(callback)
})
```
上面这个例子在执行完`readFile(callback)`后，Jest在默认情况下，当到达运行上下文底部时，Jest测试就会立即结束。这就意味着上面这个例子不能按预期工作。
为了测试异步代码，Jest提供了另外一种`test`方法。只需要在`test(asssertion, callback)`中的callback上增加一个接收回调函数的形式参数`done`即可, 而不是使用空参数的`callback`,Jest会在`done`回调函数执行后结束测试。
```javascript
const fs = require('fs')
const readFile = (callback) => {
    fs.readFile('1.txt', 'utf8', callback)
}
test('read "hello world" from "1.txt"', done => {
    const callback = (err, data) => {
        expect(data).toBe('hello world')
        done()
    }
    readFile(callback)
})
```

当以异步方式运行代码时，Jest只需要知道当前被测试的代码是否运行完成即可。
####Promise
另一种测试异步代码的方式就是使用`Promise`,如果您的测试返回一个`Promise`,Jest会等待这个`Promise`来解决，如果`Promise`被`rejected`掉，那么这个测试会自动失败掉。
先来看个例子：
```
test('the data is "Hello World!"', () => {
	expect.assertions(1)
	return fetchData().then(data => {
		expect(data).toBe('Hello World!')
	})
})
```
如果使用`Promise`,那么再测试回调函数中，就必须返回一个`Promise`,如果不返回`Promise`,那么测试就会再`fetchData()`执行完后***立即结束***, 所以一定要用`return`返回这个`Promise`.

**重点来了**，怎么用Jest来测试`Vue`代码？
###使用Jest测试Vue组件

测试vue代码需要使用一个vue官方提供的测试库`@vue/test-utils`.
想来看一个**Vue**提供的**HelloWorld**。

``` javascript
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```
**`shallowMount()`**
- 参数
	- `{Component} component`
	- `{Object} options`
		- `{boolean} attachToDocument`
		- `{Object} context`
			- `{Array<Component | Object>|Component} children`
		- `{Object} slots`
			- `{Array<Component|Object>|Component|String} default`
			- `{Array<Component|Object>|Component|String} named`
		- `{Object} mocks`
		- `{Object|Array<string>} stubs`
		- `{Vue} localVue`

- 返回值： `{Wrapper}`
- 用法：

通过传入一个组件对象，和一个可选的options对象，返回一个对象`wrapper`，这个对象包含**已经被挂载和渲染的Vue组件**(`vm`)以及测试该**组件**或**`虚拟DOM(vnode)`**方法。
####Vue的单元测试范围
Vue单元测试的范围仅限于数据流动是否正确，逻辑渲染是否正确 `(v-if v-show v-for)`,style和class是否正确，我们并不关心这个组件再浏览器渲染中的位置，也不需要关心会对其他组件造成什么影响，只要保证组件本身正确即可。
####测试数据
**测试prop**
```javascript
  it('该组件中有一个username属性值为“张三”', () => {
    const wrapper = shallowMount(Register);
    wrapper.setProps({
		username: '张三'
	})
    expect(wrapper.props().username).toBe('张三');
  });
```
通过`setProps(Object)`传入一个props对象，通过`wrapper.props()`验证prop。

**测试表单文本值**
``` javascript
  // 使用setValue(value)测试表单value
  it('第一个input的value为"some value"', () => {
      const wrapper = mount(Register);
      const input = wrapper.find('input');
      input.setValue('some value');
      expect(input.element.value).toBe('some value');
  });
```
通过`setValue(String)`传入一个字符串，通过`element.value`验证value。
**测试组件data对象**
```
  it('username是"张三"', () => {
      const wrapper = mount(Register);
      wrapper.setData({
          form: {
              username: '张三',
              password: '123',
              rePassword: '123',
              isAgree: false,
          },
      });
      expect(wrapper.vm.form.username).toEqual('张三');
  });
```
使用`setData(Object)`为组件设置一个data对象，通过`wrapper.vm`验证

# Mock
![enter image description here](https://w6.sanwen8.cn/mmbiz_png/cS1D19ibew1V5ibPC76Puz2gQ03tJMcWNoiaFL12wDeAW6gxicQ2NJlMAACk3Kas0fqBAXOfbg70y1ibGJ6LgHjkUMg/0?wx_fmt=png)
### 为什么要有Mock？
[做mock的好处](https://blog.csdn.net/IBelieve1974/article/details/70142176)
- 团队可以并行工作
- 开启TDD模式（即测试驱动开发）
- 可以模拟那些无法访问的资源
- 隔离系统
- 可以用来演示
- 测试覆盖度

在做测试时，经常会遇到依赖外部数据的情况，这个时候我们就应该使用 mock 数据，因为单元测试更多讲求的是局部测试，不要受外界三方引入包的影响为测试示例添加额外的属性。在伪造全局注入的时候有用。

### Mock Functions
`Jest`提供的`Mock Functions`可以用来进行Mock.
``` javascript
const myMock = jest.fn();
const b = {};
const bound = myMock.bind(b);
bound();
console.log(myMock.mock.instances)
```
这些mock成员可以用来有效的测试断言函数的调用情况，实例化对象或者是返回值。

### Mock Modules
在进行测试的时，我们可能遇到一类已经定义好的模块，然而这些模块的现有实现会影响我们的测试，这时我们就可以使用`Jest`提供的`模块mock`功能来完成测试。
`jest.mock(modulename, factory, options)`
- `modulename` 模块路径
- `factory` 明确指定实际运行的函数对象
- `options` 
- `返回值` 返回一个`jest`对象可以用来做链式调用

``` javascript
// foo.js
const foo = () => 'foo'
module.exports = foo

// foo.test.js
jest.mock('./foo')
const foo = require('./foo')
test('test mock function', () => {
  expect(foo()).toBe(undefined)
})

```

``` javascript
import { shallowMount } from '@vue/test-utils';
import Register from '@/components/Register.vue';

describe('Register.vue', () => {
    it('返回一个路由地址', () => {
        const $route = { path: 'https://123.com' };
        const wrapper = shallowMount(Register, {
            mocks: {
                $route,
            }
        });
        expect(wrapper.vm.$route.path).toBe($route.path);
    });
});
```


