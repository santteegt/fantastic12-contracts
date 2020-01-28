// We require the Buidler Runtime Environment explicitly here. This is optional
// when running the script with `buidler run <script>`: you'll find the Buidler
// Runtime Environment's members available as global variable in that case.
const env = require("@nomiclabs/buidler");
const BigNumber = require("bignumber.js");

async function main() {
  // You can run Buidler tasks from a script.
  // For example, we make sure everything is compiled by running "compile"
  await env.run("compile");
  const accounts = await env.web3.eth.getAccounts();

  console.log('Accounts', accounts)

  // Deploy DAO squad
  const Fantastic12 = env.artifacts.require("Fantastic12");
  const squad = await Fantastic12.new();

  // Deploy StandardBounties
  const StandardBounties = env.artifacts.require("StandardBounties");
  const bounties = await StandardBounties.new();

  console.log(`Deployed StandardBounties at address ${bounties.address}`);

  // Nile testnet
  const OCEAN_TOKEN_ADDR = '0x9861Da395d7da984D5E8C712c2EDE44b41F777Ad'
  

  const PRECISION = 1e18
  const withdrawLimit = `${20 * PRECISION}`;
  const consensusThreshold = `${0.75 * PRECISION}`;
  // Init Squad
  await squad.init(accounts[0], OCEAN_TOKEN_ADDR, withdrawLimit, consensusThreshold);
  console.log(`Deployed Fantastic12 Ocean Collective squad at address ${squad.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
