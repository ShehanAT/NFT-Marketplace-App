import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import ReactTooltip from "react-tooltip";
import { Watch, Audio } from "react-loader-spinner";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")
import { 
    nftmarketaddress
} from '../../../nftConfig';


const watchLoadingSpinner = {
    Component: Watch,
    props: {
        props: {
            color: "#000000",
            height: 100,
            width: 110
          },
          name: "Loading..."
    }
}

import Market from "../../../artifacts/contracts/Market.sol/NFTMarket.json";

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', category: ''});
    const [showLoadingSpinner, setLoadingSpinner] = useState(false);
    const router = useRouter()


    async function onChange(e){
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file, 
                { 
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url);
        } catch(error){
            console.log('Error uploading file: ', error);
        }
    }

    async function createMarket() {
        const { name, description, price, category } = formInput 
        if(!name || !description || !price || !fileUrl || !category) return 
        const data = JSON.stringify({
            name, description, image: fileUrl, category
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log("Infura Url: ");
            console.log(url);
            setLoadingSpinner(true)
            createSale(url)
        }catch(error){
            console.log('Error uploading file: ', error)
        }
    }

    async function createSale(url){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect() 
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner() 

        const ethPrice = ethers.utils.parseUnits(formInput.price, "ether");
        let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let transaction = await contract.createToken(url, ethPrice, { value: ethPrice })

        await transaction.wait() 
        router.push('/')
    }


    return (

        <div className={styles.container}>
             <div className="flex justify-center">
                <h3>SELL NFT</h3>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input 
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <select 
                    className="mt-2 border rounded p-4" 
                    onChange={e => updateFormInput({ ...formInput, category: e.target.value })}
                    >
                        <option value="" defaultValue={true} >Select NFT category</option>
                        <option value="Animals">Animals</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Music">Music</option>
                        <option value="Art">Art</option>
                    </select>
                    <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={onChange}
                    />

                    {
                    fileUrl && (
                        <Image className="rounded mt-4" width="350" height="350" src={fileUrl} />
                    )
                    }
                    <div className="grid grid-cols-2">
                        <button onClick={createMarket} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
                        Create Digital Asset
                        </button>
                        {(showLoadingSpinner) ?  
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 p-5">
                                <div
                                data-tip={watchLoadingSpinner.name}
                                data-for="happyFace"
                                key={watchLoadingSpinner.name + 0}
                                className="loaderBox"
                                >
                                <watchLoadingSpinner.Component {...watchLoadingSpinner.props} />
                                </div>
                            </div>
                        :
                            <div></div>
                        }
                    </div>
                  
                </div>
            </div>
        </div>
    );

}