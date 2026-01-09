const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Mock Verifier
    const MockVerifier = await hre.ethers.getContractFactory("MockVerifier");
    const verifier = await MockVerifier.deploy();
    await verifier.waitForDeployment();
    const verifierAddress = await verifier.getAddress();
    console.log("MockVerifier deployed to:", verifierAddress);

    // 2. Deploy CreditSBT
    const CreditSBT = await hre.ethers.getContractFactory("CreditSBT");
    const creditSBT = await CreditSBT.deploy(verifierAddress);
    await creditSBT.waitForDeployment();
    const sbtAddress = await creditSBT.getAddress();
    console.log("CreditSBT deployed to:", sbtAddress);

    // 3. Save frontend artifacts (ABI & Address)
    saveFrontendFiles(creditSBT, "CreditSBT");
    saveFrontendFiles(verifier, "MockVerifier");
}

function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../../frontend/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    // We need to get the artifact to save the ABI
    // In Hardhat script, we can get artifact by name
    const artifact = hre.artifacts.readArtifactSync(name);

    fs.writeFileSync(
        contractsDir + "/" + name + ".json",
        JSON.stringify(artifact, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
