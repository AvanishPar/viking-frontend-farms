import BigNumber from 'bignumber.js'
import React from 'react'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import { getDepositFees, getPoolInfo } from 'utils/farmHarvest'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'


const CHAIN_ID = 56

const fetchFarms = async () => {

  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const deposit = await getDepositFees(farmConfig.pid)
      const poolMultiplier = await getPoolInfo(farmConfig.pid)

      // const allocPoint = new BigNumber(info.allocPoint._hex)
      // const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        // tokenAmount: tokenAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount,
        // lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        // tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        // poolWeight: poolWeight.toNumber(),
        // multiplier: `${allocPoint.div(100).toString()}X`,
        multiplier: poolMultiplier,
        depositFeeBP: deposit,
        // vikingPerBlock: new BigNumber(vikingPerBlock).toNumber(),
      }
    }),
  )
  return data
}

export default fetchFarms
