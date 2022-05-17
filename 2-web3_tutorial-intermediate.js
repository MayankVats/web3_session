 /**
   * =======================================================
   * This function is used to give approval to contract
   * ========================================================
   */
  const approveToSpender = async () => {
    if (account) {
      /** create a contract instance with sign provider */
      const contractInstanceSign = await new library.eth.Contract(
        USDCABI["abi"],
        "0x184C09dB6316E42057F73bF180880A060960ECDF"
      );
      /** create a contract instance without sign provider  */
      const contractInstanceWithoutSign = new Web3.eth.Contract(
        USDCABI["abi"],
        "0x184C09dB6316E42057F73bF180880A060960ECDF"
      );
      /**
       * ======================================================
       * This is listen method to listen approve events with web3 events method
       * ======================================================
       */
      contractInstanceWithoutSign.events
        .Approval({ fromBlock: "latest" })
        .on("connected", (str) => console.log(str))
        .on("data", (event) => console.log(event))
        .on("error", (err) => console.log(err));
      /**
       * ======================================================
       * This is listen method to listen approve events with subscribe method
       * ======================================================
       */
      new Web3.eth.subscribe(
        "logs",
        {
          address: "0x184C09dB6316E42057F73bF180880A060960ECDF",
          topics: [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
          ],
        },
        function (error, result) {
          if (!error) console.log("successfull !!");
          else console.log(error);
        }
      )
        .on("data", (event) => console.log(event))
        .on("error", (err) => console.log(err));
      /**
       * ====================================================
       * This is a approve method to give approve to contract
       * ====================================================
       */
      await contractInstanceSign.methods
        .approve(
          "0x723E2Dbf7A21c8DafbEcb732BC4989A040CBb6a2",
          `${toLp((Number(fromLp(allowance)) + 1).toString())}`
        )
        .send({ from: account })
        .on("transactionHash", (e) => {
          console.log("transactionHash ===>", e);
        })
        .on("receipt", (e) => {
          console.log("receipt ===>", e);
        })
        .on("error", (e) => {
          console.log("error ===>", e);
        });
    }
  };
 /**
   * ==================================================================
   * This function is used to fetch allowance that is give to contract
   * ==================================================================
   */
  const allowanceHandler = async () => {
    if (account) {
      const tokenContractInstance = await new library.eth.Contract(
        USDCABI["abi"],
        "0x184C09dB6316E42057F73bF180880A060960ECDF"
      );
      const allowance = await tokenContractInstance.methods
        .allowance(account, "0x723E2Dbf7A21c8DafbEcb732BC4989A040CBb6a2")
        .call();
      console.log(allowance);
      setAllowance(allowance);
    }
  };
/**
   * ===========================================
   * This function is used to batch a request
   * ===========================================
   */
  const batchHandler = async () => {
    /** ERC20 tokens */
    let tokens = [
      "0x184C09dB6316E42057F73bF180880A060960ECDF",
      "0xdF992d901B615D2c6a632DA5aAb9903652789503",
    ];
    /**
     * ===============================================================
     * This is batch method to call multi request as on batch request
     * ===============================================================
     */
    let batch = new library.eth.BatchRequest();
    return new Promise(async function (resolve, reject) {
      for (let i = 0; i < tokens.length; i++) {
        const tokenInstance = new library.eth.Contract(USDCABI["abi"], tokens[i]);
        batch.add(
            tokenInstance.methods
            .balanceOf(account)
            .call.request({from: account}, (error, data) => {
              if (error) return reject(error);
              console.log(fromLp(data));
              resolve();
            })
        );
      }
      batch.execute();
    });
  };
