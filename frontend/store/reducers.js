import {BigNumber} from 'bignumber.js'

const initialState = {
    player: null,
    cards: [
        -1,
        -1,
        -1,

        // "https://assets.codepen.io/13471/charizard-gx.webp",
        // "https://assets.codepen.io/13471/pikachu-gx.webp",
        // "https://assets.codepen.io/13471/eevee-gx.webp",
        // "https://assets.codepen.io/13471/mewtwo-gx.webp",
    ],
    score: 0,
    tokens: null,



    new_card:null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PLAYER":
            return {
                ...state,
                player: action.payload
            }
        case "GET_PLAYER_DATA":
            return {
                ...state,
                player: action.player,
                score: parseInt(action.score._hex, 16),
                cards: action.cards.map( (card, index) => {
                    return (parseInt(card._hex, 16))
                }),
            }    
        case "PICK_A_CARD":
            return {
                ...state,
                new_card: parseInt(action.new_card._hex, 16)
            }        
    }
    return {
        ...state
    }
}
