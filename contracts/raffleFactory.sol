pragma solidity ^0.8.0;

// Import necessary libraries
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./raffle.sol"; 

contract RaffleFactory {

    // Mapping to store deployed Raffle contracts (deployer => address)
    mapping(address => address) public deployedRaffles;
    address[] public deployedContracts;

    // Function to deploy a new Raffle contract
    function deployRaffle(
        IERC721 _prizeNFT,
        uint256 _prizeNFTId,
        uint256 _entryFee,
        uint256 _ticketLimit,
        bool _ticketBound,
        IERC20 _acceptedPaymentToken
    ) public payable {
        // Create a new Raffle instance
        Raffle raffle = new Raffle(
            _prizeNFT,
            _prizeNFTId,
            _entryFee,
            _ticketLimit,
            _ticketBound,
            _acceptedPaymentToken,
            msg.sender
        );

        // Store the deployed address in the mapping
        deployedRaffles[msg.sender] = address(raffle);
        deployedContracts.push(address(raffle));
        _prizeNFT.transferFrom(msg.sender, address(raffle), _prizeNFTId);


    }

    // Function to get the address of a deployed Raffle contract
    function getDeployedRaffle(address deployer) public view returns (address) {
        return deployedRaffles[deployer];
    }
    function getAllDeployedRaffles() public view returns (address[] memory) {
        return deployedContracts;
    }


}
