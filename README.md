# typedscript.js
struct, interface 등 자바스크립트에 없는 강타입 언어에서의 컨셉들을 가져와 프로그래머가 능동적으로 사용할 수 있게 지원해주는 라이브러리.

### 빠른 시작

typedscript.js는 함수형 프로그래밍을 지향하는 라이브러리입니다. 환상적인 '타입 나라'의 타입들이 여러분들의 코드를 환상적이고, 깔끔하며, 명료하게 바꾸어 줄 겁니다. 이거, 완전 Lint보다 멋지지 않나요?

#### 설치
아직은, 브라우저를 지원하지 않습니다만 가까운 미래에 지원하도록 할 예정입니다.

[npm](https://www.npmjs.com/package/typedscript.js "npm link")으로 설치하기

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
T.Struct (객체의 형태)  
T.Function (함수)
T.Interface <객체의 형식>  

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