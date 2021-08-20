import BigNumber from 'bignumber.js'
import React from 'react'
import erc20 from 'config/abi/erc20.json'
import { getDepositFees, getPoolInfo, getUserInfo, getPendingVEMP,getBalanceVemp } from 'utils/VoteHarvest'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import votesConfig from 'config/constants/votes'



const CHAIN_ID = 56

const fetchVote = async () => {
 
  const data = await Promise.all(
    votesConfig.map(async (farms) => {
      const deposit = await getDepositFees(farms.pid)
      const poolMultiplier = await getPoolInfo(farms.pid)
      const earnAmount = await getBalanceVemp()
      
      const userStakedAmount = await getUserInfo(farms.pid)

      // const allocPoint = new BigNumber(info.allocPoint._hex)
      // const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farms,
        // tokenAmount: tokenAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount,
        // lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        // tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        // poolWeight: poolWeight.toNumber(),
        // multiplier: `${allocPoint.div(100).toString()}X`,
        multiplier: poolMultiplier,
        depositFeeBP: deposit,
        earnAmountFarm:earnAmount,
        stakedAmount: userStakedAmount
        // vikingPerBlock: new BigNumber(vikingPerBlock).toNumber(),
      }
    }),
  )
  return data
}

export default fetchVote
