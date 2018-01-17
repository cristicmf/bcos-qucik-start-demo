# BCOS智能合约客户端开发指导

## 概要
本文档主要提供基于BOSC区块链系统的智能合约应用开发指导，使得开发者能够使用流行的编程语言如Java、Nodejs等进行应用开发。 本文档中包含API介绍及其源码工程， 它们通过简单的范例介绍开发智能合约的方法， 帮助开发者快速入门区块链应用开发。

## 运行环境
* 操作系统：Ubuntu （建议16.04） 或 CentOS （建议7.0）
* BCOS区块链客户端

## 智能合约
智能合约语法及细节参考 **[solidity官方文档](https://solidity.readthedocs.io/en/develop/solidity-in-depth.html)** ，  **BCOS区块链客户端**建议使用solidity编译器版本指定为0.4.2及以上， 合约编写可以使用任何文本编辑器(推荐使用sublime或vs code+solidity插件)。

### 合约范例
这里例举一个简单的solidity智能合约，仅仅提供数据设置set和读取get方法，其中set为交易类型（Transaction）方法，get为call类型方法。在本文档中将使用这个范例作为唯一合约，展示如何构建操作SimpleStorage智能合约的应用程序。范例如下：
```
pragma solidity ^0.4.2;

contract SimpleStorage {
    uint storedData;

    function SimpleStorage() {
        storedData = 5;
    }

    function set(uint x) public {
        storedData = x;
    }

    function get() constant public returns (uint _ret) {
        _ret = storedData;
    }
}
```

## Nodejs智能合约客户端开发
[quickstart](https://github.com/cristicmf/bcos-qucik-start-demo/tree/master/projects/nodejs/startDemo)

### It features: 
- write a simple smart contract
- deploy a contract
### Quick Start:
- running the startDemo

``` sh
 $ cd startDemo
 $ npm install
 $ babel-node index.js
```
*********************************************************
[web3j开发库]:https://github.com/bcosorg/bcos/blob/master/tool/java/output/
[第三方依赖库]:https://github.com/bcosorg/bcos/blob/master/tool/java/third-part/
[BCOS使用文档]:https://github.com/bcosorg/bcos/blob/master/doc/manual/manual.md
[BCOS工具包]:https://github.com/bcosorg/bcos/blob/master/sample/dependencies/BCOS-Tools.tar.gz
[web3j]:https://docs.web3j.io/
