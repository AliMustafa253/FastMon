pragma solidity >=0.6.0;

import "./initializeGame.sol";

contract projectGame is initializeGame {
    //--------------------Variables----------------------

    // using SafeMath for uint256;
    // using SafeMath16 for uint16;
    uint256 public currentRound = 1;
    uint256 public playerTurnsDone = 0; //players who have finished their turn
    uint16 public randomCost = 10;

    //--------------------Modifier----------------------

    modifier gameStarted() {
        require(startGame == true);
        _;
    }
    //make sure all players havent done their turns
    modifier turnsLeft() {
        require(playerTurnsDone < totalPlayers);
        _;
    }
    //make sure current player has not done their turn
    modifier turnAvailable() {
        require(ownerToPlayer[msg.sender].round <= currentRound);
        _;
    }

    //--------------------Functions----------------------

    function retCards() public view returns (uint256[] memory) {
        return (cards);
    }

    function retPlayer() public view returns (Player memory) {
        return (ownerToPlayer[msg.sender]);
    }

    function cardOwner(uint256 _card) public view returns (address) {
        return (cardToOwner[_card]);
    }

    function retplayerTurnsDone() public view returns (uint256) {
        return playerTurnsDone;
    }

    function retcurrentRound() public view returns (uint256) {
        return currentRound;
    }

    // function getcardsByOwner(address _owner)
    //     external
    //     view
    //     returns (uint256[] memory)
    // {
    //     uint256[] memory result = new uint256[](ownerZombieCount[_owner]);
    //     uint256 counter = 0;
    //     for (uint256 i = 0; i < zombies.length; i++) {
    //         if (zombieToOwner[i] == _owner) {
    //             result[counter] = i;
    //             counter++;
    //         }
    //     }
    //     return result;
    // }

    // function listcardToOwner() public view returns (mapping(uint256 => uint256)[] memory) {
    //     return (cardToOwner);
    // }

    //Currently costs 10 Tokens for each random card creation
    function randomCard() public gameStarted turnsLeft turnAvailable {
        require(ownerToPlayer[msg.sender].balance >= randomCost);
        addCard();
        ownerToPlayer[msg.sender].balance -= randomCost;
        playerTurnsDone += 1;
        ownerToPlayer[msg.sender].round += 1;

        if (playerTurnsDone == totalPlayers) {
            advanceRound();
        }
    }

    function advanceRound() public {
        require(playerTurnsDone >= totalPlayers);
        playerTurnsDone = 0;
        currentRound += 1;
    }
}
