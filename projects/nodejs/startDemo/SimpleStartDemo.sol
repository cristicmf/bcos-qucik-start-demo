pragma solidity ^0.4.2;

contract SimpleStartDemo {
    int256 storedData;

    function SimpleStartDemo() {
        storedData = 2;
    }

    function set(int256 x) public{
        storedData = x;
    }

    function get() constant public returns (int256 _ret) {
      return _ret = storedData;
    }
}
