const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    let address;
    let wallet;
    let i = 0;

    while(i >= 0){
      let walletTry = await ethers.Wallet.createRandom().connect(ethers.provider);
      let addressTry = await walletTry.address
      if(addressTry[2] == "0" && addressTry[3] == "0"){
        address = addressTry;
        wallet = walletTry;
        break;
      } else {
        i++;
      }
    }


    console.log("address: ", address);

    return { game, address, wallet };
  }
  it('should be a winner', async function () {
    const { game, address, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const signer = await ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1"),
    })

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
