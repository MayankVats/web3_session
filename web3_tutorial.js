// What is Web3 ?
// - It is a javascript library which helps us connect with the blockchain.
// - An ethereum node is any device which is connected to ethereum network, validates transactions and stores data related to the transactions.

// Why do we need Web3 ?
// - It acts as an API between our Front-end or backend app and the blockchain ecosystem.
// - It provides a set of modules which helps us in making transactions, interacting with the smart contracts, reading data from smart contract's events, serializing transactions, conversion of units and much more.

// What is a provider ?
// - It acts as a communication layer between the web3 and the ethereum network.
// - Provider tells web3, what network to talk to.

// Creating a Web3 class's web3 instance
const Web3 = require("Web3");
const Token = require("./contractinfo");

// For Connecting with Metamask
// if (window.ethereum) {
//   window.web3 = new Web3(window.ethereum);
//   let accounts = await web3.eth.getAccounts();
//   let signer = accounts[0];
// }

// For Connecting with a node (Rinkeby in this case)
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/f6b9a34352a34efaa11a8fdcc24cbe45"
  // "https://data-seed-prebsc-1-s1.binance.org:8545/"
);

async function accountsTest() {
  // will return empty array in case the provider is an RPC
  // endpoint like infura or alchemy

  // In case of Metamask the function below gives the very first account that gets connected.
  // let data = await web3.eth.getAccounts();
  // console.log(data);

  // console.log(web3.eth.accounts.wallet.length);
  // console.log(web3.eth.accounts.wallet);

  // Solution: for when provider is not metamask
  // for example when using web3 on the backend
  web3.eth.accounts.wallet.add(
    "caa856cf86bbedc3e9a0be54448a4e3a962bd6fb365f7ca1eb7f61ef0f71741d"
  );
}

async function balanceTest() {
  let balance = await web3.eth.getBalance(
    "0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e"
  );
  console.log("balance (wei): ", balance);
  console.log("balance (ethers): ", web3.utils.fromWei(balance, "ether"));
}

async function contractReadTest() {
  // Creating the instance of the contract
  // We need two things:
  // 1. Contract's ABI
  // 2. Contract's Address
  const TokenInstance = new web3.eth.Contract(Token.abi, Token.address);

  console.log("Methods that can be called: ", TokenInstance.methods);

  // Fetch total supply
  const totalSupply = await TokenInstance.methods.totalSupply().call();
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 71 ~ contractTest ~ totalSupply",
    totalSupply
  );

  // Fetch Name, Symbol and Decimal
  const name = await TokenInstance.methods.name().call();
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 78 ~ contractTest ~ name",
    name
  );

  const symbol = await TokenInstance.methods.symbol().call();
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 84 ~ contractTest ~ symbol",
    symbol
  );

  const decimal = await TokenInstance.methods.decimals().call();
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 90 ~ contractTest ~ decimal",
    decimal
  );

  // Fetch Balance of an account
  const balance = await TokenInstance.methods
    .balanceOf("0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e")
    .call();
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 97 ~ contractTest ~ balance",
    balance
  );
}

async function contractWriteTest() {
  // Create the Contract Instance
  const TokenInstance = new web3.eth.Contract(Token.abi, Token.address);

  // Add private key to the wallet instance
  // NOTE: No need for this on the frontend, because we will already get the Signer using the MetaMask.
  web3.eth.accounts.wallet.add(
    "caa856cf86bbedc3e9a0be54448a4e3a962bd6fb365f7ca1eb7f61ef0f71741d"
  );

  // Estimate the Gas that will be used to run the function
  const estimatedGas = await TokenInstance.methods
    .transfer(
      "0x2E3c462e0884855650fDd8d44EA8fE7C097BaF9C",
      web3.utils.toWei("1")
    )
    .estimateGas({ from: "0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e" });

  // Calling the transfer function
  const data = await TokenInstance.methods
    .transfer(
      "0x2E3c462e0884855650fDd8d44EA8fE7C097BaF9C",
      web3.utils.toWei("1")
    )
    .send({
      from: "0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e",
      gas: estimatedGas,
    });
  console.log(
    "🚀 ~ file: web3_tutorial.js ~ line 110 ~ contractWriteTest ~ data",
    data
  );
}

// accountsTest();
// balanceTest();
// contractReadTest();
contractWriteTest();
