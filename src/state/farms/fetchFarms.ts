import BigNumber from 'bignumber.js'
import React from 'react'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import { getDepositFees, getPoolInfo, getUserInfo, getPendingVEMP, getLpPairAmount, getTotalLiquidity, getBnbBalanceOf } from 'utils/farmHarvest'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'



const fetchFarms = async () => {

  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const deposit = await getLpPairAmount(farmConfig.lpAddresses)
      const poolMultiplier = await getPoolInfo(farmConfig.lpSymbol, farmConfig.cheffAddress)
      const earnAmount = await getPendingVEMP(farmConfig.cheffAddress, farmConfig.lpSymbol)
      const totalLiquidity = await getTotalLiquidity(farmConfig.lpSymbol, farmConfig.cheffAddress)
      const userStakedAmount = await getUserInfo(farmConfig.cheffAddress, farmConfig.lpSymbol)
      const userBalance = await getBnbBalanceOf()
      // const allocPoint = new BigNumber(info.allocPoint._hex)
      // const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        multiplier: poolMultiplier,
        depositFeeBP: deposit,
        earnAmountFarm: earnAmount,
        stakedAmount: userStakedAmount,
        totalLiquidityAmount: totalLiquidity,
        userEthBalance: userBalance
        // vikingPerBlock: new BigNumber(vikingPerBlock).toNumber(),
      }
    }),
  )
  return data
}

export default fetchFarms
