import { ActionTypes } from "../constants";

export const selectedNft = (nft) => {
  return {
    type: ActionTypes.SELECTED_NFT,
    payload: nft
  };
};

export const removeSelectedNft = (nft) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_NFT
  };
};

export const setNft = (nft) => {
  return {
    type: ActionTypes.setNft,
    payload: nft
  };
};

export const setAccount = (nft) => {
  return {
    type: ActionTypes.setAccount,
    payload: nft
  };
};

export const setTokenContract = (nft) => {
  return {
    type: ActionTypes.setTokenContract,
    payload: nft
  };
};

export const setMarketContract = (nft) => {
  return {
    type: ActionTypes.setMarketContract,
    payload: nft
  };
};
