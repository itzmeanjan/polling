// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;


contract Polling {
    address payable public author;

    struct PollOption {
        string content;
        uint256 voteCount;
    }

    struct Poll {
        bytes32 id;
        address creator;
        string title;
        uint256 timeStamp;
        uint256 pollOptionCount;
        mapping(uint256 => PollOption) pollOptions;
    }

    struct User {
        string name;
        bool created;
        uint256 pollCount;
        mapping(uint256 => Poll) polls;
    }

    mapping(address => User) users;
    address[] userAddresses;

    mapping(bytes32 => address) pollIdToUser;
    bytes32[] pollIds;

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
        User memory user;

        user.name = _name;
        user.created = true;

        users[msg.sender] = user;
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
        bytes32 pollId = keccak256(
            abi.encodePacked(_title, msg.sender, users[msg.sender].pollCount)
        );
        Poll memory poll;

        poll.id = pollId;
        poll.creator = msg.sender;
        poll.title = _title;
        poll.timeStamp = now;

        users[msg.sender].polls[users[msg.sender].pollCount] = poll;
        users[msg.sender].pollCount++;

        pollIdToUser[pollId] = msg.sender;
        pollIds.push(pollId);

        emit PollCreated(users[msg.sender].name, msg.sender, pollId);

        return pollId;
    }

    function addPollOption(bytes32 _pollId, string memory _pollOption) public {}
}
