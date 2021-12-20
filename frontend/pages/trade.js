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



function PickACard() {
    const { account, library } = useWeb3React();
    
    const triedToEagerConnect = useEagerConnect();
    
    const isConnected = typeof account === "string" && !!library;


    let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
    let suitType;

    const randomize = () => {
        suitType = Math.floor(Math.random() * 4);
        let suitResult = suits[suitType];
        console.log(suitResult);
    }

    const [clicked, setClicked] = useState(styles.down);
    const ChooseACard = (e) => {
      var cardElement = e.target
      console.log(cardElement.classList)
    //   clicked == 'down' ? setClicked('') : setClicked('base-state click-state');

      if (clicked == styles.down) {
        setClicked(styles.opened);
        cardElement.style["transform"] = 'scaleX(-1)'
        cardElement.style["background-image"] = 'url("https://m.media-amazon.com/images/I/81TqgoiOIqL._AC_SY679_.jpg")';	
    }
      else if (clicked == styles.opened) {
        setClicked(styles['is-removed']);
      }
      randomize();
    }

  let cardAmount = 10;

  var rows = [];
  for (var i = 0; i < cardAmount; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      var randomRot = -43 + Math.ceil(Math.random() * 3);
      var transformation = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i*3}px)`;
      
      rows.push(  
        <div key={i} 
            id={"card-" + i} 
            className={`${styles.card} ${clicked}`}
            style={{
                transform: transformation,

            }}
            onClick={ChooseACard}
        >
        </div>
      );
  }



//   const CardElement = () => {
//       return (
//   <div key={index} 
//   id={"card-" + index} 
//   className={`${styles.card} ${styles.down}`}>

//   </div>
//       )
//   }

  useEffect(() => {


    
    
    $(document).on("click", ".card", function(){
        if ($(this).hasClass('down')) {
            $(this).removeClass('down');
            $(this).addClass('opened');
          $(this).style["background-image"] = 'url("https://m.media-amazon.com/images/I/81TqgoiOIqL._AC_SY679_.jpg")';	
        }
        else if ($(this).hasClass('opened')) {
            $(this).addClass('is-removed');
        }
        randomize();
    });
    
    
  }, [])


  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>next-web3-boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/mirshko/next-web3-boilerplate">
            next-web3-boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <ETHBalance />

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )}

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
