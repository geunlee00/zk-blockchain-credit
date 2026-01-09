// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditSBT is ERC721, Ownable {
    uint256 private _nextTokenId;
    address public verifier;

    // Mapping from token ID to credit score tier (mock data)
    mapping(uint256 => uint256) public creditTiers;

    constructor(address _verifier) ERC721("PublicDataCredit", "PDC") Ownable(msg.sender) {
        verifier = _verifier;
    }

    function setVerifier(address _verifier) external onlyOwner {
        verifier = _verifier;
    }

    // Soulbound: Prevent transfers
    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
        revert("SBT: Transfer not allowed");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override(ERC721) {
        revert("SBT: Transfer not allowed");
    }

    function mint(bytes memory proof, uint256[] memory pubSignals) external {
        // ... (existing logic)
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        if (pubSignals.length > 0) {
            creditTiers[tokenId] = pubSignals[0];
        } else {
            creditTiers[tokenId] = 1;
        }
    }

    // [New] Admin-only minting for Gasless transactions
    function mintTo(address to, bytes memory proof, uint256[] memory pubSignals) external onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId); // Mint to the user (to), not msg.sender (Admin)
        
        if (pubSignals.length > 0) {
            creditTiers[tokenId] = pubSignals[0];
        } else {
            creditTiers[tokenId] = 1; 
        }
    }
}
