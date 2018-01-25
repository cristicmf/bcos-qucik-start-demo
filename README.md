

什么是solidity

Solidity是一种[智能合约](https://github.com/EthFans/wiki/wiki/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6)高级语言，运行在Ethereum虚拟机（EVM）之上。

名词解释：
- EVM：以太坊虚拟机(EVM)是智能合约的运行环境。它是一个完全独立的沙盒，合约代码在EVM内部运行，对外是完全隔离的，甚至不同合约之间也只有有限的访问权限。
- 智能合约模型：一段代码（智能合约），被部署在分享的、复制的账本上，它可以维持自己的状态，控制自己的资产和对接收到的外界信息或者资产进行回应。

## 1. solidity 语言特点

它的语法接近于Javascript，是一种面向对象的语言。但作为一种真正意义上运行在网络上的去中心合约，它又有很多的不同，下面列举一些：

- 以太坊底层是基于帐户，而非UTXO的。
- 异常机制，一旦出现异常，所有的执行都将会被回撤，这主要是为了保证合约执行的原子性，以避免中间状态出现的数据不一致。
- 运行环境是在去中心化的网络上，会比较强调合约或函数执行的调用的方式。因为原来一个简单的函数调用变为了一个网络上的节点中的代码执行
- 存储是使用网络上的区块链，数据的每一个状态都可以永久存储。

## 2. 开发的工具
准备工作
##### [安装区块链](https://github.com/FISCO-BCOS/FISCO-BCOS/tree/master/sample)

- [在线编译器Remix](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)
- Visual Studio + soliidty 插件


## 3 快速入门

### 3.1 举个例子[get demo](https://github.com/cristicmf/bcos-qucik-start-demo/tree/master/startDemo)

    pragma solidity ^0.4.2;
    
    contract SimpleStartDemo {
        int256 storedData;
        event AddMsg(address indexed sender, bytes32 msg);
    
        modifier only_with_at_least(int x) {
           if (x >= 5) {
             x = x+10;
              _;
           }
        } 
        function SimpleStartDemo() {
            storedData = 2;
        }
    
        function setData(int256 x) public only_with_at_least(x){
            storedData = x;
            AddMsg(msg.sender, "[in the set() method]");
        }
    
        function getData() constant public returns (int256 _ret) {
            AddMsg(msg.sender, "[in the get() method]");
            return _ret = storedData;
        }
    }

### 3.2 部署合约

举个例子[get demo](https://github.com/cristicmf/bcos-qucik-start-demo/tree/master/startDemo)

    $ babel-node index.js

#### 1. 编译合约
        execSync("solc --abi  --bin   --overwrite -o " + config.Ouputpath + "  " + filename + ".sol");
   
#### 2. 部署合约到区块链上
       var Contract = await web3sync.rawDeploy(config.account, config.privKey, filename);
#### 3. 对合约进行读写
        var address = fs.readFileSync(config.Ouputpath + filename + '.address', 'utf-8');
        var abi = JSON.parse(fs.readFileSync(config.Ouputpath /*+filename+".sol:"*/ + filename + '.abi', 'utf-8'));
        var contract = web3.eth.contract(abi);
        var instance = contract.at(address);
        //获取链上数据
        var data = instance.getData();
        //修改链上数据
        var func = "setData(int256)";
        var params = [10];
        var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
   

#### 3.2.1 引入概念：

address：以太坊地址的长度，大小20个字节，160位，所以可以用一个uint160编码。地址是所有合约的基础，所有的合约都会继承地址对象，也可以随时将一个地址串，得到对应的代码进行调用。合约的地址是基于账号随机数和交易数据的哈希计算出来的

ABI：是以太坊的一种合约间调用时或消息发送时的一个消息格式。就是定义操作函数签名，参数编码，返回结果编码等。

交易：以太坊中“交易”是指存储从外部账户发出的消息的签名数据包。

简单理解是：只要对区块链进行写操作，一定会发生交易。

交易回执：

发生交易后的返回值

#### 3.2.2 扩展阅读：

- [Ethereum-Contract-ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
- [Solidity-Features](https://github.com/ethereum/wiki/blob/master/Solidity-Features.md)
- [以太坊白皮书](https://github.com/ethereum/wiki/wiki/%5B%E4%B8%AD%E6%96%87%5D-%E4%BB%A5%E5%A4%AA%E5%9D%8A%E7%99%BD%E7%9A%AE%E4%B9%A6)

### 3.3 合约文件结构简介

#### 1. 版本声明

    pragma solidity ^0.4.10；

#### 1. 引用其它源文件

    import “filename”;//全局引入

#### 1. 状态变量(State Variables)
        int256 storedData;
   详细说明见下文
#### 2. 函数(Functions)
       function setData(int256 x) public {
             storedData = x;
             AddMsg(msg.sender, "[in the set() method]");
         }
       
        function getData() constant public returns (int256 _ret) {
            return _ret = storedData;
         }
   
#### 3. 事件（Events）
       //事件的声明
       event AddMsg(address indexed sender, bytes32 msg);
       //事件的使用
       function setData(int256 x) public {
             storedData = x;
             AddMsg(msg.sender, "in the set() method");
         }
   
#### 4. 结构类型(Structs Types)
       contract Contract {
         struct Data {
           uint deadline;
           uint amount;
         }
         Data data;
         function set(uint id, uint deadline, uint amount) {
           data.deadline = deadline;
           data.amount = amount;
         }
       }
   
#### 5. 函数修饰符（Function Modifiers）
   类似于hook
       modifier only_with_at_least(int x) {
              if (x >= 5) {
                x = x+10;
                 _;
              }
           } 
   

## 4. 合约编程模式COP

面向条件的编程（COP）是面向合约编程的一个子域，作为一种面向函数和命令式编程的混合模式。COP解决了这个问题，通过需要程序员显示地枚举所有的条件。逻辑变得扁平，没有条件的状态变化。条件片段可以被正确的文档化，复用，可以根据需求和实现来推断。重要的是，COP在编程中把预先条件当作为一等公民。这样的模式规范能保证合约的安全。

### 4.1 FEATURES

- 函数主体没有条件判断

例子：

    contract Token {
        // The balance of everyone
        mapping (address => uint) public balances;
        // Constructor - we're a millionaire!
        function Token() {
            balances[msg.sender] = 1000000;
        }
        // Transfer `_amount` tokens of ours to `_dest`.
        function transfer(uint _amount, address _dest) {
            balances[msg.sender] -= _amount;
            balances[_dest] += _amount;
        }
    }

改进后：

    function transfer(uint _amount, address _dest) {
        if (balances[msg.sender] < _amount)
            return;
        balances[msg.sender] -= _amount;
        balances[_dest] += _amount;
    }

COP的风格

    modifier only_with_at_least(uint x) {
        if (balances[msg.sender] >= x) _;
    }
    
    function transfer(uint _amount, address _dest)
    only_with_at_least(_amount) {
        balances[msg.sender] -= _amount;
        balances[_dest] += _amount;
    }

#### 扩展阅读：

- [Condition-Orientated Programming](https://medium.com/@gavofyork/condition-orientated-programming-969f6ba0161a)
- Paper

## 5. 语法介绍

### 5.1 值类型

- 布尔(Booleans)
  true  false
  支持的运算符

    ！逻辑非
    && 逻辑与
    || 逻辑或
    == 等于
    ！= 不等于

- 整型(Integer)
  int/uint：变长的有符号或无符号整型。变量支持的步长以8递增，支持从uint8到uint256，以及int8到int256。需要注意的是，uint和int默认代表的是uint256和int256
- 地址(Address):
  以太坊地址的长度，大小20个字节，160位，所以可以用一个uint160编码。地址是所有合约的基础，所有的合约都会继承地址对象，也可以随时将一个地址串，得到对应的代码进行调用
- 定长字节数组(fixed byte arrays)
- 有理数和整型(Rational and Integer Literals，String literals)
- 枚举类型(Enums)
- 函数(Function Types)

### 5.2 引用类型(Reference Types)

- 不定长字节数组（bytes）
- 字符串（string）
      bytes3 a = "123";
- 数组（Array）
- 结构体（Struts）

## 6. 重要概念

### 6.1 Solidity的数据位置

#### 数据位置的类型

变量的存储位置属性。有三种类型，memory，storage和calldata。

- memory存储位置同我们普通程序的内存类似。即分配，即使用，越过作用域即不可被访问，等待被回收-
- storage的变量，数据将永远存在于区块链上。
- calldata 数据位置比较特殊，一般只有外部函数的参数（不包括返回参数）被强制指定为calldata

Storage - 状态变量的存储模型

大小固定的变量（除了映射，变长数组以外的所有类型）在存储(storage)中是依次连续从位置0开始排列的。如果多个变量占用的大小少于32字节，会尽可能的打包到单个storage槽位里，具体规则如下：

- 在storage槽中第一项是按低位对齐存储（lower-order aligned）
- 基本类型存储时仅占用其实际需要的字节。
- 如果基本类型不能放入某个槽位余下的空间，它将被放入下一个槽位。
- 结构体和数组总是使用一个全新的槽位，并占用整个槽(但在结构体内或数组内的每个项仍遵从上述规则)



#### 优化建议：

为了方便EVM进行优化，尝试有意识排序storage的变量和结构体的成员，从而让他们能打包得更紧密。比如，按这样的顺序定义，uint128, uint128, uint256，而不是uint128, uint256, uint128。因为后一种会占用三个槽位。

Memory - 内存变量的布局（Layout in Memory）

Solidity预留了3个32字节大小的槽位：

0-64：哈希方法的暂存空间(scratch space)

64-96：当前已分配内存大小(也称空闲内存指针(free memory pointer))

暂存空间可在语句之间使用（如在内联编译时使用）

Solidity总是在空闲内存指针所在位置创建一个新对象，且对应的内存永远不会被释放(也许未来会改变这种做法)。

有一些在Solidity中的操作需要超过64字节的临时空间，这样就会超过预留的暂存空间。他们就将会分配到空闲内存指针所在的地方，但由于他们自身的特点，生命周期相对较短，且指针本身不能更新，内存也许会，也许不会被清零(zerod out)。因此，大家不应该认为空闲的内存一定已经是清零(zeroed out)的。

例子

### 6.2 address

以太坊地址的长度，大小20个字节，160位，所以可以用一个uint160编码。地址是所有合约的基础，所有的合约都会继承地址对象，也可以随时将一个地址串，得到对应的代码进行调用

### 6.3 event

 event AddMsg(address indexed sender, bytes32 msg);

- 这行代码声明了一个“事件”。客户端（服务端应用也适用）可以以很低的开销来监听这些由区块链触发的事件

事件是使用EVM日志内置功能的方便工具，在DAPP的接口中，它可以反过来调用Javascript的监听事件的回调。

    var event = instance.AddMsg({}, function(error, result) {
            if (!error) {
                var msg = "AddMsg: " + utils.hex2a(result.args.msg) + " from "
                console.log(msg);
                return;
            } else {
                console.log('it error')
            }
        });



- 事件在合约中可被继承。当被调用时，会触发参数存储到交易的日志中（一种区块链上的特殊数据结构）。这些日志与合约的地址关联，并合并到区块链中，只要区块可以访问就一直存在(至少Frontier，Homestead是这样，但Serenity也许也是这样)。日志和事件在合约内不可直接被访问，即使是创建日志的合约。
- 日志位置在nodedir0/log 里面，可以打出特殊的类型进行验证

### 6.4 数组

数组是定长或者是变长数组。有length属性，表示当前的数组长度。

1. bytes：类似于byte[]， 动态长度的字节数组
2. string：类似于bytes，动态长度的UTF-8编码的字符类型
3. bytes1~bytes32

      一般使用定长的  bytes1~bytes32。在知道字符串长度的情况下，指定长度时，更加节省空间。

#### 6.4.1 创建数组

1. 字面量 uint[] memory a = []
2. new  uint[] memory a = new uint[](7);
  [例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

       pragma solidity ^0.4.0;
       
       contract SimpleStartDemo{
         uint[] stateVar;
       
         function f(){
          //定义一个变长数组
           uint[] memory memVar;
       
           //不能在使用new初始化以前使用
           //VM Exception: invalid opcode
           //memVar [0] = 100;
       
           //通过new初始化一个memory的变长数组
           memVar = new uint[](2);
           
           //不能在使用new初始化以前使用
           //VM Exception: invalid opcode
           //stateVar[0] = 1;
           
           //通过new初始化一个storage的变长数组
           stateVar = new uint[](2);
           stateVar[0] = 1;
         }
       }

#### 6.4.2 数组的属性和方法

length属性

storage变长数组是可以使用length访问

memory变长数组是不可以使用length访问

push方法

storage变长数组可以使用push方法

bytes可以使用push方法

[例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

    pragma solidity ^0.4.2;
    
    contract SimpleStartDemo {
      uint[] stateVar;
    
      function f() returns (uint){
        //在元素初始化前使用
        stateVar.push(1);
    
        stateVar = new uint[](1);
        stateVar[0] = 0;
        //自动扩充长度
         uint len = stateVar.push(1);
    
        //不支持memory
        //Member "push" is not available in uint256[] memory outside of storage.
        //uint[] memory memVar = new uint[](1);
        //memVar.push(1);
    
        return len;
      }
    }



下标：和其他语言类似

#### 6.4.3 Memory数组

1. 如果Memory数组作为函数的参数传递，只能支持ABI能支持的类型类型。
2. Memory数组是不能修改修改数组大小的属性
   [例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

    pragma solidity ^0.4.2;
    
    contract SimpleStartDemo {
        function f() {
            //创建一个memory的数组
            uint[] memory a = new uint[](7);
            
            //不能修改长度
            //Error: Expression has to be an lvalue.
            //a.length = 100;
        }
        
        //storage
        uint[] b;
        
        function g(){
            b = new uint[](7);
            //可以修改storage的数组
            b.length = 10;
            b[9] = 100;
        }
    }

EVM的限制

由于EVM的限制，不能通过外部函数直接返回动态数组和多维数组

1. 将stroage数组不能直接返回，需要转换成memory类型的返回
```
      //Data层数据
      struct Rate {
      		int key1;
            int unit;
            uint[3] exDataArr;
            bytes32[3] exDataStr;
        }
    
        mapping(int =>Rate) Rates;
     function getRate(int key1) public constant returns(int,uint[3],bytes32[3]) {
            uint[3] memory exDataInt = Rates[key1].exDataArr;
            bytes32[3] memory exDataStr = Rates[key1].exDataStr;
            return (Rates[key1].unit,exDataInt,exDataStr);
        }
```
业务场景

### 6.5 函数

function (<parameter types>) {internal(默认)|external} constant [returns (<return types>)]

#### 6.5.1 函数的internal与external

[例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

```
    pragma solidity ^0.4.5;
    
    contract FuntionTest{
        function internalFunc() internal{}
    
        function externalFunc() external{}
    
        function callFunc(){
            //直接使用内部的方式调用
            internalFunc();
    
            //不能在内部调用一个外部函数，会报编译错误。
            //Error: Undeclared identifier.
            //externalFunc();
    
            //不能通过`external`的方式调用一个`internal`
            //Member "internalFunc" not found or not visible after argument-dependent lookup in contract FuntionTest
            //this.internalFunc();
    
            //使用`this`以`external`的方式调用一个外部函数
            this.externalFunc();
        }
    }
    contract FunctionTest1{
        function externalCall(FuntionTest ft){
            //调用另一个合约的外部函数
            ft.externalFunc();
            
            //不能调用另一个合约的内部函数
            //Error: Member "internalFunc" not found or not visible after argument-dependent lookup in contract FuntionTest
            //ft.internalFunc();
        }
    }
```

访问函数有外部(external)可见性。如果通过内部(internal)的方式访问，比如直接访问，你可以直接把它当一个变量进行使用，但如果使用外部(external)的方式来访问，如通过this.，那么它必须通过函数的方式来调用。

[例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

```

    pragma solidity ^0.4.2;
    
    contract SimpleStartDemo {
        uint public c = 10;
        
        function accessInternal() returns (uint){
            return c;
        }
        
        function accessExternal() returns (uint){
            return this.c();
        }
    }
```

#### 6.5.2 函数调用

- 内部调用，不会创建一个EVM调用，也叫消息调用
- 外部调用，创建EVM调用，会发起消息调用

#### 6.5.3 函数修改器(Function Modifiers)

修改器(Modifiers)可以用来轻易的改变一个函数的行为。比如用于在函数执行前检查某种前置条件。修改器是一种合约属性，可被继承，同时还可被派生的合约重写(override)

[例子](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.10+commit.f0d539ae.js&optimize=false)

```

    pragma solidity ^0.4.2;
    
    contract SimpleStartDemo {
        int256 storedData;
        event AddMsg(address indexed sender, bytes32 msg);
    
        modifier only_with_at_least(int x) {
           if (x >= 5) {
             x = x+10;
              _;
           }
        } 
        function setData(int256 x) public only_with_at_least(x){
            storedData = x;
            AddMsg(msg.sender, "[in the set() method]");
        }
    }
```


#### 6.5.4合约构造函数  同名函数

- 可选
- 仅能有一个构造器
- 不支持重载



### 6.6 Constant

函数也可被声明为常量，这类函数将承诺自己不修改区块链上任何状态。

一般从链上获取数据时，get函数都会加上constant

### 6.7 继承(Inheritance)

Solidity通过复制包括多态的代码来支持多重继承。

父类
```
    pragma solidity ^0.4.4;
    
    contract Meta {
        string  public name;
        string  public abi;
        address metaAddress;
    
        function Meta(string n,string a){
            name=n;
            abi=a;
        }
       
        function getMeta()public constant returns(string,string,address){
            return (name,abi,metaAddress);
        }
       
        function setMetaAddress(address meta) public {
            metaAddress=meta;
        }    
    }
```

子类
```
    pragma solidity ^0.4.4;
    
    import "Meta.sol";
    contract Demo is Meta{
        bytes32 public orgID; 
    
        function Demo (string n,string abi,bytes32 id) Meta(n,abi)
        {
        	orgID = id;
        }
    }

```



## 7. 限制

    基于EVM的限制，不能通过外部函数返回动态的内容

## 8. 架构

[架构说明](https://github.com/FISCO-BCOS/Wiki/tree/master/%E6%B5%85%E8%B0%88%E4%BB%A5%E5%A4%AA%E5%9D%8A%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%8D%87%E7%BA%A7%E6%96%B9%E6%B3%95%EF%BB%BF)

## 9. 参考资料
- [以太坊白皮书](https://github.com/EthFans/wiki/wiki/%E4%BB%A5%E5%A4%AA%E5%9D%8A%E7%99%BD%E7%9A%AE%E4%B9%A6)
- [0xproject.com](https://0xproject.com/wiki#Architecture)
- [aragon-core](https://github.com/cristicmf/aragon-core)
- [blog.zeppelin.solutions](https://blog.zeppelin.solutions/)
- [solidity-workshop](https://github.com/androlo/solidity-workshop/blob/master/tutorials/2016-06-30-contract-oriented-programming-I.md)
- [condition-orientated-programming](https://medium.com/@gavofyork/condition-orientated-programming-969f6ba0161a)
- [区块链技术](http://www.tryblockchain.org/index.html)
  
