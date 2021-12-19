const projectGame = artifacts.require("projectGame");

module.exports = function (deployer) {
  deployer.deploy(projectGame);
};
