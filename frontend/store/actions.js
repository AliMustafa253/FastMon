import {BigNumber} from 'bignumber.js'


export const __create_player = (contract) => {
    return async dispatch => {
        var data;
        try {

            const data = await contract.retPlayer();
            // const {results} = data;
    
            // console.log("Results of createPlayer:", results);
            if (data == undefined || parseInt(data.playerAddr, 16) == 0) {
                const data2 = await contract.createPlayer();
                dispatch({
                    type: "CREATE_PLAYER",
                    payload: data2
                })
            } else {
                dispatch({
                    type: "CREATE_PLAYER",
                    payload: data
                })
            }

            console.log("Data of createPlayer:", data);
        }
        catch (exception) {
            console.log("The transaction failed. Reason is below.")
            console.error(exception);
            console.log("Assuming everything is ok :)")
            data = true
            dispatch({
                type: "CREATE_PLAYER",
                payload: data
            })
        }
    }
}

export const __get_player_data = (contract) => {
    return async dispatch => {
        try {


            const player = await contract.retPlayer();


            console.log ("Player is: ", player)

            const score = await contract.retPlayerScore();
            // const {results} = data;
            // console.log("Results of retPlayerScore:", results);
            // console.log("Data of retPlayerScore:", data);

            const cards = await contract.retPlayerCards();

            console.log ("Score is: ", score)
            console.log ("Score._hex is: ", score._hex)
            console.log ("Score.number is: ", score.number)
            console.log ("Score._hex BigNumber 16 is: ", BigNumber(score._hex, 16))


            console.log ("Cards is: ", cards)

            for (let i= 0; i < cards.length; i++){
                console.log("Card #", i, ":", parseInt(cards[i]._hex, 16))
            }


            dispatch({
                type: "GET_PLAYER_DATA",
                player: player,
                score: score,
                cards: cards
            })            

        }
        catch (exception) {
            console.log("The transaction failed. Reason is below.")
            console.error(exception);
            console.log("Assuming everything is ok :)")
            results = true
            dispatch({
                type: "GET_PLAYER_DATA",
                score: null,
                cards: []
            })
        }
    }
}


export const __pick_a_card = (contract) => {
    return async dispatch => {
        try {

            console.log("Trying to get a new card...")

            const new_card = await contract.randomCard();

            console.log ("New_card is: ", new_card)

            const cards = await contract.retPlayerCards();

            console.log ("ACshually, New_card is: ", cards[cards.length - 1])

            dispatch({
                type: "PICK_A_CARD",
                new_card: cards[cards.length - 1],
            })            

        }
        catch (exception) {
            console.log("The transaction failed. Reason is below.")
            console.error(exception);
            console.log("Assuming everything is ok :)")
        }
    }
}

