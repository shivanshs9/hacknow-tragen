pragma solidity >=0.4.22;

contract SequenceMetadata {
    bytes32 public hash; // sha256 hash of metadata
    
    constructor(bytes32 hashed) public {
        hash = hashed;
    }
}