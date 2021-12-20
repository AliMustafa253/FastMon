import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import Navbar from "../components/navbar"

import "../styles/globals.css";

// import "../styles/index.module.scss"


// import Roboto font
import 'typeface-roboto'

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar />
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
