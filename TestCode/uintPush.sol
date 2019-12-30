pragma solidity ^0.4.2;
    
    contract uintPush {
        uint[]  CA_ID;
        
        function setup(){
            uint a = 0;
            CA_ID[0] = a;
  
  
        }
        
        function set(uint CA){
            CA_ID.push(CA);
        }
        
        function get() constant returns (uint[])
	{
	    uint[] memory a = CA_ID;
            return a;
        }
    }
