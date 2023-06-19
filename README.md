## Description

This is a ToDo showcase project using web3 technology on ethereum blockchain and ether.js as frontend layer.
The contract was created, tested and deployed using [Remix](https://remix.ethereum.org/)

## Run the project locally

To run project locally you need to have:

- [Node.js](https://nodejs.org/en/) installed.
- [Ganache](https://www.trufflesuite.com/ganache) installed and running.
- [Metamask](https://metamask.io/) installed and configured.

Then you need to clone the repository and install dependencies.

Then you need to compile and deploy the contract to your local blockchain - Ganache using Remix. After that you need to copy the contract address and paste it in the `.env` file as `VITE_TODO_LIST_CONTRACT_ADDRESS` variable.

Then you can run the project using:

```bash
npm run dev
```
