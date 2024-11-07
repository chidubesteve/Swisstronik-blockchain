// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC721 {

   // event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    // event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    // event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
}

contract PrivateERC721 is IERC721 {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function balanceOf(address owner) external view override returns (uint256) {
        require(owner != address(0), "PrivateERC721: Non-zero Address");
        require(msg.sender == owner, "PrivateERC721: Caller must be owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token ID does not exist");
        require(
            msg.sender == owner || msg.sender == _tokenApprovals[tokenId],
            "PrivateERC721: Caller must be owner or approved"
        );
        return owner;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token ID does not exist");
        require(
            msg.sender == owner || msg.sender == _tokenApprovals[tokenId],
            "PrivateERC721: Caller is not owner nor approved"
        );
        require(from == owner, "PrivateERC721: Transfer from incorrect owner");
        require(to != address(0), "PrivateERC721: Transfer to the zero address");

        // Clear previous approvals
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        
        // emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public override {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token ID does not exist");
        require(msg.sender == owner, "PrivateERC721: Caller is not owner");
        require(to != owner, "PrivateERC721: Approval to current owner");

        _approve(to, tokenId);
           // emit Approval(ownerOf(tokenId), to, tokenId);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        require(_owners[tokenId] != address(0), "PrivateERC721: Token ID does not exist");
        return _tokenApprovals[tokenId];
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
    }

    function mintNFT(address to, uint256 tokenId) public {
        require(to != address(0), "PrivateERC721: Mint to the zero address");
        require(_owners[tokenId] == address(0), "PERC721: Token ID already exists");

        _balances[to] += 1;
        _owners[tokenId] = to;

          // emit Transfer(address(0), to, tokenId);
    }
}