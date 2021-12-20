import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";

import React, {useState, useEffect} from 'react';

import $ from 'jquery';

import styles from "../styles/pick-a-card.module.scss"

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

import { useRouter } from 'next/router'


import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {numberToCard, lookupCard} from "./index.tsx"

// for sound
import useSound from 'use-sound';

// import evolutionMusic from '/public/sounds/evolution.mp3';

import useAudio from "../hooks/useAudio"


// for contract calls with Redux
import {useDispatch, useSelector} from "react-redux";
import {__pick_a_card, __get_player_data} from "../store/actions";


// let's try using a Contract...
import useProjectGameContract from "../hooks/useProjectGameContract"


function PickACard() {
  const router = useRouter()
  const dispatch = useDispatch();

    const { account, library } = useWeb3React();
    
    const triedToEagerConnect = useEagerConnect();
    
    const isConnected = typeof account === "string" && !!library;



    const testContract = useProjectGameContract();


    const new_card = useSelector(redux => redux.new_card);



  const filePath = '../static/sounds/capture.mp3';
  const [play] = useSound(filePath);

    const randomize = () => {
      return lookupCard(new_card)
    }

    const [clicked, setClicked] = useState(styles.down);

    const ChooseACard = (e) => {
      dispatch(__pick_a_card(testContract)).then( ()=> {}).finally( () => {
        var cardElement = e.target
        console.log(cardElement.classList)
      //   clicked == 'down' ? setClicked('') : setClicked('base-state click-state');
  
        if (clicked == styles.down) {
          play(e);
          setClicked(styles.opened);
          cardElement.style["background-image"] = 'url("'+randomize()+'")';	
        }
        else if (clicked == styles.opened) {
          setClicked(styles['is-removed']);
        }
        randomize();
      })
    }

  let cardAmount = 10;

  var rows = [];
  for (let i = 0; i < cardAmount; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      var randomRot = -43 + Math.ceil(Math.random() * 3);
      var transformation = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i*3}px)`;
      
      rows.push(  
        <div 
            key={i} 
            id={"card-" + i} 
            className={i == cardAmount - 1 ? `${styles.card} ${clicked}` : `${styles.card} ${styles.down}`}
            style={{
                transform: transformation,

            }}
            onClick={ChooseACard}
        >
        </div>
      );
  }



  // const [play] = useSound('/public/sounds/evolution.mp3');



//   const CardElement = () => {
//       return (
//   <div key={index} 
//   id={"card-" + index} 
//   className={`${styles.card} ${styles.down}`}>

//   </div>
//       )
//   }

// const [isPlaying, setIsPlaying] = useState(false);
// const [, {sound}] = useSound(filePath);

  // const { audio, ready } = useAudio({ src: filePath });


  useEffect(() => {

    // sound?.on('play', () => setIsPlaying(true));
    // sound?.on('stop', () => setIsPlaying(false));
    // sound?.on('end', () => setIsPlaying(false));
    // sound?.on('pause', () => setIsPlaying(false));
  
    // if (ready) {
    //   audio.play()
    // }

    // $(document).on("click", ".card", function(){
    //     if ($(this).hasClass('down')) {
    //         $(this).removeClass('down');
    //         $(this).addClass('opened');
    //       $(this).style["background-image"] = 'url("https://m.media-amazon.com/images/I/81TqgoiOIqL._AC_SY679_.jpg")';	
    //     }
    //     else if ($(this).hasClass('opened')) {
    //         $(this).addClass('is-removed');
    //     }
    //     randomize();
    // });
    
    
  }, [
    // sound
    // users.length, 
    // ready
  ])


  return (
    <div>
      <Head>
        <title>Pick a Card! - FASTMon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{
          color:"white",
          textTransform: "uppercase",
          
          }}>
        Choose a random card
        </h1>

        <p style={{
          color:"white",       
          }}>
        Click on the topmost card to get an <br/>
        auto-generated card. Good luck!
        </p>

        {/* {isConnected && (
          <section>
            <ETHBalance />

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )} */}

<div className={styles.cards}>
	
    {
    rows
    }
    {/* <div className="card opened"></div> */}
</div>



      </main>

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

export default PickACard;
