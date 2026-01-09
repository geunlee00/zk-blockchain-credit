const hre = require("hardhat");

async function main() {
    const [sender] = await hre.ethers.getSigners();
    const receiverAddress = "0x797620ed9D0025a28db9179192B8bEF84D1B552d";
    const amount = hre.ethers.parseEther("100.0");

    console.log(`Sending 100 ETH from ${sender.address} to ${receiverAddress}...`);

    const tx = await sender.sendTransaction({
        to: receiverAddress,
        value: amount,
    });

    await tx.wait();

    console.log(`Successfully transferred 100 ETH.`);
    console.log(`Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
