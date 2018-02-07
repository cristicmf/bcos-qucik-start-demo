pragma solidity ^0.4.2;

    contract simpleDemo {

        string  CA_ID;
        event AddMsg(address indexed sender, bytes32 msg);

        function set(string CA){
           // CA_ID.push(CA);
                CA_ID = CA;
                AddMsg(msg.sender, "[in the write() method]");

        }

        function get() constant returns (string){
            string memory a = CA_ID;
            AddMsg(msg.sender, "[in the Call() method]");
            return a;
        }
    }
