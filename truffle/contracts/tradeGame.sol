pragma solidity >=0.6.0;

import "./roundsGame.sol";

/*==================================================================
Contains
-Trade Functionality
-Offer Trades
-Cancel Trades
-Subtract and add token/cards per trades
==================================================================*/

contract tradeGame is roundsGame {
    //--------------------Variables----------------------

    struct tradeCard {
        uint16 ownerOffer; //Owner giving tokens to take his card. (for negative ones usually)
        uint16 ownerCard; //Owners card he wants to trade.
        uint16 buyerOffer; //Buyer giving tokens to buy card
        uint16 buyerCard; //BuyerCard
        uint16 index;
        bool tradeComplete;
        bool tradeAvailable;
        address ownerAddr;
        address buyerAddr;
    }

    tradeCard[] public trades;
    mapping(address => tradeCard) public ownerToTrade;

    //--------------------Functions----------------------

    //MAKE SURE TO DOUBLE CHECK THAT ALL THE TOKENS CARDS ETC TRANSFERS ARE DONE CORRECTLY

    function startTrade(uint16 _ownerOffer, uint16 _ownerCard) public {
        require(ownerToPlayer[msg.sender].balance >= _ownerOffer);
        require(ownerToTrade[msg.sender].ownerAddr != msg.sender); //Make sure owner doesnt have a trade alrdy
        uint16 currentIndex = uint16(trades.length - 1);
        ownerToTrade[msg.sender] = tradeCard(
            _ownerOffer,
            _ownerCard,
            0,
            0,
            currentIndex,
            false,
            true,
            msg.sender,
            address(0)
        );
        ownerToPlayer[msg.sender].cardsOwned -= 1;
        trades.push(ownerToTrade[msg.sender]);
        cardToOwner[_ownerCard] = address(0);
        //reduce the tokens the owner offers for trade
        ownerToPlayer[msg.sender].balance -= _ownerOffer;
        currentTrades += 1;
    }

    //Return trades of specified address

    function retTradeAddr(address _ownerAddr)
        public
        view
        returns (tradeCard memory)
    {
        require(ownerToTrade[_ownerAddr].ownerAddr == msg.sender);
        return ownerToTrade[_ownerAddr];
    }

    function retTrade() public view returns (tradeCard memory) {
        require(ownerToTrade[msg.sender].ownerAddr == msg.sender);
        return ownerToTrade[msg.sender];
    }

    function retAllTrades() public view returns (tradeCard[] memory) {
        return trades;
    }

    function retTradeIndex() internal view returns (uint256) {
        uint256 index = 0;
        for (index = 0; index < trades.length; index++) {
            if (trades[index].ownerAddr == msg.sender) {
                return index;
            }
        }
        revert();
    }

    //The offer (tokens + cards) a buyer makes will be subtracted until the trade is cancelled or confirmed

    function offerTrade(
        uint16 _buyerOffer,
        uint16 _buyerCard,
        uint256 index
    ) public {
        address _ownerAddr = trades[index].ownerAddr;
        require(ownerToPlayer[msg.sender].balance >= _buyerOffer);
        //to make sure no more trades available to the player
        require(ownerToTrade[_ownerAddr].tradeAvailable);
        require(_buyerOffer >= 0);
        require(_ownerAddr != msg.sender);

        ownerToTrade[_ownerAddr].buyerOffer = _buyerOffer;
        ownerToTrade[_ownerAddr].buyerCard = _buyerCard;
        ownerToTrade[_ownerAddr].buyerAddr = address(msg.sender);
        ownerToTrade[_ownerAddr].tradeAvailable = false;

        ownerToPlayer[msg.sender].balance -= _buyerOffer;
        ownerToPlayer[msg.sender].cardsOwned -= 1;
        //buyers Card owned by noOne;
        cardToOwner[_buyerCard] = address(0);
    }

    //Player can use this to hold enemy tokens but in term they cant trade either until they confirm this

    function tradeComplete(bool _tradeConfirm) public {
        require(msg.sender == ownerToTrade[msg.sender].ownerAddr);
        require(ownerToTrade[msg.sender].tradeAvailable == false);

        if (_tradeConfirm == false) {
            //send money back to buyer and make trade available
            ownerToPlayer[ownerToTrade[msg.sender].ownerAddr]
                .balance += ownerToTrade[msg.sender].buyerOffer;
            //make buyer Owner of his card again
            cardToOwner[ownerToTrade[msg.sender].buyerCard] = ownerToTrade[
                msg.sender
            ].buyerAddr;
            //Add card number in buyer
            ownerToPlayer[ownerToTrade[msg.sender].ownerAddr].cardsOwned += 1;

            ownerToTrade[msg.sender].buyerOffer = 0;
            ownerToTrade[msg.sender].buyerCard = 0;
            ownerToTrade[msg.sender].buyerAddr = address(0);
            ownerToTrade[msg.sender].tradeAvailable = true;
        }

        if (_tradeConfirm == true) {
            //send money to owner and make trade complete
            ownerToPlayer[msg.sender].balance += ownerToTrade[msg.sender]
                .buyerOffer;
            //make tradeOwner Owner of the card
            cardToOwner[ownerToTrade[msg.sender].buyerCard] = msg.sender;
            //Add card numbers in owner
            ownerToPlayer[msg.sender].cardsOwned += 1;

            ownerToTrade[msg.sender].buyerOffer = 0;
            ownerToTrade[msg.sender].buyerCard = 0;
            ownerToTrade[msg.sender].buyerAddr = address(0);
            ownerToTrade[msg.sender].tradeAvailable = true;

            tradeCard memory tempTrade = trades[trades.length - 1];
            delete trades[trades.length - 1];
            trades[retTradeIndex()] = tempTrade;
            currentTrades -= 1;
        }
    }
}
