// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Hello.sol";

contract HelloV2 is Hello {
    uint256 public lastUpdated;

    /// @dev New initializer for HelloV2
    function InitializerV2() public initializer {
        // Call the initializer of the parent contract Hello
        Hello.initialize("Initial message"); // Ensure the parent is initialized
        // Initialize new state variables for this contract
        lastUpdated = block.timestamp;
    }

    //override the setMessage function to include a timestamp and restrict access to only owner
    function updateMessage(string memory _newMessage) public override {
        super.updateMessage(_newMessage);
        lastUpdated = block.timestamp;
    }
    // Function to get the message along with the timestamp
    function getMessageWithTimestamp()
        public
        view
        returns (string memory, uint256)
    {
        return (getMessage(), lastUpdated);
    }
}