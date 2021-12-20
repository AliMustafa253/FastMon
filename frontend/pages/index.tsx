import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

import Button from '@mui/material/Button';

import { useRouter } from 'next/router'

import React, {useState, useEffect} from 'react';

import styles from "../styles/index.module.scss"



// for contract calls with Redux
import {useDispatch, useSelector} from "react-redux";
import {__create_player, __get_player_data} from "../store/actions";


// let's try using a Contract...
import useProjectGameContract from "../hooks/useProjectGameContract"





export const numberToCard = {


  // if less than or equal to 4000, set to Pikachu
  "0,4000": "https://assets.codepen.io/13471/pikachu-gx.webp",

  // else if less than or equal to 7000, set to Eevee
  "4000,7000": "https://assets.codepen.io/13471/eevee-gx.webp",

  // else if less than or equal to 9000, set to Charizard
  "7000,9000": "https://assets.codepen.io/13471/charizard-gx.webp",

  // finally, else if less than or equal to 10000, set to MewTwo
  "9000,10000": "https://assets.codepen.io/13471/mewtwo-gx.webp",
}

export function lookupCard (card_number) {
  for (var key in numberToCard) {
    if (numberToCard.hasOwnProperty(key)) {

        var range = key.split(",")
        if (card_number >= parseInt(range[0]) && card_number < parseInt(range[1])){
          console.log(key + " -> " + numberToCard[key]);

          return numberToCard[key]
        }
    }
  }
}

function Home() {
  const triedToEagerConnect = useEagerConnect();

  const { account, library } = useWeb3React();
  
  const isConnected = typeof account === "string" && !!library;
  
  const router = useRouter();


  const dispatch = useDispatch();
  const player = useSelector(redux => redux.player);
  const score = useSelector(redux => redux.score);
  const cards = useSelector(redux => redux.cards);






  var player_cards = [];
  for (let i = 0; i < cards.length; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html


      var image_url = "https://cdn2.bulbagarden.net/upload/1/17/Cardback.jpg"

      console.log("Current card is:" , cards[i])

      if (cards[i] != -1){
      // lookup the proper URL
        image_url = lookupCard (cards[i])
    }
      player_cards.push(  
        <div style={{display:"flex", flexDirection: "column", alignItems: "center",justifyContent: "center"}}>
          <div 
              key={i} 
              id={"card-" + i} 
              className={`${styles.card} ${styles.mewtwo} ${styles.animated}`}
              style={{
                "--front": "url(" + image_url + ")"
              }}
          >
          </div>
          { cards[i] != -1 ? <p style={{fontFamily: "Space Mono, sans", }}>{cards[i]}</p> : <></>}
        </div>
      );
  }












  const CreatePlayer = () => {
    dispatch(__create_player(testContract)).then( ()=> {
      console.log("I'm in here!")
      dispatch(__get_player_data(testContract))
    }).finally( () => {
      console.log("I'm in here!")
      dispatch(__get_player_data(testContract))
    }).catch( () => {
      console.log("I'm in here!")
      dispatch(__get_player_data(testContract))
    })
  }

  const testContract = useProjectGameContract();


  useEffect(() => {

    isConnected ? console.log(testContract) : console.log("Not connected yet...")
    
    if (isConnected) {
      if (player) {
        console.log("Updating player data...")
        dispatch(__get_player_data(testContract))
      }
    }
  }, [])




  return (
    <div>
      <Head>
        <title>Play - FASTMon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style >{
        `
        html, body {
          background-color:white
        }
        `
      }
      </style>
      <main style={{display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-around", 
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      }}>
       { player ?
       <>
        <p>
        Your points
        </p>
        <h1 style={{fontSize: "80px", padding:0, margin:-10}}>
        {isConnected ? score : 0}
        </h1>
      </>
      :
      <p>You have not joined the game yet.</p>
       }
        {/* {isConnected ? console.log(testContract) : console.log("Not connected yet...")} */}

        {/* {isConnected && (
          <section>
            <ETHBalance />

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )} */}

        <section style={{display:"flex", flexDirection:"row", margin:"30px 0px 15px"}}>
          
          {player ? 
          <>
          <Button variant="contained" disabled={!isConnected} >Trade</Button>
          <Button variant="contained" disabled={!isConnected} onClick={e => {
                            router.push("/pick-a-card")
                        }} style={{marginLeft:"20px"}}>Buy</Button>
          </>
          : 
          <Button variant="contained" disabled={!isConnected} onClick={CreatePlayer}>Create Player</Button>
         }
        </section>
      </main>


      {isConnected && (
      <section className={styles.cards}>
        {/* <div className={`${styles.card} ${styles.charizard} ${styles.animated}`}></div>
        <div className={`${styles.card} ${styles.pika} ${styles.animated}`}></div>
        <div className={`${styles.card} ${styles.eevee} ${styles.animated}`}></div>
        <div className={`${styles.card} ${styles.mewtwo} ${styles.animated}`}></div> */}
        {
          player_cards
        }
      </section>
      )}




      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
