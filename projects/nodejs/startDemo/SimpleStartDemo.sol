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
