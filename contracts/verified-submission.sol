pragma solidity >=0.4.22;

import './sequence.sol';
import './access.sol';
import './submission.sol';

contract VerifiedSequence {
    SubmittedSequence public sequence;

    constructor(SubmittedSequence submitted) public {
        sequence = submitted;
    }
}