// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;


contract Polling {
    address payable public author;

    struct PollOption {
        uint256 index;
        string content;
        uint256 voteCount;
    }

    struct Poll {
        bytes32 id;
        address creator;
        string title;
        uint256 timeStamp;
        PollOption[] options;
    }

    struct User {
        string name;
        bool created;
        Poll[] polls;
    }

    mapping(address => User) users;
    address[] userAddresses;

    event UserCreated(string name, address identifier);
    event PollCreated(string name, address identifier, bytes32 pollId);

    constructor() public {
        author = msg.sender;
    }

    modifier canCreateAccount() {
        require(!users[msg.sender].created, "User already exists !");
        _;
    }

    function createUser(string memory _name) public canCreateAccount {
        users[msg.sender].name = _name;
        users[msg.sender].created = true;
        userAddresses.push(msg.sender);

        emit UserCreated(_name, msg.sender);
    }

    modifier canCreatePoll() {
        require(users[msg.sender].created, "User account doesn't exist !");
        _;
    }

    function createPoll(string memory _title)
        public
        canCreatePoll
        returns (bytes32)
    {
        bytes32 pollId = keccak256(abi.encode(_title));
        Poll memory poll;

        poll.id = pollId;
        poll.creator = msg.sender;
        poll.title = _title;
        poll.timeStamp = now;

        users[msg.sender].polls.push(poll);

        emit PollCreated(users[msg.sender].name, msg.sender, pollId);

        return pollId;
    }
}
