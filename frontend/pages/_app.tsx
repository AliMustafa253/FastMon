import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import Navbar from "../components/navbar"

import "../styles/globals.css";

// import "../styles/index.module.scss"


// import Roboto font
import 'typeface-roboto'


import {Provider} from "react-redux";
import {store} from '../store/store';


import Head from "next/head";


function NextWeb3App({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" /> 
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> 
          <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </Provider>
  );
}

export default NextWeb3App;
