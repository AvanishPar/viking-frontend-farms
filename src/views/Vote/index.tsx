import React, { useState, useCallback, useEffect } from 'react'
import { Heading, Checkbox, Radio, ButtonMenu, ButtonMenuItem, Button } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import VoteTabButtons from './VoteTabButtons'
import Vote from './Vote'

const Row = styled('div')`
  margin: 30px 0px;
  padding: 0;
`

const Votes: React.FC = () => {
  const TranslateString = useI18n();

  return (

    <Page>
      <Div>
        <Heading as="h1" size="lg" color="primary">
          Voting
        </Heading>
        <Heading as="h2" color="secondary" mt="30px" mb="50px">
          Have you say in the future of the vEmpire ecosystem
        </Heading>

        <VoteTabButtons />

        <Vote />
      </Div>
    </Page>
  )
}

export default Votes
const Divider = styled.div`
border:1px solid #27262c;
`

const Div = styled.div`
  text-align:center;
`