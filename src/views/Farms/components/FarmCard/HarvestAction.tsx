import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { getPendingVEMP } from 'utils/farmHarvest'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const [earningBalance, setEarningBalance] = React.useState<number>(0)

  // React.useEffect(() => {
  //   const getEarningBalance = async () => {
  //     const value: any = await getPendingVEMP(pid)
  //     setEarningBalance(value)
  //   }
  //   getEarningBalance()
  //   const id = setInterval(getEarningBalance, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [pid])

  // const rawEarningsBalance = getBalanceNumber(earnings)
  // const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex mb='8px' justifyContent='space-between' alignItems='center'>
      <Heading color={earningBalance === 0 ? 'textDisabled' : 'text'}>{earningBalance}</Heading>
      <BalanceAndCompound>

        <Button
          disabled={earningBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'Harvest')}
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
