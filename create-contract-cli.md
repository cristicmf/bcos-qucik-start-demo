# 快速构建合约项目

### 1. Clone
```
$ sudo npm install -g bcos-qucik-start-demo
```

### 2. Create Contract
bcos-qucik-start-demo [param]
```
$ bcos-qucik-start-demo contract-demo
```
说明：
```
command:bcos-qucik-start-demo
项目名称：contract-demo 可以自定义为其他的名称
```

### 3. 部署和测试合约接口
操作步骤
```
$ cd contract-demo
$ npm install
$ babel-node index.js
```
### 4. 相关说明
该项目只包含了合约编译，部署，测试常用的工具库

### 5. 文件结构说明
```
contract-demo
├── README.md
├── SimpleStartDemo.sol  # 合约代码
├── codeUtils.js
├── config.js  # 项目配置文件
├── index.js   # 部署合约和测试合约
├── output     # abi/bin／address的输出
│   ├── StartDemo.abi
│   ├── StartDemo.address
│   └── StartDemo.bin
├── package.json
├── sha3.js
└── web3sync.js
```
