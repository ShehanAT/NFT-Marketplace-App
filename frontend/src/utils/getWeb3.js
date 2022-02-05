import Web3 from 'web3';

const getWeb3 = () => 
    new Promise((resolve, reject) => {

        window.addEventListener("load", async() => {
            // Modern dapp browsers 
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);

                try{
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    resolve(web3);
                }catch(error){
                    reject("User denied account access. " + error);
                    console.log("User denied account access. " + error);
                }
            }
            // Legacy dapp browsers 
            else if(window.web3){
                // Use Mist/MetaMask's provider 

                const web3 = window.web3;
                console.log("Injected web3 dejected");
                resolve(web3);
            }
            else{
                const provider = new Web3.providers.HttpProvider(
                    "http://127.0.0.1:8545"
                );
                const web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                resolve(web3);
            }
        });
});

export default getWeb3;