pragma solidity ^0.6.0;

import '@openzeppelin/contracts/access/AccessControl.sol';
import './constant.sol';

contract RoleControl is AccessControl {
    address public admin;

    constructor() public {
        admin = msg.sender;
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function isAuthority(address user) external returns (bool) {
        return hasRole(Constant.ROLE_AUTHORITY, user);
    }

    function addAuthority(address user) public {
        require(msg.sender == admin, "User is not admin!");
        grantRole(Constant.ROLE_AUTHORITY, user);
    }

    function countAuthorities() external returns (uint) {
        return getRoleMemberCount(Constant.ROLE_AUTHORITY);
    }
}