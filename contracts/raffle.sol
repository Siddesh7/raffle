// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Raffle is ERC721, ERC721URIStorage, ERC721Burnable, Ownable{


    IERC721 public prizeNFT; // Address of the ERC721 contract for the prize NFT
    uint256 public prizeNFTId; // ID of the prize NFT
    uint256 public entryFee; // Entry fee per ticket
    uint256 public ticketLimit; // Maximum number of tickets that can be sold
    IERC20 public acceptedPaymentToken;
    bool public ticketBound;
    bool public isAuctionOpen;
    bool public isAuctionCancelled;
    address  public winner;
    uint256 private _nextTokenId;
    address public rafffleOwner;
    address public commisionAddress;
    uint256 public commision;
    string public auctionName;
    constructor(
        IERC721 _prizeNFT,
        uint256 _prizeNFTId,
        uint256 _entryFee,
        uint256 _ticketLimit,
        bool _ticketBound,
        IERC20 _acceptedPaymentToken,
        address _owner,
        string memory _auctionName,
        uint256 _commision,
        address _commisionAddress
    )   ERC721(_auctionName, _auctionName)
        Ownable(_owner)
        
{
        require(_entryFee > 0, "Entry fee must be greater than zero");
        require(_ticketLimit > 0, "Ticket limit must be greater than zero");
        prizeNFT = _prizeNFT;
        prizeNFTId = _prizeNFTId;
        entryFee = _entryFee;
        ticketLimit = _ticketLimit;
        ticketBound= _ticketBound;
        acceptedPaymentToken= _acceptedPaymentToken;
        isAuctionOpen = true; 
        rafffleOwner=_owner;
        auctionName=_auctionName;
        commision=_commision;
        commisionAddress=_commisionAddress;

    }


    // Function to allow users to purchase tickets
    function buyTicket() public {
        require(prizeNFT.balanceOf(address(this))==1, "No NFT found in the contract");
        require(acceptedPaymentToken.balanceOf(msg.sender) >= entryFee, "Insufficient funds to buy a ticket");
        require(acceptedPaymentToken.allowance(msg.sender, address(this)) >= entryFee, "Insufficient token spend allowance to buy a ticket");
        require(_nextTokenId < ticketLimit, "Ticket limit reached");
        require(isAuctionOpen, "Auction has ended");

        acceptedPaymentToken.transferFrom(msg.sender, address(this), entryFee);
        safeMint(msg.sender);
    }

    // Function to randomly pick a winner and award the prize
    function pickWinner() public onlyOwner  {
        require(_nextTokenId > 0, "No tickets sold yet");
        require(prizeNFT.balanceOf(address(this))==1, "No NFT found in the contract");

        if(ticketBound){
            require(_nextTokenId==ticketLimit, "Tickets are not sold enough to pick a winner");
        }
        uint256 randomTicketId = uint256(blockhash(block.number - 1)) % (_nextTokenId );

        winner = ownerOf(randomTicketId);

        // Close the auction
        isAuctionOpen = false;

        // Transfer the prize NFT to the winner
        prizeNFT.transferFrom(address(this), winner, prizeNFTId);
        uint256 balanceHeld= acceptedPaymentToken.balanceOf(address(this));
        // Transfer commission to commisionAddress
        uint256 commissionAmount = balanceHeld * commision / 100; // Calculate commission amount
        acceptedPaymentToken.transfer(commisionAddress, commissionAmount); // Transfer commission

        // Transfer remaining balance to rafffleOwner
        uint256 remainingBalance = balanceHeld - commissionAmount; // Calculate remaining balance
        acceptedPaymentToken.transfer(rafffleOwner, remainingBalance); // Transfer remaining balance


    }

    // Function to allow the owner to withdraw any remaining funds after the raffle ends
    function withdrawFunds() public {
        require(isAuctionCancelled, "Auction is not cancelled");
        require(balanceOf(msg.sender)>0, "You have no tickets");
        acceptedPaymentToken.transfer(msg.sender, entryFee * balanceOf(msg.sender));
    }

    function cancelAuctionAndWithdrawNFT() public onlyOwner {
        prizeNFT.transferFrom(address(this), rafffleOwner, prizeNFTId);
        isAuctionCancelled = true;
        isAuctionOpen = false;
    }


    function getRaffleInfo() public view returns (
        address, // Prize NFT address
        uint256, // Prize NFT ID
        uint256, // Entry fee
        uint256, // Ticket limit
        address, // Accepted payment token address
        bool, // Ticket bound flag
        uint256, // Number of tickets sold
        uint256, // Available tickets (ticketLimit - numTicketsSold)
        bool,
        bool,
        string memory,
        address
    ) {
        return (
            address(prizeNFT),
            prizeNFTId,
            entryFee,
            ticketLimit,
            address(acceptedPaymentToken),
            ticketBound,
            _nextTokenId,
            ticketLimit - _nextTokenId,
            isAuctionOpen,
            isAuctionCancelled,
            auctionName,
            winner
        );
    }


    function safeMint(address to) internal {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, "https://bafkreidip4m6z74xjuqrjmm37fqwgc5l7njbivggrmz2poatdxpvg4o2zm.ipfs.nftstorage.link/");
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
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

}
