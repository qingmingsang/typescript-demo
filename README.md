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
 
# 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
//myFavoriteNumber = true;//error
```

## 访问联合类型的属性或方法
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
```
function getLength(something: string | number): string | number {
    //return something.length;//error
    return something;
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5

myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```

# 对象的类型——接口
在 TypeScript 中，使用接口（Interfaces）来定义对象的类型。
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。
接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
赋值的时候，变量的形状必须和接口的形状保持一致。
```
interface Person {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

定义的变量比接口少了一些属性是不允许的
```
let tom2: Person = {
    name: 'Tom'
};
//TS2741: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

多一些属性也是不允许的
```
let tom3: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

## 可选属性
可选属性的含义是该属性可以不存在。
但是不允许添加未定义的属性
```
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};

let tom2: Person = {
    name: 'Tom',
    age: 25
};

let tom3: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};//error
```

## 任意属性
有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
```
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```
使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，一旦定义了任意属性，
那么确定属性和可选属性的类型都必须是它的类型的子集：
```
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
//TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//Property 'age' is incompatible with index signature.
//Type 'number' is not assignable to type 'string'.
```
上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
另外，在报错信息中可以看出，此时 { name: 'Tom', age: 25, gender: 'male' } 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

## 只读属性
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
```
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
```
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。
第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。


# 数组的类型

## 「类型 + 方括号」表示法
最简单的方法是使用`「类型 + 方括号」`来表示数组：
`let fibonacci: number[] = [1, 1, 2, 3, 5];`

数组的项中不允许出现其他的类型：
```
let fibonacci: number[] = [1, '1', 2, 3, 5];

// Type 'string' is not assignable to type 'number'.
```

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
```
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```
上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。

## 数组泛型
也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：
`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`

## 用接口表示数组
接口也可以用来描述数组：
```
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
虽然接口也可以用来描述数组，但是一般不会这么做，因为这种方式比前两种方式复杂多了。
不过有一种情况例外，那就是它常用来表示类数组。

## 类数组
类数组（Array-like Object）不是数组类型，比如 arguments：
```
function sum() {
    let args: number[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
```
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```
在这个例子中，除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。

事实上常用的类数组都有自己的接口定义，如 `IArguments, NodeList, HTMLCollection` 等：
```
function sum() {
    let args: IArguments = arguments;
}
```

其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
```
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

## any 在数组中的应用
一个比较常见的做法是，用 any 表示数组中允许出现任意类型：
`let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];`



























