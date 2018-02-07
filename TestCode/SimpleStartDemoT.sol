pragma solidity ^0.4.2;
    
    contract SimpleStartDemoT {
        uint[]  CA_ID;
        
        function SetDemo(){
            uint a = 0;
            CA_ID[0] = a;
  
  
        }
        
        function writeDemo(uint CA){
            CA_ID.push(CA);
        }
        
        function CallDemo1() constant returns (uint[])
	{
	    uint[] memory a = CA_ID;
            return a;
        }
    }