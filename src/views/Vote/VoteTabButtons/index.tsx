import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link, } from 'react-router-dom'
import { Button, Text, Toggle } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n';

const VoteTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  return (
    <Wrapper>
      <Button as={Link} to="/makeProposal" /* onClick={handleMakeProposal} */>
        {TranslateString(698, 'Make a Proposal')}
      </Button>
      {/* <span style={{ padding: '20px' }} /> */}
      <Button as={Link} to="/history">
        {TranslateString(700, 'Proposal overview')}
      </Button>

    </Wrapper>
  )
}

export default VoteTabButtons

const Wrapper = styled.div`

  display: inline-flex;
  align-items: center;
  margin-bottom: 32px;
  a{
    font-weight: 100;
    color: #EAE3FB;
    border: 1px solid #FFFFFF;
    border-radius: 22px;
    margin-right: 10px;
    background-color: #27262c;

  }
  a:hover,a:active{
    border:1px solid #27262c;
    background-color: #27262c !important;
  }
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