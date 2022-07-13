import { React, useEffect, useState } from "react";
import { MetaMask } from "./wallet";
import { useWeb3React } from "@web3-react/core";

function MetamaskProvider({ children }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  const shouldEagerConnect = localStorage.getItem("shouldEagerConnect");
  useEffect(() => {
    if (shouldEagerConnect === "true") {
      MetaMask.isAuthorized()
        .then((isAuthorized) => {
          setLoaded(true);
          if (isAuthorized && !networkActive && !networkError) {
            activateNetwork(MetaMask);
          }
        })
        .catch(() => {
          setLoaded(true);
        });
    }
  }, [shouldEagerConnect]);

  return children;
}

export default MetamaskProvider;