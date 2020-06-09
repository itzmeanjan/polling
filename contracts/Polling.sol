pragma solidity ^0.6.6;


contract Polling {
    address public author;

    struct Poll {
        bytes32 id;
        address creator;
        string content;
        uint256 timeStamp;
    }

    struct User {
        string name;
        address identifier;
        Poll[] polls;
    }

    constructor() public {
        author = msg.sender;
    }
}
