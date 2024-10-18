// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Hello is Initializable  {

    string private message;

    event MessageUpdated(string oldMessage, string newMessage);

    /// @dev The big difference between a normal contract and an upgradeable contract is that an upgradeable contract does not have a `constructor()` but instead an `initialize()` function, where you run all the setup logic

    ///@dev while Solidity ensures that a constructor is called only once in the lifetime of a contract, a regular function can be called many times. To prevent a contract from being initialized multiple times, you need to add a check to ensure the initialize function is called only once
    
    /// @dev Base initializer for Hello contract
    /// @param _message initial message to store in this contract
    function initialize(string memory _message) public onlyInitializing  {
        message = _message;
    }

    /// @dev updateMessage updates the value of the message variable
    /// @param _newMessage The new value of the message
    function updateMessage(string memory _newMessage) public virtual {
        message = _newMessage;
        emit MessageUpdated(message, _newMessage);
    }

    /// @dev getMessage returns the value of the message variable
    /// @return string The value of the message associated with the contract
    function getMessage() public view returns(string memory) {
        return message;
    }

    fallback() external payable {}
    receive() external payable {}
}
