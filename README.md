## Description


https://github.com/ziejka/todo-list-etherjs/assets/7802772/8164199c-d777-40a4-a154-efdfa89693c0


This ToDo showcase project uses web3 technology on Ethereum blockchain and ether.js as the frontend layer.
The contract was created, tested and deployed using [Remix](https://remix.ethereum.org/)

## Run the project locally

To run the project locally, you need to have the following:

- [Node.js](https://nodejs.org/en/) installed.
- [Ganache](https://www.trufflesuite.com/ganache) installed and running.
- [Metamask](https://metamask.io/) installed and configured.

Then you need to clone the repository and install dependencies.

Then you need to compile and deploy the contract to your local blockchain - Ganache, using Remix. After that, copy the contract address and paste it into the `.env` file as the `VITE_TODO_LIST_CONTRACT_ADDRESS` variable.

Then you can run the project using:

```bash
npm run dev
```
