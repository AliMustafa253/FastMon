

import React, {useState, useEffect} from 'react';

import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";


import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'


import Button from '@mui/material/Button';


const Navbar = () => {
    const triedToEagerConnect = useEagerConnect();
    const isConnected = typeof account === "string" && !!library;
  const router = useRouter()

    return (
        <nav style={{padding:"30px 40px", width:"100%", display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
            { 
            router.asPath == "/" ?
                <h5 style={{textTransform: "uppercase"}}>Reach 100 points to win</h5>
                :
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} style={{
                height:20,
                cursor: "pointer",
                color: "white",
                margin: "22.1776 0"
                }}>
                {/* <a>next-web3-boilerplate</a> */}
                </FontAwesomeIcon>
            }
            <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
    )
}

export default Navbar;
