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
        uint256 startTimeStamp;
        uint256 endTimeStamp;
        uint256 totalVotesCasted;
        uint8 pollOptionCount;
        mapping(uint8 => PollOption) pollOptions;
        mapping(address => uint8) votes;
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
    event PollIsLive(string name, address identifier, bytes32 pollId);

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

        users[msg.sender].ids[users[msg.sender].pollCount] = pollId;
        users[msg.sender].pollCount++;

        polls[pollId] = poll;
        pollIdToUser[pollId] = msg.sender;
        pollIds.push(pollId);

        return pollId;
    }

    modifier didYouCreatePoll(bytes32 _pollId) {
        require(pollIdToUser[_pollId] == msg.sender, "You're not allowed !");
        _;
    }

    modifier canAddPollOption(bytes32 _pollId) {
        require(
            polls[_pollId].pollOptionCount < maxPollOptionCount,
            "Reached max poll option count !"
        );
        _;
    }

    function addPollOption(bytes32 _pollId, string memory _pollOption)
        public
        didYouCreatePoll(_pollId)
        isPollAlreadyLive(_pollId)
        canAddPollOption(_pollId)
    {
        PollOption memory pollOption;

        pollOption.content = _pollOption;

        Poll storage poll = polls[_pollId];
        poll.pollOptions[poll.pollOptionCount] = pollOption;
        poll.pollOptionCount++;
    }

    modifier isPollAlreadyLive(bytes32 _pollId) {
        require(
            polls[_pollId].startTimeStamp != 0 &&
                polls[_pollId].endTimeStamp != 0,
            "Poll already live !"
        );
        _;
    }

    modifier areEnoughPollOptionsSet(bytes32 _pollId) {
        require(
            polls[_pollId].pollOptionCount >= 2,
            "Atleast 2 options required !"
        );
        _;
    }

    modifier isPollEndTimeValid(bytes32 _pollId, uint8 _hours) {
        require(
            _hours > 0 && _hours <= 72,
            "Poll can be live for >= 1 hour && <= 72 hours"
        );
        _;
    }

    function makePollLive(bytes32 _pollId, uint8 _activeForHours)
        public
        didYouCreatePoll(_pollId)
        isPollAlreadyLive(_pollId)
        areEnoughPollOptionsSet(_pollId)
        isPollEndTimeValid(_pollId, _activeForHours)
    {
        polls[_pollId].startTimeStamp = now;
        polls[_pollId].endTimeStamp = now + (_activeForHours * 1 hours);

        emit PollIsLive(users[msg.sender].name, msg.sender, _pollId);
    }

    modifier checkPollExistance(bytes32 _pollId) {
        require(pollIdToUser[_pollId] != address(0), "Poll doesn't exist !");
        _;
    }

    modifier isPollLive(bytes32 _pollId) {
        require(
            polls[_pollId].startTimeStamp <= now &&
                polls[_pollId].endTimeStamp > now,
            "Poll not live !"
        );
        _;
    }

    modifier checkDuplicateVote(bytes32 _pollId) {
        require(
            polls[_pollId].votes[msg.sender] == 0,
            "Attempt to cast duplicate vote !"
        );
        _;
    }

    modifier isValidOptionToCastVote(bytes32 _pollId, uint8 _option) {
        require(
            _option >= 0 && _option < polls[_pollId].pollOptionCount,
            "Invalid option, can't cast vote !"
        );
        _;
    }

    function castVote(bytes32 _pollId, uint8 _option)
        public
        checkPollExistance(_pollId)
        isPollLive(_pollId)
        checkDuplicateVote(_pollId)
        isValidOptionToCastVote(_pollId, _option)
    {
        Poll storage poll = polls[_pollId];
        poll.totalVotesCasted++;
        poll.pollOptions[_option].voteCount++;
        poll.votes[msg.sender] = _option + 1;
    }

    // Added check for poll activation
    function isPollActive(bytes32 _pollId) public view returns (bool) {
        return
            polls[_pollId].startTimeStamp <= now &&
            polls[_pollId].endTimeStamp > now;
    }

    // Given number of recent active polls required, returns a list of them
    function getRecentXActivePolls(uint8 x)
        public
        view
        returns (bytes32[] memory)
    {
        require(x > 0, "Can't return 0 recent polls !");

        bytes32[] memory recentPolls = new bytes32[](x);
        uint8 idx = 0;

        for (uint256 i = pollIds.length - 1; i >= 0 && idx < x; i--) {
            if (isPollActive(pollIds[i])) {
                recentPolls[idx] = pollIds[i];
                idx++;
            }
        }

        return recentPolls;
    }

    // Checks whether given address has account or not ( in this platform )
    // if yes, they are allowed to proceed further
    modifier accountCreated(address _addr) {
        require(users[_addr].created, "Account not found !");
        _;
    }

    // Returns person name at account in given address
    function getAccountNameByAddress(address _addr)
        public
        view
        accountCreated(_addr)
        returns (string memory)
    {
        return users[_addr].name;
    }

    // Get person name of invoker account
    function getMyAccountName() public view returns (string memory) {
        return getAccountNameByAddress(msg.sender);
    }

    // Returns number of polls created by given address
    function getAccountPollCountByAddress(address _addr)
        public
        view
        accountCreated(_addr)
        returns (uint256)
    {
        return users[_addr].pollCount;
    }

    // Returns number of poll created by this account
    function getMyPollCount() public view returns (uint256) {
        return getAccountPollCountByAddress(msg.sender);
    }

    // Returns unique pollId, given creator address & index of
    // poll ( >= 0 && < #-of all polls created by creator )
    function getPollIdByAddressAndIndex(address _addr, uint256 index)
        public
        view
        accountCreated(_addr)
        returns (bytes32)
    {
        require(
            index < users[_addr].pollCount,
            "Invalid index for looking up PollId !"
        );

        return users[_addr].ids[index];
    }

    // Given poll index ( < number of polls created by msg.sender ),
    // it'll lookup pollId from my account
    function getMyPollIdByIndex(uint256 index) public view returns (bytes32) {
        return getPollIdByAddressAndIndex(msg.sender, index);
    }

    // Given pollId, returns account which created this poll
    function getCreatorAddressByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (address)
    {
        return pollIdToUser[_pollId];
    }

    // Returns title of poll, by given pollId
    function getTitleByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (string memory)
    {
        return polls[_pollId].title;
    }

    // Get timestamp when poll was set active
    function getStartTimeByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (uint256)
    {
        return polls[_pollId].startTimeStamp;
    }

    // Get timestamp when poll will go deactive
    function getEndTimeByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (uint256)
    {
        return polls[_pollId].endTimeStamp;
    }

    // Given pollId, looks up total #-of votes casted
    function getTotalVotesCastedByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (uint256)
    {
        return polls[_pollId].totalVotesCasted;
    }

    // Given pollId, returns number of options present
    function getPollOptionCountByPollId(bytes32 _pollId)
        public
        view
        checkPollExistance(_pollId)
        returns (uint8)
    {
        return polls[_pollId].pollOptionCount;
    }

    // Given pollId & option index, returns content of that option
    function getPollOptionContentByPollIdAndIndex(bytes32 _pollId, uint8 index)
        public
        view
        checkPollExistance(_pollId)
        returns (string memory)
    {
        require(
            index < polls[_pollId].pollOptionCount,
            "Invalid index for looking up PollOption !"
        );

        return polls[_pollId].pollOptions[index].content;
    }

    // Given pollId & option index, returns votes casted on that option
    function getPollOptionVoteCountByPollIdAndIndex(
        bytes32 _pollId,
        uint8 index
    ) public view checkPollExistance(_pollId) returns (uint256) {
        require(
            index < polls[_pollId].pollOptionCount,
            "Invalid index for looking up PollOption !"
        );

        return polls[_pollId].pollOptions[index].voteCount;
    }
}
