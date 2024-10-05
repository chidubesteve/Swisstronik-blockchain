// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./PERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PHOENIX_PERC20 is PERC20, Ownable {
    constructor(uint256 _initialSupply) PERC20("PHOENIX_PERC", "pPNX") {
        _mint(msg.sender, _initialSupply * 10 ** decimals());
    }

    /// @dev Wraps SWTR to pPNX.
    receive() external payable {
        _mint(_msgSender(), msg.value);
    }

    function transferToAddress(address _to, uint256 _amount) public onlyOwner {
        transfer(_to, _amount);
    }
}
