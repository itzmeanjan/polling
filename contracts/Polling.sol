// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;


contract Polling {
    address payable public author;
    uint8 maxPollOptionCount;

    struct PollOption {
        string content;
        uint256 voteCount;
    }

    struct Poll {
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
        mapping(uint256 => bytes32) ids;
    }

    mapping(address => User) users;
    address[] userAddresses;

    mapping(bytes32 => Poll) polls;
    mapping(bytes32 => address) pollIdToUser;
    bytes32[] pollIds;

    event UserCreated(string name, address identifier);
    event PollCreated(string name, address identifier, bytes32 pollId);

    constructor() public {
        author = msg.sender;
        maxPollOptionCount = 4;
    }

    modifier onlyAuthor() {
        require(author == msg.sender, "You're not author !");
        _;
    }

    modifier isValidMaxPollOptionCount(uint8 count) {
        require(
            count >= 2 && count <= 16,
            "Max poll option count out of range !"
        );
        _;
    }

    function setMaxPollOptionCount(uint8 count)
        external
        onlyAuthor
        isValidMaxPollOptionCount(count)
    {
        maxPollOptionCount = count;
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

        poll.creator = msg.sender;
        poll.title = _title;
        poll.timeStamp = now;

        users[msg.sender].ids[users[msg.sender].pollCount] = pollId;
        users[msg.sender].pollCount++;

        polls[pollId] = poll;
        pollIdToUser[pollId] = msg.sender;
        pollIds.push(pollId);

        emit PollCreated(users[msg.sender].name, msg.sender, pollId);

        return pollId;
    }

    modifier canAddPollOption(bytes32 _pollId) {
        require(pollIdToUser[_pollId] == msg.sender, "You're not allowed !");
        _;
    }

    function addPollOption(bytes32 _pollId, string memory _pollOption)
        public
        canAddPollOption(_pollId)
    {
        PollOption memory pollOption;

        pollOption.content = _pollOption;

        Poll storage poll = polls[_pollId];
        poll.pollOptions[poll.pollOptionCount] = pollOption;
        poll.pollOptionCount++;
    }
}
