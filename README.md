# FastMon
Card Game with backend code written entirely in a blockchain using solidity.

## Technical Details:

Our frontend is built on Nextjs, a React Framework. It utilizes state management using
Redux-Thunk, and uses a solid Provider pattern to utilize Web3 in the entire app.
We use Material UI for good design.

## Pre-requisite:
Ensure you have the following downloaded

* NPM
* Yarn
* Next
* react

```
npm install next react react-dom
```

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
npx next dev
```

## Game playing:

After the contract has been deployed to Ganache, any user can open the app and “Connect their
Metamask account”.

![image](https://user-images.githubusercontent.com/91639328/148579122-1a73b16c-e764-4146-a42f-9850abba908e.png)

A player can Generate a New Card to advance the turn. This will be added to their
cards - but it costs them tokens.  


![image](https://user-images.githubusercontent.com/91639328/148579442-97a4f271-ef7d-4df2-99b4-6d0742f49484.png)

You can select a random card upon selecting the buy option using the interface below.

![image](https://user-images.githubusercontent.com/91639328/148579575-79b4896f-f494-4fad-9951-bceb25b8587c.png)



