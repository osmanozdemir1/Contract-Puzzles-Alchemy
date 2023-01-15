const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signerX = ethers.provider.getSigner(0);
    const signerY = ethers.provider.getSigner(1);
    const addressX = signerX.getAddress();
    const addressY = signerY.getAddress();

    return { game, signerX, signerY, addressX, addressY };
  }
  it('should be a winner', async function () {
    const { game , signerX, signerY, addressX, addressY} = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    game.connect(signerX).write(addressY);

    await game.connect(signerY).win(addressX);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
