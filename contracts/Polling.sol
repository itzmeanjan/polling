pragma solidity ^0.6.6;

contract Polling {
    address public author;

    constructor() public {
        author = msg.sender;
    }
}