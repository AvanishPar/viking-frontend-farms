import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import * as Addresses from 'config/constants/addresses'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  farm?: any
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  farm,
  bscScanAddress,
  removed,
  lpLabel,
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        {
          farm.lpSymbol === 'ETH' ?
            (<StyledLinkExternal href={`https://kovan.etherscan.io/address/${Addresses.cheffEth}`}>
              {lpLabel}
            </StyledLinkExternal>) :
            (<StyledLinkExternal href={`https://kovan.etherscan.io/address/${farm.lpAddresses}`}>
              {lpLabel}
            </StyledLinkExternal>)
        }

      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total staked in pool')}:</Text>
          <Text>{farm.totalLiquidityAmount}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on EtherScan')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
