pragma solidity >=0.6.0;

/*==================================================================
Contains
-Setting Players
-Setting Variables
-Initialization
Functionality 
==================================================================*/

contract initializeGame {
    //--------------------Variables----------------------

    //totalPlayer increments only when new players added
    uint16 public totalPlayers = 0;
    uint256 public nonceForRand = 0;
    bool public startGame = false;

    /*first 2 numbers identify the card Type 
    (e.g if its 01 it will be a +1 point card)
    */

    uint256 public cardModValue = 10000;
    address payable public owner;

    struct Player {
        uint16 balance;
        uint16 round; //Makes sure everyone is on the same round
        uint16 cardsOwned;
        uint16 playerNumber;
        address playerAddr;
    }

    // Player[] public players;

    /*=========================================
    Owner = Address
    Player = Address structure with player information
    cards = all the cards generated
    ============================================*/

    //=====================MAIN STORAGE==========================
    uint256[] public cards;
    mapping(uint256 => address) public cardToOwner;
    mapping(address => Player) public ownerToPlayer;
    //=====================MAIN STORAGE==========================

    /*
    Will call player according to id
    planning on opening a new tab for each player
    */

    modifier onlyOwnerAllowed() {
        require(msg.sender == owner);
        _;
    }

    //--------------------Functions----------------------
    constructor() {
        owner = payable(msg.sender);
        totalPlayers = 0;
    }

    function startTheGame() public onlyOwnerAllowed {
        startGame = true;
    }

    //Will add a player into the game

    function createPlayer() public {
        require(startGame == false);
        require(ownerToPlayer[msg.sender].playerAddr == address(0));
        totalPlayers += 1; //Increments total players

        ownerToPlayer[msg.sender] = Player(
            100,
            1,
            0,
            totalPlayers,
            address(msg.sender)
        );
        //create 3 cards for the user to start with
        for (uint256 i = 0; i < 3; i++) {
            addCard();
        }
    }

    //ADDS CARD TO LIST
    function addCard() internal {
        uint256 _newCard = generateCards(cardModValue);
        cards.push(_newCard); //Creates one card for player to start with
        cardToOwner[_newCard] = msg.sender; //Assigns currentPlayer as the owner of card
        ownerToPlayer[msg.sender].cardsOwned += 1;
    }

    //used to Generate Cards for the game

    function generateCards(uint256 _cardModValue) public returns (uint256) {
        while (true) {
            uint256 newCard = uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, nonceForRand)
                )
            ) % _cardModValue;

            //9560
            //9300

            if (checkCard(newCard) == true) {
                return newCard;
            }
            nonceForRand += 1;
        }
        return 12345678 % _cardModValue;
    }

    function checkCard(uint256 _newCard) public view returns (bool) {
        //check if key exists thn false
        if (cardToOwner[_newCard] != address(0)) {
            //means that it exists
            return false;
        }
        return true;
    }
}
