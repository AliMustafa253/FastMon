pragma solidity >=0.4.0;

import "./safemath.sol";

contract ProjectGame {
    uint256 totalPlayers;
    uint256 nonceForRand = 0;

    /*first 2 numbers identify the card Type 
    (e.g if its 01 it will be a +1 point card)
    */

    uint256 public cardModValue = 10000;
    address payable public owner;

    struct Player {
        uint256 balance;
    }
    struct Cards {
        ;
    }
    Player[] public players;
    mapping(uint256 => address) public playerToOwner;
    mapping (address => uint) totalPlayerCards;
    /*
    Will call player according to id
    planning on opening a new page for each player
    */
    using SafeMath for uint256;
    // using SafeMath32 for uint32;
    // using SafeMath16 for uint16;

    modifier onlyOwnerAllowed() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        totalPlayers = 0;
    }

    //Will add a player into the game

    function createPlayer() internal {
        uint256[] memory tempCards;
        tempCards[0] = generateCards(cardModValue);

        players.push(Player(100, tempCards));
        uint256 id = players.length.sub(1);
        playerToOwner[id] = msg.sender;
    }

    //used to Generate Cards for the game

    function generateCards(uint256 _cardModValue) internal returns (uint256) {
        nonceForRand = nonceForRand.add(1);
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, nonceForRand)
                )
            ) % _cardModValue;
    }

    function setPlayers() public onlyOwnerAllowed {
        totalPlayers = players.length;
    }
}
