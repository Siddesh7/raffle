// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./raffle.sol"; 

contract RaffleFactory is Ownable {

    mapping(address => address[]) public deployedRaffles;
    address[] public deployedContracts;
    uint256 public commisionRate;
    address public commisionAddress;

    constructor(uint256 _commisionRate, address _commisionAddress) Ownable(msg.sender) {
        commisionRate = _commisionRate;
        commisionAddress = _commisionAddress;
    }
 
    function deployRaffle(
        IERC721 _prizeNFT,
        uint256 _prizeNFTId,
        uint256 _entryFee,
        uint256 _ticketLimit,
        bool _ticketBound,
        IERC20 _acceptedPaymentToken,
         string memory _auctionName

    ) public payable {
        Raffle raffle = new Raffle(
            _prizeNFT,
            _prizeNFTId,
            _entryFee,
            _ticketLimit,
            _ticketBound,
            _acceptedPaymentToken,
            msg.sender,
            _auctionName,
            commisionRate,
            commisionAddress

        );


        deployedRaffles[msg.sender].push(address(raffle));
        deployedContracts.push(address(raffle));
        _prizeNFT.transferFrom(msg.sender, address(raffle), _prizeNFTId);
    }


    function getDeployedRaffle(address deployer) public view returns (address[] memory) {
        return deployedRaffles[deployer];
    }
    function getAllDeployedRaffles() public view returns (address[] memory) {
        return deployedContracts;
    }

    function setNewCommisionParams(uint256 _newCommisionRate, address _newCommisionreceiver) public onlyOwner{
        commisionRate= _newCommisionRate;
        commisionAddress=_newCommisionreceiver;
    }
}
