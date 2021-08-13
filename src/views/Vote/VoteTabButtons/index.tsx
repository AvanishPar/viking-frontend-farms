import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const VoteTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm" >
        <ButtonMenuItem as={Link} to={`${url}`}>
          {TranslateString(698, 'Make a Proposal')}
        </ButtonMenuItem>
        {/* <span style={{ padding: '20px' }} /> */}
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(700, 'Proposal overview')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default VoteTabButtons

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 8px;
  }
`