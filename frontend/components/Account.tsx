import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";

type AccountProps = {
  triedToEagerConnect: boolean;
};

import Button from '@mui/material/Button';


const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
      console.log("Account is", account)
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    console.log("ERROR in getting account: ", error);
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          
          <Button
            variant="outlined"
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </Button>
        ) : (
          <Button variant="contained" onClick={startOnboarding}>Install Metamask</Button>
        )}
      </div>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
