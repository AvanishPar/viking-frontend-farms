import Web3 from "web3";
import BigNumber from "bignumber.js";
import { ethers } from 'ethers';
import cheffAbi from '../config/abi/masterchef.json'
import erc20 from '../config/abi/manaToken.json'
import * as Addresses from '../config/constants/addresses'
import starLAbi from '../config/abi/starLAbi.json'
import sandAbi from '../config/abi/sandAbi.json'
import axsABI from '../config/abi/axsAbi.json'
import ethABI from '../config/abi/ethAbi.json'
import cheffManaAbi from '../config/abi/cheffMana.json'
import { getMasterChefAddressMana } from "./addressHelpers";



declare const window: any;
window.web3 = new Web3(window.ethereum);
// const cheffAddress = Address.masterChef
// const tokenAddress = Address.getTokenAddress


const cheffAddress = getMasterChefAddressMana()



export const fetchAccounts = () => {
    return new Promise((resolve, reject) => {
        const ethAccounts = getAccounts();
        resolve(ethAccounts)
    });
};


export const getChainId = async () => {
    try {
        const chainId = await window.web3?.eth?.getChainId()
        localStorage.setItem('chainId', chainId)
        return chainId;
    }
    catch (e) {
        return '';
    }
}


export const getAccounts = async () => {
    try {
        return await window.web3?.eth?.getAccounts();
    } catch (e) {
        return '';
    }
}


export const openMetamask = async () => {
    window.web3 = new Web3(window.ethereum);
    let addresses = await getAccounts();
    if (!addresses.length) {
        try {
            addresses = await window.ethereum.enable();
        } catch (e) {
            return false;
        }
    }
    return addresses.length ? addresses[0] : null;
};


// Get user Viking balance


export const getBalanceOf = async (lpAddress) => {
    try {
        const totalBalance = await window.web3.eth.getBalance(lpAddress, function (err: any, result: any) {
            if (err) {
                console.log(err)
            }
        })
        const totalUserBalance = totalBalance / 10 ** 18
        return totalUserBalance || 0;
    } catch (e) {
        return NaN;
    }
}


export const getLpPairAmount = async (lpAddress) => {
    const account = await checkConnectedAndGetAddress();
    try {
        if (lpAddress) {
            const contract = new window.web3.eth.Contract(
                erc20,
                lpAddress,
            );
            let lpPairResponse = await contract.methods.balanceOf(account).call();
            lpPairResponse = (lpPairResponse / 10 ** 18 || 0).toFixed(2)
            return lpPairResponse
        }
        return ""
    }
    catch (error) {
        return NaN
    }
}


// total liquidity


export const getTotalLiquidity = async (lpSymbol, tokenCheffAddress) => {
    let lpPairResponse
    const tokenABi = getTokenAbi(lpSymbol)
    try {
        if (tokenCheffAddress) {
            const contract = new window.web3.eth.Contract(
                tokenABi,
                tokenCheffAddress,
            );
            if (lpSymbol === 'MANA') {
                lpPairResponse = await contract.methods.totalMANAStaked().call();
            }
            else if (lpSymbol === 'STARTLINK') {
                lpPairResponse = await contract.methods.totalSTARLStaked().call();
            }
            else if (lpSymbol === 'ETH') {
                lpPairResponse = await contract.methods.totalETHStaked().call();
            }
            else if (lpSymbol === 'SAND') {
                lpPairResponse = await contract.methods.totalSANDStaked().call();
            }
            else if (lpSymbol === 'AXS') {
                lpPairResponse = await contract.methods.totalAXSStaked().call();
            }

            lpPairResponse = (lpPairResponse / 10 ** 18 || 0).toFixed(2)
            return lpPairResponse
        }
        return ""
    }
    catch (error) {
        return NaN
    }
}


// Get BNB balance


export const getBnbBalanceOf = async () => {
    try {
        const account = await checkConnectedAndGetAddress();
        const totalBalance = await window.web3.eth.getBalance(account, function (err: any, result: any) {
            if (err) {
                console.log(err)
            }
        })
        const totalUserBalance = totalBalance / 10 ** 18
        return totalUserBalance || 0;
    } catch (e) {
        return NaN;
    }
}


// Function to get userAddress


export const checkConnectedAndGetAddress = async () => {
    // console.log('web3', window.web3);
    let addresses = await window?.web3?.eth?.getAccounts();
    if (!addresses?.length) {
        addresses = await window.ethereum.enable();


    }
    return addresses[0];
};


// Function to call donate function


export const stake = async (lpSymbol, tokenCheffAddress, amount) => {
    const tokenABI = getTokenAbi(lpSymbol)
    try {
        if (tokenCheffAddress) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                tokenABI,
                tokenCheffAddress,
            );
            const reqAmount = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

            if (lpSymbol === 'ETH') {
                const cheffResponse = await contract.methods.deposit(reqAmount)
                    .send({ from: account, value: reqAmount });
                return cheffResponse;
            }
            const cheffResponse = await contract.methods.deposit(0, reqAmount)
                .send({ from: account });
            return cheffResponse;
        }
        return ""
    }
    catch (error) {
        console.log(error)
        return []
    }
}


export const approve = async (lpAddress, tokenCheffAddress) => {
    const lpPairAddress = lpAddress
    try {
        if (lpPairAddress) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                erc20,
                lpPairAddress,
            );
            const cheffResponse = await contract.methods.approve(tokenCheffAddress, ethers.constants.MaxUint256)
                .send({ from: account });
            return cheffResponse;
        }
        return ""
    }
    catch (error) {

        console.log(error)
        return ''
    }
}



// Function to call withdraw amount function


export const withdraw = async (pid, amount) => {
    try {
        if (cheffAddress) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                cheffAbi,
                cheffAddress,
            );
            const reqAmount = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()


            const cheffResponse = await contract.methods.withdraw(0, reqAmount)
                .send({ from: account });
            return cheffResponse;
        }
        return ""
    }
    catch (error) {

        console.log(error)
        return ''
    }
}


// Function to get staked amount


export const getUserInfo = async (tokenCheffAddress, lpSymbol) => {
    const tokenABi = getTokenAbi(lpSymbol)
    let cheffResponse
    try {
        if (cheffAddress) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                tokenABi,
                tokenCheffAddress,
            );
            if (lpSymbol === 'ETH') {
                cheffResponse = await contract.methods.userInfo(account)
                    .call()
            }
            else {
                cheffResponse = await contract.methods.userInfo(0, account)
                    .call()
            }

            const reqResult = new BigNumber(cheffResponse.amount).div(new BigNumber(10).pow(18)).toString()
            return reqResult
        }
        return ""
    }
    catch (error) {
        return 'NaN'
    }
}



export const getAllowances = async (lpAddress, tokenCheffAddress) => {
    const account = await checkConnectedAndGetAddress();
    try {
        if (lpAddress) {
            const contract = new window.web3.eth.Contract(
                erc20,
                lpAddress,
            );
            const allowanceResponse: any = await contract.methods.allowance(account, tokenCheffAddress).call();


            return allowanceResponse
        }
        return ""
    }
    catch (error) {
        return NaN
    }
}



export const getPendingVEMP = async (tokenCheffAddress, lpSymbol) => {
    const tokenABi = getTokenAbi(lpSymbol)
    const account = await checkConnectedAndGetAddress();
    let pendingEggsResponse
    try {
        if (tokenCheffAddress) {
            const contract = new window.web3.eth.Contract(
                tokenABi,
                tokenCheffAddress,

            );
            if (lpSymbol === 'ETH') {
                pendingEggsResponse = await contract.methods.pendingVEMP(account).call();
            }
            else {
                pendingEggsResponse = await contract.methods.pendingVEMP(0, account).call();
            }

            pendingEggsResponse = ((pendingEggsResponse / 10 ** 18) || 0)
            return pendingEggsResponse

        }
        return ""
    }
    catch (error) {
        return NaN
    }
}


// to get multiplier value


export const getPoolInfo = async (lpSymbol, tokenCheffAddress) => {
    const tokenABi = getTokenAbi(lpSymbol)
    try {
        if (tokenCheffAddress) {
            const contract = new window.web3.eth.Contract(
                tokenABi,
                tokenCheffAddress,
            );
            let poolInfo
            if (lpSymbol === "ETH") {
                poolInfo = await contract.methods.poolInfo().call();
            }
            else {
                poolInfo = await contract.methods.poolInfo(0).call();
            }


            poolInfo = (poolInfo.allocPoint) / 100;


            return poolInfo;
        }
        return ""
    }
    catch (error) {
        return NaN
    }
}




export const getDepositFees = async (pid) => {
    try {
        if (cheffAddress) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                cheffAbi,
                cheffAddress,
            );
            const depositFee = await contract.methods.userInfo(0, account).call();


            return depositFee.amount;


        }
        return ""
    }
    catch (error) {
        return NaN
    }
}


export const getPendingToken = async (ABI, Address, lpSymbol) => {

    let pendingResponse
    try {
        if (Address) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                ABI,
                Address,
            );
            if (lpSymbol === 'STARL') {
                pendingResponse = await contract.methods.pendingSTARL(0, account)
                    .call()
            }
            else if (lpSymbol === 'MANA') {
                pendingResponse = await contract.methods.pendingMANA(0, account)
                    .call()
            }
            else if (lpSymbol === 'SAND') {
                pendingResponse = await contract.methods.pendingSAND(0, account)
                    .call()
            }
            else if (lpSymbol === 'AXS') {
                pendingResponse = await contract.methods.pendingAXS(0, account)
                    .call()
            }
            else if (lpSymbol === 'ETH') {
                pendingResponse = await contract.methods.pendingETH(account)
                    .call()
            }

            pendingResponse = ((pendingResponse / 10 ** 18) || 0)
            return pendingResponse
        }
        return ""
    }
    catch (error) {
        return 'NaN'
    }
}

export const getPendingSlp = async (ABI) => {
    const account = await checkConnectedAndGetAddress();
    try {
        if (Addresses.axs) {
            const contract = new window.web3.eth.Contract(
                ABI,
                Addresses.axs,
            );
            let pendingEggsResponse = await contract.methods.pendingSLP(0, account).call();
            pendingEggsResponse = ((pendingEggsResponse) || 0)
            return pendingEggsResponse

        }
        return ""
    }
    catch (error) {
        return NaN
    }
}


export const getClaimToken = async (ABI, Address, lpSymbol) => {
    let claimResponse
    try {
        if (Address) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                ABI,
                Address,
            );
            // const reqAmount = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
            if (lpSymbol === 'STARL') {
                claimResponse = await contract.methods.claimSTARL(0)
                    .send({ from: account });
            }
            else if (lpSymbol === 'MANA') {
                claimResponse = await contract.methods.claimMANA(0)
                    .send({ from: account });
            }
            else if (lpSymbol === 'SAND') {
                claimResponse = await contract.methods.claimSAND(0)
                    .send({ from: account });
            }
            else if (lpSymbol === 'AXS') {
                claimResponse = await contract.methods.claimAXS(0)
                    .send({ from: account });
            }
            else if (lpSymbol === 'ETH') {
                claimResponse = await contract.methods.claimETH()
                    .send({ from: account });
            }


            return claimResponse;
        }
        return ""
    }
    catch (error) {

        console.log(error)
        return ''
    }
}

export const getClaimSlp = async () => {
    try {
        if (Addresses.axs) {
            const account = await checkConnectedAndGetAddress();
            const contract = new window.web3.eth.Contract(
                axsABI,
                Addresses.axs,
            );
            // const reqAmount = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
            const claimResponse = await contract.methods.claimSLP(0)
                .send({ from: account });
            return claimResponse;
        }
        return ""
    }
    catch (error) {

        console.log(error)
        return ''
    }

}

export const getTokenAbi = (lpSymbol) => {
    switch (lpSymbol) {
        case 'MANA': {
            return cheffManaAbi
        }
        case 'STARTLINK': {
            return starLAbi
        }
        case 'SAND': {
            return sandAbi
        }
        case 'AXS': {
            return axsABI
        }
        case 'ETH': {
            return ethABI
        }
        default:
            return ''
    }
}