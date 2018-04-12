# typedscript.js
struct, interface 등 자바스크립트에 없는 강타입 언어에서의 컨셉들을 가져와 프로그래머가 능동적으로 사용할 수 있게 지원해주는 라이브러리.

현재 두 가지 형태의 라이브러리가 제작중에 있습니다.
하나는 mater 브랜치에, 하나는 feature 브랜치에 존재합니다.
이 문서에서 다루는 typedscript.js는 서재원(Environmentset)이 작업한 라이브러리를 의미합니다.

다른 버전의 라이브러리는 feature/Type 브랜치에서 보실 수 있으십니다.

### 빠른 시작

typedscript.js는 함수형 프로그래밍을 지향하는 라이브러리입니다. 환상적인 '타입 나라'의 타입들이 여러분들의 코드를 환상적이고, 깔끔하며, 명료하게 바꾸어 줄 겁니다. 이거, 완전 Lint보다 멋지지 않나요?

#### 설치
아직은, 브라우저를 지원하지 않습니다만 가까운 미래에 지원하도록 할 예정입니다.

npm으로 설치하기

    npm install typedscript.js

#### 타입들과의 첫 만남

자, 그럼 환상적인 타입의 세계에 들어가기 앞서, 어떤 타입들이 거주하고 있는지 알아보아야겠지요? 타입들은 크게 두 가지로 나눌 수 있습니다. 원형(shape)이 고정된 타입, 그리고 원형이 고정되지 않은 타입. 우리는 이 타입들은 각각 Atomic 타입과 Ion 타입이라 부릅니다.

Atomic 타입은 아래의 친구들입니다.

T.Boolean (불린)  
T.Float (실수)  
T.Integer (정수)  
T.Null (null)  
T.String (문자열)  
T.Symbol (심볼)  
T.Undefined (undefined)  

그리고 가장 특별한 타입인 T.Type이 있지요.

Ion 타입은 아래의 친구들입니다.

T.Array (배열)  
T.Struct (객체)  
T.Function <작업중>  
T.Interface <작업 예정>  
T.Refernce <설계중>  

#### Hello, world

그럼, 관례처럼 행해지는 의식을 치루도록 하겠습니다. 뭐냐고요? 있잖아요. 새로운 것을 배울때 늘 치루는 의식이요. 네 맞습니다. Hello. world지요.

    const T = require('typedscript.js'); 
    let helloStr = T(T.string, "Hello, world");
    console.log(helloStr.toString());
    //또는
    helloStr.bind(console.log);

기존 자바스크립트에서 하던 Hello, world와는 다르게 복잡해 보이기도 하고 어려워 보이기도 합니다. 뭔가 불필요한 연산들을 굳이 하는 느낌도 있고요. 하지만 DynamicTypedScript의 진정한 힘은 코드를 작성한 이후에 나타납니다.

    function x () {
        let n = 3;
        /*blahblah*/
        n = 3.14;
        somethingOnlyAcceptInteger(n); // Bug!!!!
    }
    
위와 같은 일이 벌어진다면 매우 끔찍하겠지요. 하지만 typedscript.js는 위와 같은 문제를 예방해 줍니다.

    function x () {
        let n = T(T.integer, 3);
        /*blahblah*/
        n._ = 3.14; // Error!!
        //TypeError: <3.14> is invalid value as value of Variable<Integer<Integer>>
        somethingOnlyAcceptInteger(n);
    }
    
 어떤가요? 이렇게, 타입 친구들이 여러분의 실수를 막아줍니다.
 
#### 나만의 타입 정의하기.

좋습니다, 우리는 이제 타입 친구들의 이름과 능력도 알고. 같이 혐업하는 방법도 알 게 되었습니다.
 
### API
이 부분은, 정확하고 엄격한 정보를 좋아하시는 분들을 위해 준비되었습니다.
DynamicTypedScript는 아래와 같이 불러오시면 됩니다.

    const T = require('DynamicTypedScript');

#### T

T는 제네릭 프로그래밍을 지원하는 함수입니다. 즉, 인자에 따라 작동(behavior)이 달라집니다.

#### T(Type\[, shape\])

* \[Type\] Type. Type을 확장하는, 인스턴스화할 타입의 생성자.
* \[Object\] shape. 인스턴스화 할 타입의 shape를 담은 객체.

new Type(shape)를 통해 만들어진 타입 인스턴스를 반환합니다.

    let int = T(T.Integer);
    //eqalus let int = new T.Integer

#### T(variable)
* \[Variable\] variable. Variable을 확장하는 생상자를 통해 만들어진 객체 또는 Type 객체를 확장하지 않는 자바스크립트 값.

만약, variable이 Variable 객체를 확장한다면 variable.box 를 반환하고. 아니라면 variable을 반환합니다.

#### \[new\]T(type, value)
* \[Type\] type. 인스턴스화 된 type.
* \[value\] value. 새로 생성될 변수의 값이 될 값.

variable.type = type, variable.box = value를 갖는 새 변수를 생성하고, 반환합니다.

    let x = T(new T.Integer, 1);
    //or
    let y = new T(new T.Integer, 2);
    
#### T\[Type\]
Type의 생성자입니다.
    
    let intType = T.Integer;
    let arrType = T.Array;
    
#### T\[type\]
Atomic 타입들은 lowercase로 명명된, 미리 생성된 인스턴스들이 존재합니다.

    let intType = T.integer;
    let floatType = T.float;
       

#### T.call(function, ...params)

* \[Function\] function. 호출 될 Typed Function.
* \[Anything\] ...params. function의 arguments.

params가 Typed Function의 인자에 적합한 타입들을 가지면 호출되고, 결과값을 반환한다.
   
#### variable.validator(...params)
* ...\[Anything\] params
variable의 type의 validator에게 params를 인자로서 넘긴 실행 결과를 반환한다. 

#### variable.toString()

variable을 문자열로 표현한 형식을 반환한다.

> 아직 개발진은 variable과 type의 표준 문자열 표기 형식을 정하지 못했습니다. 그러므로 디버깅 용도로만 사용하시길 바랍니다.

#### variable.bind(function)
function(variable.box)의 실행 결과를 반환한다.

#### \[getter, setter\]variable._ \[=  newValue\]
getter의 경우, variable.box를 반환하며, setter의 경우, 값을 검사한 후. 변수에 적합한 값이면 variable.box의 값을 newValue로 변경한다.

#### \[getter, setter\]variable.T \[newType\]
getter 경우, variable.type을 반환하고. setter의 경우, 값을 type.initializer를 통해 초기화 후 variable.type을 newType으로 변경한다. 
    
#### Atomic 타입

Integer 타입

* 정수만 값으로 허용.

Float 타입

* 실수만 값으로 허용.

Boolean 타입 

* 불 값만 값으로 허용.

Null 타입

* 널 값만 값으로 허용.

String 타입

* 문자열 값만 값으로 허용.

Symbol 타입

* 심볼 값만 값으로 허용.
  
Undefined 타입

* undefined 값만 타입으로 허용. 

#### Ion 타입

Array 타입

* shape 타입만 담은 배열만 값으로 허용.

Struct 타입

* shape의 구조를 갖는 객체만 값으로 허용.

Function 타입

* shape의 구조에 맞는 인자만 허용.


    let ints = T(T.Struct, { a : T.integer, b : T.integer});
    let shape = T(T.Function, [ints, ints]);
    let f = T(shape, \[T.Function.defineBody, (x, y) => x.a+x.b+y.a+y.b\]);
    console.log(T.call(f, { a : 1, b : 2}, { a : 3, b : 4}));
    
> Function 타입의 경우,변수 정의 시 T.Function.defineBody 심볼을 첫 번째 요소로 하고, 그 뒤에 함수를 넘긴다. 이는 곳 패치될 레거시 요소지만, 아직까지는 사용된다.
   
