pragma solidity ^0.6.6;


contract Polling {
    address payable public author;

    struct Poll {
        bytes32 id;
        address creator;
        string content;
        uint256 timeStamp;
    }

    struct User {
        string name;
        Poll[] polls;
    }

    mapping(address => User) users;
    address[] userAddresses;

    constructor() public {
        author = msg.sender;
    }

    function createUser(string memory _name) public {
        users[msg.sender].name = _name;
        userAddresses.push(msg.sender);
    }
}
