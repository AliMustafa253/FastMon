pragma solidity >=0.6.0;

import "./initializeGame.sol";

/*==================================================================
Contains
-Majority of the Modifiers
-Return Options 
-Round Change
-Random Card
-Score Calculation
Functionality 
==================================================================*/

contract roundsGame is initializeGame {
    //--------------------Variables----------------------

    // using SafeMath for uint256;
    // using SafeMath16 for uint16;
    uint256 public currentRound = 1;
    uint256 public playerTurnsDone = 0; //players who have finished their turn
    uint16 public randomCost = 10;
    address public playerWon = address(0);

    uint256 currentTrades = 0; //current amount of trades pending

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

    function retPlayerTurnsDone() public view returns (uint256) {
        return playerTurnsDone;
    }

    function retCurrentRound() public view returns (uint256) {
        return currentRound;
    }

    function retPlayerCards() public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](retPlayer().cardsOwned);
        uint256 counter = 0;
        for (uint256 i = 0; i < cards.length; i++) {
            if (cardToOwner[cards[i]] == msg.sender) {
                result[counter] = cards[i];
                counter++;
            }
        }
        return result;
    }

    //Calculates total costs and points according to cards

    function retPlayerScore() public view returns (uint256) {
        uint256[] memory playerCards = new uint256[](retPlayer().cardsOwned);
        playerCards = retPlayerCards();
        uint256 totalScore = 0;
        for (uint256 i = 0; i < playerCards.length; i++) {
            if (playerCards[i] < 1000) {
                totalScore -= 10;
            } else if (playerCards[i] < 5000) {
                totalScore += 5;
            } else if (playerCards[i] < 7000) {
                totalScore += 10;
            } else if (playerCards[i] < 9000) {
                totalScore += 15;
            } else {
                totalScore += 30;
            }
        }
        return totalScore;
    }

    //Currently costs 10 Tokens for each random card creation
    function randomCard() public gameStarted turnsLeft turnAvailable {
        require(ownerToPlayer[msg.sender].balance >= randomCost);
        addCard();
        ownerToPlayer[msg.sender].balance -= randomCost;
        playerTurnsDone += 1;
        ownerToPlayer[msg.sender].round += 1;
        advancePlay();
    }

    //-------ADVANCE ROUND OR END GAME IF SCORE REACHED--------
    function advancePlay() internal gameStarted {
        if (retPlayerScore() >= 100) {} //NO CONDITION SET RN
        if (ownerToPlayer[msg.sender].balance <= 0) {
            totalPlayers -= 1;
            playerTurnsDone -= 1;
            delete ownerToPlayer[msg.sender];
        }
        if (playerTurnsDone == totalPlayers) {
            advanceRound();
        }
    }

    function advanceRound() internal gameStarted {
        require(playerTurnsDone >= totalPlayers);
        playerTurnsDone = 0;
        currentRound += 1;
    }
}
