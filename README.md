# typescript-demo

# 原始数据类型
## 布尔值

在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样.
```
let isDone: boolean = false;
//let createdByNewBoolean: boolean = new Boolean(1);//error
let createdByNewBoolean: Boolean = new Boolean(1);
let createdByBoolean: boolean = Boolean(1);
```

## 数值
```
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 字符串
```
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

## 空值
可以用 void 表示没有任何返回值的函数
```
function alertName(): void {
  alert('My name is Tom');
}
```
声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
`let unusable: void = undefined;`

## Null 和 Undefined
在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型.
undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。
```
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
```
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num2: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：
```
let u: void;
let num: number = u;//error
```

# 任意值
任意值（Any）用来表示允许赋值为任意类型。

如果是一个普通类型，在赋值过程中改变类型是不被允许的：
```
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;//error
```

但如果是 any 类型，则允许被赋值为任意类型。
```
let myFavoriteNumber2: any = 'seven';
myFavoriteNumber2 = 7;
```
## 任意值的属性和方法
在任意值上访问任何属性都是允许的,也允许调用任何方法
声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
```
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

let anyThing2: any = 'Tom';
anyThing2.setName('Jerry');
anyThing2.setName('Jerry').sayHello();
anyThing2.myName.setFirstName('Cat');
console.log(anyThing2)
```

## 未声明类型的变量
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型.

需要将tsconfig.json文件里的设置成`"noImplicitAny": false`
```
let something;
something = 'seven';
something = 7;
something.setName('Tom');
```
等价于
```
let something2: any;
something2 = 'seven';
something2 = 7;
something2.setName('Tom');
```

# 类型推论
如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
以下代码虽然没有指定类型，但是会在编译的时候报错：
```
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;//error
```
事实上，它等价于：
```
let myFavoriteNumber2: string = 'seven';
myFavoriteNumber2 = 7;//error
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

需要将tsconfig.json文件里的设置成`"noImplicitAny": false`
```
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```



 











