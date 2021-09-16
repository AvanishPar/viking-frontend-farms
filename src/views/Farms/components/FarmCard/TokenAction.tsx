import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getClaimToken, getPendingToken, getPendingVEMP, getTokenAbi, stake } from 'utils/farmHarvest'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import starLAbi from '../../../../config/abi/starLAbi.json'
import sandAbi from '../../../../config/abi/sandAbi.json'
import axsABi from '../../../../config/abi/axsAbi.json'
import ethABI from '../../../../config/abi/ethAbi.json'
import cheffManaAbi from '../../../../config/abi/cheffMana.json'
import * as Addresses from '../../../../config/constants/addresses'

interface FarmCardActionsProps {
    farm?: any
    pid?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const TokenAction: React.FC<FarmCardActionsProps> = ({ farm, pid }) => {
    const TranslateString = useI18n()
    const [pendingTx, setPendingTx] = useState(false)
    const [earningBalance, setEarningBalance] = useState<number>()

    useEffect(() => {
        getPendingAmount()
        setInterval(getPendingAmount, 5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getPendingAmount = async () => {
        const earning = await getPendingToken(getTokenAbi(farm.lpSymbol), farm?.cheffAddress, farm?.lpSymbol)
        setEarningBalance(earning)
    }

    const handleStake = async () => {
        setPendingTx(true)

        await getClaimToken(getTokenAbi(farm.lpSymbol), farm?.cheffAddress, farm?.lpSymbol)
        setPendingTx(false)

    }


    return (
        <Flex mb='8px' justifyContent='space-between' alignItems='center'>
            <Heading color={earningBalance === 0 ? 'textDisabled' : 'text'}>{earningBalance}</Heading>
            <BalanceAndCompound>

                <Button
                    disabled={pendingTx || earningBalance === 0}
                    onClick={handleStake}
                >
                    {TranslateString(999, 'Loot')}
                </Button>
            </BalanceAndCompound>
        </Flex>
    )
}

export default TokenAction
