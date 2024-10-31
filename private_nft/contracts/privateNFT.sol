// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract privateNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("PrivateRapper", "pRPr")
        Ownable(initialOwner)
    {}

    /// @dev Wraps SWTR to pRPr.
    /// @dev Suppressing the Transfer event for privacy.
    receive() external payable {
        _mint(_msgSender(), msg.value);
    }

    function mintNFT(address _to, string memory _tokenURI)
        public
        payable
        onlyOwner
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        console.log("The NFT ID %s has been minted to %s", tokenId, msg.sender);
    }

    /**
@dev function to override the owner function form Ownable contract to restrict access to only to owner of contract cann view */
    function owner() public view override returns (address) {
        address currentOwner = super.owner();
        require(
            msg.sender == currentOwner,
            "PrivateNFT: Not authorized to view this information"
        );
        return currentOwner;
    }


    /**
    @dev Override ownerOf to restrict access to only the NFT owner
*/
    function ownerOf(uint256 _tokenId)
        public
        view
        override(IERC721, ERC721)
        returns (address)
    {
        // Get the actual owner of the NFT by calling the parent contract's ownerOf
        address nftOwner = super.ownerOf(_tokenId);

        // Only the owner or an approved address can query the ownership
        require(
            msg.sender == super.ownerOf(_tokenId),
            "PrivateNFT: Not authorized to view this information"
        );

        return nftOwner;
    }

    /** @dev Override balanceOf to restrict access to only the NFT owner */
    function balanceOf(address _owner)
        public
        view
        override(IERC721, ERC721)
        returns (uint256)
    {
        // Get the actual balance of the NFT by calling the parent contract's balanceOf
        uint256 nftBalance = super.balanceOf(_owner);

        // Restrict access: require that the caller is the owner of the NFT
        require(
            msg.sender == _owner,
            "PrivateNFT: Not authorized to view this information"
        );

        return nftBalance;
    }

    /** @dev override the _update internal function to not emit transfer events  */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);

        // Perform (optional) operator check
        if (auth != address(0)) {
            _checkAuthorized(from, auth, tokenId);
        }

        // Execute the update
        if (from != address(0)) {
            // Clear approval. No need to re-authorize or emit the Approval event
            _approve(address(0), tokenId, address(0), false);

            unchecked {
                _balances[from] -= 1;
            }
        }

        if (to != address(0)) {
            unchecked {
                _balances[to] += 1;
            }
        }

        _owners[tokenId] = to;

        // suppress transfer events for privacy
        // emit Transfer(from, to, tokenId);

        return from;
    }

    // The following functions are overrides required by Solidity.
    ///@dev // Override tokenURI to make it private
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        if (msg.sender != ownerOf(tokenId) && msg.sender != owner())
            revert("PrivateNFT: Not authorized to view this information");

        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    fallback() external payable {}

    //
}
