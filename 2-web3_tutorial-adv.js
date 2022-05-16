const Web3 = require("Web3");
const { cakeToken, Token } = require("./contractinfo");

const providers = {
  rinkeby: "https://rinkeby.infura.io/v3/f6b9a34352a34efaa11a8fdcc24cbe45",
  bscTestnet: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  bscMainnet: "https://bsc-dataseed.binance.org/",
};

const web3 = new Web3(providers["bscTestnet"]);

async function pastEventsTest() {
  const CakeToken = new web3.eth.Contract(cakeToken.abi, cakeToken.address);

  const fromBlock = 1;
  const fromAddresses = ["0xdccf3b77da55107280bd850ea519df3705d1a75a"];

  // Past Token Transfers from a specific block
  // let data = await CakeToken.getPastEvents("Transfer", {
  //   fromBlock,
  //   toBlock: "latest",
  // });
  // console.log(
  //   `${data.length} Cake Transfers from block number ${fromBlock} till now.`
  // );

  // Fetch Token Transfer from specific set of addresses from a specific block
  data = await CakeToken.getPastEvents("Transfer", {
    filter: {
      from: fromAddresses,
    },
    fromBlock,
    toBlock: 5000,
  });
  console.log(
    `There are ${data.length} Cake transfers from ${fromAddresses[0]}`
  );

  // console.log(data);
}

async function gasPriceCalculation() {
  const TokenInstance = new web3.eth.Contract(Token.abi, Token.address);

  // How much gas will it take to run the contract function.
  const estimatedGas = await TokenInstance.methods
    .transfer(
      "0x2E3c462e0884855650fDd8d44EA8fE7C097BaF9C",
      web3.utils.toWei("1")
    )
    .estimateGas({ from: "0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e" });
  console.log(
    "🚀 ~ file: web3_tutorial-adv.js ~ line 51 ~ gasPriceCalculation ~ estimatedGas",
    estimatedGas
  );

  const gasPrice = await web3.eth.getGasPrice();
  console.log(
    "🚀 ~ file: 2-web3_tutorial-adv.js ~ line 65 ~ gasPriceCalculation ~ gasPrice",
    web3.utils.fromWei(gasPrice, "ether")
  );

  const finalGas = estimatedGas * gasPrice;
  const finalGasInEther = web3.utils.fromWei(finalGas.toString(), "ether");
  console.log(
    "🚀 ~ file: web3_tutorial-adv.js ~ line 66 ~ gasPriceCalculation ~ finalGasInEther",
    finalGasInEther
  );
}

async function sendNativeCurrency() {
  const from = "0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e";
  const to = "0x2E3c462e0884855650fDd8d44EA8fE7C097BaF9C";
  const gasPrice = await web3.eth.getGasPrice();
  // Any third party API
  const nonce = await web3.eth.getTransactionCount(from);

  const txObject = {
    nonce,
    from,
    gasPrice,
    gas: "21000",
    to,
    value: web3.utils.toWei("0.002"),
    data: "",
  };
  console.log(
    "\n\n🚀 ~ file: 2-web3_tutorial-adv.js ~ line 79 ~ sendNativeCurrency ~ txObject",
    txObject
  );

  const signedTx = await web3.eth.accounts.signTransaction(
    txObject,
    "caa856cf86bbedc3e9a0be54448a4e3a962bd6fb365f7ca1eb7f61ef0f71741d"
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(
    "\n\n🚀 ~ file: 2-web3_tutorial-adv.js ~ line 106 ~ sendNativeCurrency ~ receipt",
    receipt
  );
}

// pastEventsTest();
// gasPriceCalculation();
// sendNativeCurrency();

/*

This session's Goal:

1. Listening to past events - events filtering
2. Calculate the gas price - gas, gas limit, gas price.
3. Send native currency - transaction, transaction signing, transaction data

*/
