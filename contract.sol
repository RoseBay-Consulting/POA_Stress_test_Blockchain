pragma solidity ^0.4.20;
contract TestGenerator{
   event LogOfCauidGen(bytes32 cauid,uint uid);
   bytes32 public cauid;
function getID(uint uid,bytes32 _plid, bytes32 _iid)public  returns(bytes32){
    cauid = sha256(_plid, _iid);
    LogOfCauidGen(cauid,uid);
    return(cauid);    
}
}