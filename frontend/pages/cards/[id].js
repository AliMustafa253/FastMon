import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
// import Account from "../components/Account";
// import ETHBalance from "../components/ETHBalance";
// import TokenBalance from "../components/TokenBalance";
// import useEagerConnect from "../hooks/useEagerConnect";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

import Button from '@mui/material/Button';

import { useRouter } from 'next/router'

import React, {useState, useEffect} from 'react';
import $ from 'jquery';

import styles from "../../styles/index.module.scss"


function Home() {
  const router = useRouter();

  const { account, library } = useWeb3React();

//   const triedToEagerConnect = useEagerConnect();

//   const isConnected = typeof account === "string" && !!library;

const [mouse_move_card, setMouseMoveCard] = useState(false);


const [card_transform, setCardTransform] = useState('none');
const [card_before_background_position, setCardBeforeBackgroundPosition] = useState('0 0');
const [card_after_background_position, setCardAfterBackgroundPosition] = useState('0 0');
const [card_after_opacity, setCardAfterOpacity] = useState('0');



  var hover_card_styles = {
    // card: {
        transform: card_transform,
        '&:hover:before': {
             backgroundPosition: card_before_background_position,
        },    
        '&:hover:after': {
            backgroundPosition: card_after_background_position,
            opacity: card_after_opacity
       },               
    // },
  }



  var x;
  // var $cards = $(".card");
  // var $style = $(".hover");
  

  const MouseMoveCard = (e) => {
      var cardElement = e.target

      e = e || window.event;

      var target = e.target || e.srcElement,
          rect = target.getBoundingClientRect(),
          offsetX = e.clientX - rect.left,
          offsetY = e.clientY - rect.top;


      // normalise touch/mouse
      var pos = [offsetX,offsetY];
      e.preventDefault();
      if ( e.type === "touchmove" ) {
          pos = [ e.touches[0].clientX, e.touches[0].clientY ];
        }

        // ----------- Print debugging
        // console.log( "pos is", pos)
        // ----------- Print debugging

        var $card = $(cardElement);
      // math for mouse position
      var l = pos[0];
      var t = pos[1];
      var h = $card.height();
      var w = $card.width();

        // ----------- Print debugging
        //   console.log( "card height and width is: ", h, ", ", w)
        // ----------- Print debugging

      var px = Math.abs(Math.floor(100 / w * l)-100);
      var py = Math.abs(Math.floor(100 / h * t)-100);
      var pa = (50-px)+(50-py);
      // math for gradient / background positions
      var lp = (50+(px - 50)/1.5);
      var tp = (50+(py - 50)/1.5);
      var px_spark = (50+(px - 50)/7);
      var py_spark = (50+(py - 50)/7);
      var p_opc = 20+(Math.abs(pa)*1.5);
      var ty = ((tp - 50)/2) * -1;
      var tx = ((lp - 50)/1.5) * .5;
      // css to apply for active card
      var grad_pos = `${lp}% ${tp}%;`
      var sprk_pos = `${px_spark}% ${py_spark}%;`
      var opc = `${p_opc/100}`
      var tf = `rotateX(${ty}deg) rotateY(${tx}deg)`
      
      setCardBeforeBackgroundPosition(grad_pos)
      setCardAfterBackgroundPosition(sprk_pos)
      setCardAfterOpacity(opc)
      setCardTransform(tf)
      
      setMouseMoveCard(true)

        // ----------- Print debugging
        // console.log("mouse_move_card is", mouse_move_card)
    //   console.log("Custom styles are: ", hover_card_styles)
        // ----------- Print debugging
      
        if ( e.type === "touchmove" ) {
          return false; 
        }
        clearTimeout(x);
    }

    const MouseOutCard = (e) => {
        // remove css, apply custom animation on end
        var $card = $(this);
        setCardTransform("");
        $card.removeAttr("style");
        x = setTimeout(function() {
            // $card.addClass("animated");
            setMouseMoveCard(false)
        },2500);
    }

  useEffect(() => {

    /*
    
      using 
        - an animated gif of sparkles.
        - an animated gradient as a holo effect.
        - color-dodge mix blend mode
      
    */
    // var $cards = $(".card");
    var $style = $(".hover");
    
    $(document).on("mousemove touchmove", ".card", function(e) { 
      var x;

      // normalise touch/mouse
        var pos = [e.offsetX,e.offsetY];
        e.preventDefault();
        if ( e.type === "touchmove" ) {
          pos = [ e.touches[0].clientX, e.touches[0].clientY ];
        }
        var $card = $(this);
        // math for mouse position
        var l = pos[0];
        var t = pos[1];
        var h = $card.height();
        var w = $card.width();
        var px = Math.abs(Math.floor(100 / w * l)-100);
        var py = Math.abs(Math.floor(100 / h * t)-100);
        var pa = (50-px)+(50-py);
        // math for gradient / background positions
        var lp = (50+(px - 50)/1.5);
        var tp = (50+(py - 50)/1.5);
        var px_spark = (50+(px - 50)/7);
        var py_spark = (50+(py - 50)/7);
        var p_opc = 20+(Math.abs(pa)*1.5);
        var ty = ((tp - 50)/2) * -1;
        var tx = ((lp - 50)/1.5) * .5;
        // css to apply for active card
        var grad_pos = `background-position: ${lp}% ${tp}%;`
        var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
        var opc = `opacity: ${p_opc/100};`
        var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
        // need to use a <style> tag for psuedo elements
        var style = `
          .card:hover:before { ${grad_pos} }  /* gradient */
          .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
        `
        // set / apply css class and style
        // $cards.removeClass("active");
        // $card.removeClass("animated");
        $card.attr( "style", tf );
        $style.html(style);
        if ( e.type === "touchmove" ) {
          return false; 
        }
        clearTimeout(x);
      }).on("mouseout touchend touchcancel", function() {
        // remove css, apply custom animation on end
        var $card = $(this);
        $style.html("");
        $card.removeAttr("style");
        x = setTimeout(function() {
          $card.addClass("animated");
        },2500);
      });
    
  }, [
    // x,
    // $cards,
    // $style 
  ])




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

      <section className={styles.cards}>
        <div 
        onMouseMove={MouseMoveCard} 
        onTouchMove={MouseMoveCard}

        onMouseOut={MouseOutCard}

        className={`${styles.card} ${styles.charizard} ` + (mouse_move_card ? ``: `${styles.animated}`)}
            style={mouse_move_card ? hover_card_styles : {}}    
        ></div>
      </section>

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

export default Home;
