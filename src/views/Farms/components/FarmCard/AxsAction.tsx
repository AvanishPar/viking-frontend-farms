import React, { useEffect, useState } from 'react'
import { getClaimSlp, getPendingSlp, stake } from 'utils/farmHarvest'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import axsABi from '../../../../config/abi/axsAbi.json'
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

const AxsAction: React.FC<FarmCardActionsProps> = ({ farm, pid }) => {
    const TranslateString = useI18n()
    const [pendingTx, setPendingTx] = useState(false)
    const [earnings, setEarnings] = useState<number>()

    useEffect(() => {
        const getSlpEarning = async () => {
            const earn = await getPendingSlp(axsABi)
            setEarnings(earn)
        }
        setInterval(getSlpEarning, 5000)
        getSlpEarning()
    }, [])

    return (
        <Flex mb='8px' justifyContent='space-between' alignItems='center'>
            <Heading color={earnings === 0 ? 'textDisabled' : 'text'}>{earnings}</Heading>
            <BalanceAndCompound>

                <Button
                    disabled={earnings === 0 || pendingTx}
                    onClick={async () => {
                        setPendingTx(true)
                        await getClaimSlp()
                        setPendingTx(false)
                    }}
                >
                    {TranslateString(999, 'Loot')}
                </Button>
            </BalanceAndCompound>
        </Flex>
    )
}

export default AxsAction
