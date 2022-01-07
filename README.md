# FastMon
Card Game with backend code written entirely in a blockchain using solidity.

## Technical Details:

Our frontend is built on Nextjs, a React Framework. It utilizes state management using
Redux-Thunk, and uses a solid Provider pattern to utilize Web3 in the entire app.
We use Material UI for good design.

## How to Install:
- First install dependencies. Run the following in the **frontend** folder
```
npm install
```
- (optional) Copy the latest Contract JSON files from truffle/build into frontend/contracts
- (optional) Run yarn compile-contract-types in the frontend folder
- Change the contract address in frontend/hooks/useProjectGameContract.ts to the contract
address of Project Game (which you might have deployed with truffle migrate in the
truffle folder)
- Run the server. Run  the following in the **frontend** folder
```
npm next dev
```

## Game playing:
After the contract has been deployed to Ganache, any user can open the app and “Connect their
Metamask account”.
