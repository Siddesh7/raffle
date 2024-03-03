pragma solidity ^0.8.0;

// Import necessary libraries
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Raffle {


    // State variables
    IERC721 public prizeNFT; // Address of the ERC721 contract for the prize NFT
    uint256 public prizeNFTId; // ID of the prize NFT
    uint256 public entryFee; // Entry fee per ticket
    uint256 public ticketLimit; // Maximum number of tickets that can be sold
    IERC20 public acceptedPaymentToken;
    bool public ticketBound;
    // Mapping to store ticket information (ticketId => Ticket)
    mapping(uint256 => address) public tickets;

    // Keeps track of the current number of tickets sold
    uint256 public numTicketsSold;

    // Modifier to restrict functions to be called only by the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Address of the contract owner
    address public owner;

    constructor(
        IERC721 _prizeNFT,
        uint256 _prizeNFTId,
        uint256 _entryFee,
        uint256 _ticketLimit,
        bool _ticketBound,
        IERC20 _acceptedPaymentToken,
        address _owner
    ) {
        require(_entryFee > 0, "Entry fee must be greater than zero");
        require(_ticketLimit > 0, "Ticket limit must be greater than zero");


        prizeNFT = _prizeNFT;
        prizeNFTId = _prizeNFTId;
        entryFee = _entryFee;
        ticketLimit = _ticketLimit;
        owner = _owner;
        ticketBound= _ticketBound;
        acceptedPaymentToken= _acceptedPaymentToken;
   

    }


    // Function to allow users to purchase tickets
    function buyTicket() public payable {
        require(prizeNFT.balanceOf(address(this))==1, "No NFT found in the contract");
        require(acceptedPaymentToken.balanceOf(msg.sender) >= entryFee, "Insufficient funds to buy a ticket");
        require(acceptedPaymentToken.allowance(msg.sender, address(this)) >= entryFee, "Insufficient token spend allowance to buy a ticket");
        require(numTicketsSold < ticketLimit, "Ticket limit reached");


       acceptedPaymentToken.transferFrom(msg.sender, address(this), entryFee);

       tickets[numTicketsSold] = msg.sender;

        numTicketsSold++;

       
    }

    // Function to randomly pick a winner and award the prize
    function pickWinner() public onlyOwner  {
        require(numTicketsSold > 0, "No tickets sold yet");
        require(prizeNFT.balanceOf(address(this))==1, "No NFT found in the contract");

        if(ticketBound){
            require(numTicketsSold==ticketLimit, "Tickets are not sold enough to pick a winner");
        }
        uint256 randomTicketId = uint256(blockhash(block.number - 1)) % (numTicketsSold );


        address winner = tickets[randomTicketId];

        // Transfer the prize NFT to the winner
        prizeNFT.transferFrom(address(this), winner, prizeNFTId);
        acceptedPaymentToken.transfer(owner, acceptedPaymentToken.balanceOf(address(this)));

    }

    // Function to allow the owner to withdraw any remaining funds after the raffle ends
    function withdrawRemainingFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

        function getRaffleInfo() public view returns (
        address, // Prize NFT address
        uint256, // Prize NFT ID
        uint256, // Entry fee
        uint256, // Ticket limit
        address, // Accepted payment token address
        bool, // Ticket bound flag
        uint256, // Number of tickets sold
        uint256 // Available tickets (ticketLimit - numTicketsSold)
    ) {
        return (
            address(prizeNFT),
            prizeNFTId,
            entryFee,
            ticketLimit,
            address(acceptedPaymentToken),
            ticketBound,
            numTicketsSold,
            ticketLimit - numTicketsSold
        );
    }
}
