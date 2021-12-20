

import React, {useState, useEffect} from 'react';

import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import { useWeb3React } from "@web3-react/core";


import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'



import Button from '@mui/material/Button';



// for contract calls with Redux
import {useDispatch, useSelector} from "react-redux";
import {__create_player, __get_player_data} from "../store/actions";


const Navbar = () => {
    const triedToEagerConnect = useEagerConnect();

    const { account, library } = useWeb3React();

    const isConnected = typeof account === "string" && !!library;
  const router = useRouter()



  const player = useSelector(redux => redux.player);


    return (
        <nav style={{padding:"30px 40px 14px 40px", width:"100%", display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
            { 
            router.asPath == "/" ?
                <h5 style={{textTransform: "uppercase"}}>Reach 100 points to win</h5>
                :
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} style={{
                height:20,
                cursor: "pointer",
                color: router.asPath == "/pick-a-card" ? "white" : "black",
                margin: "22.1776 0"
                }}>
                {/* <a>next-web3-boilerplate</a> */}
                </FontAwesomeIcon>
            }


            { player ? <p style={{
                marginLeft:-45,
                opacity: 0.6,
                textAlign:"center",
                color: router.asPath == "/pick-a-card" ? "white" : "black",
            }}> Round: {player.round} <br/> 
                            Your player#: {player.playerNumber}
                        </p> : <></>}



            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Account triedToEagerConnect={triedToEagerConnect} style={{
                    color: router.asPath == "/pick-a-card" ? "white" : "black",
                }}/>
                {
                player ? <div style={{display: "flex", flexDirection: "row", marginTop:"9px"}}>
                    <img src="../static/images/pokecoin.png" style={{
                        imageRendering: "pixelated",
                        height: "20px",
                        width: "20px",
                        }} />
                    <p style={{fontFamily: "Courier New", 
                    fontSize: "20px", 
                    margin: "0px 10px", 
                    padding: "0px", 
                    color: "#EEBC1D",
                    textStroke: "1px black",
                }}>{player.balance}</p>
                </div>
                :
                <></>
                }
            </div>
        </nav>
    )
}

export default Navbar;
