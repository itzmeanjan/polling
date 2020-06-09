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
        bool created;
        Poll[] polls;
    }

    mapping(address => User) users;
    address[] userAddresses;

    event UserCreated(string name, address identifier, string comment);

    constructor() public {
        author = msg.sender;
    }

    modifier checkUserExistence() {
        require(!users[msg.sender].created, "User already exists !");
        _;
    }

    function createUser(string memory _name) public checkUserExistence {
        users[msg.sender].name = _name;
        users[msg.sender].created = true;
        userAddresses.push(msg.sender);

        emit UserCreated(_name, msg.sender, "User created");
    }
}
