// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hello_Swisstronik {

    string private message;

    event MessageUpdated(string oldMessage, string newMessage);

    /// @dev Initializes the message variable for the contract
    /// @param _message A string to store in this contract
    constructor(string memory _message) payable {
        message = _message;
    }

    /// @dev updateMessage updates the value of the message variable
    /// @param _newMessage The new value of the message
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        emit MessageUpdated(message, _newMessage);
    }

    /// @dev getMessage returns the value of the message variable
    /// @return string The value of the message associated with the contract
    function getMessage() public view returns(string memory) {
        return message;
    }
}
