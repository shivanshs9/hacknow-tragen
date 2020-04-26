pragma solidity >=0.4.22;

import './sequence.sol';
import './access.sol';
import './verified-submission.sol';

contract SubmittedSequence {
    SequenceMetadata public data;
    RoleControl private accessControl;

    address public owner;
    struct Votes {
        uint approves;
        uint rejects;
    }
    Votes votes = Votes(0, 0);

    event SequenceVerified(VerifiedSequence sequence);

    constructor(SequenceMetadata metadata, RoleControl role) public {
        owner = msg.sender;
        data = metadata;
        accessControl = role;
    }

    modifier onlyAuthority {
        require(accessControl.isAuthority(msg.sender), "User is not authorised!");
        _;
    }

    function checkVerified() internal {
        uint total = votes.approves - votes.rejects;
        if (total >= accessControl.countAuthorities() / 2) {
            // if verified by majority (hacky PoA)
            VerifiedSequence verified = new VerifiedSequence(this);
            emit SequenceVerified(verified);
        }
    }

    function approve()
    public
    onlyAuthority()
    {
        votes.approves++;
        checkVerified();
    }

    function reject()
    public
    onlyAuthority()
    {
        votes.rejects++;
    }
}