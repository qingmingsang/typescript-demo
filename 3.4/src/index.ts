//接口
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);//"Size 10 Object"

//类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 
//需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。 
//然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。

//下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：
interface LabelledValue {
  label: string;
}

function printLabel2(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

printLabel2(myObj);//"Size 10 Object"
//LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。 
//需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。我们只会去关注值的外形。 
//只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
//还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。


//可选属性
//接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
//可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

//下面是应用了“option bags”的例子：
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  // if (config.clor) {
  //   // Error: Property 'clor' does not exist on type 'SquareConfig'
  //   newSquare.color = config.clor;
  // }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
//console.log(mySquare)
//带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
//可选属性的好处之一是可以对可能存在的属性进行预定义，
//好处之二是可以捕获引用了不存在的属性时的错误。 
//比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示.


//只读属性
//一些对象属性只能在对象刚刚创建的时候修改其值。 

//你可以在属性名前用 readonly来指定只读属性:
interface Point {
  readonly x: number;
  readonly y: number;
}

//你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
let p1: Point = { x: 10, y: 20 };
//console.log(p1)
//p1.x = 5; // error!

//TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
//因此可以确保数组创建后再也不能被修改：

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
//ro[0] = 12; // error!
//ro.push(5); // error!
//ro.length = 100; // error!
//a = ro; // error!
//上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 
//但是你可以用类型断言重写：
a = ro as number[];

//readonly vs const
//最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 
//做为变量使用的话用 const，若做为属性则使用readonly。


//额外的属性检查
//我们在第一个例子里使用了接口，TypeScript让我们传入{ size: number; label: string; }到仅期望得到{ label: string; }的函数里。 
//我们已经学过了可选属性，并且知道他们在“option bags”模式里很有用。

//然而，天真地将这两者结合的话就会像在JavaScript里那样搬起石头砸自己的脚。 
//比如，拿 createSquare例子来说：

interface SquareConfig2 {
  color?: string;
  width?: number;
}

function createSquare2(config: SquareConfig2): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
// error: 'colour' not expected in type 'SquareConfig2'
//let mySquare2 = createSquare2({ colour: "red", width: 100 });

//绕开这些检查非常简单。 最简便的方法是使用类型断言：
let mySquare2 = createSquare2({ width: 100, opacity: 0.5 } as SquareConfig2);

//最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 
//如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

interface SquareConfig3 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

//还有最后一种跳过这些检查的方式，它就是将这个对象赋值给一个另一个变量： 
//因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare2(squareOptions);

//函数类型
//接口能够描述JavaScript中对象拥有的各种各样的外形。 
//除了描述带有属性的普通对象外，接口也可以描述函数类型。

//为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 
//它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

interface SearchFunc {
  (source: string, subString: string): boolean;
}

//这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 
//下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

//对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 
//比如，我们使用下面的代码重写上面的例子：

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

//函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 
//如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。 
//函数的返回值类型是通过其返回值推断出来的（此例是 false和true）。 
//如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 SearchFunc接口中的定义不匹配。

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

//可索引的类型
//与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。 
//可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

//让我们看一个例子：

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
 //console.log(myStr)//"Bob"








