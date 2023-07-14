// Bridge to access web3
const { ethers } = require("ethers");
const { RPC, ETHERSCAN } = require("./config");
const addresses = require("./config").addresses;
const privateKey = require("./config").keys.main;

// Contract ABI dan alamat
const tokenABI = require("./tokenABI.json");
const tokenAddress = "ADDRESS TOKEN"; // Ganti dengan alamat kontrak token yang sesuai

const provider = new ethers.providers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(privateKey, provider);

(async function () {
  try {
    console.log("== Memulai Transaksi ==");

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

    const transactions = [];
    const transferAmount = ethers.BigNumber.from("100000000000000000000"); // Ganti dengan jumlah token yang ingin Anda transfer (dalam satuan uint256)

    const iterations = 10; // Tentukan jumlah pengulangan untuk melakukan transaksi berulang

    for (let j = 0; j < iterations; j++) {
      console.log(`=== Iterasi ${j + 1} ===`);
      
      for (let i = 0; i < 450; i++) {
        const toAddress = addresses[`W_${i + 2}`];
        const transaction = await tokenContract.transfer(toAddress, transferAmount);
        transactions.push(transaction);
        console.log(`Transfer Berhasil ke ${toAddress}. Tx => [${transaction.hash}]`);
      }
    }

    console.log(`== Transfer Selesai! ==`);
    console.log(`Lihat transaksi di: ${ETHERSCAN}/address/${wallet.address}`);

  } catch (err) {
    console.error(err);
  }
})();