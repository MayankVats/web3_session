// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() payable ERC20("Bank Currency", "BC") {
        _mint(
            0xe81db2B45cf9C1A93a32A29c5bBC177B028Bfa6e,
            10000000000000000000000000
        );
    }
}
