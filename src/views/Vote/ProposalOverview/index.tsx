import React, { useCallback, useState } from 'react'
import { Heading, Checkbox, Text, Radio, Button, useModal, Flex } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Divider from 'views/Farms/components/Divider'
import { getLocalStore } from 'utils/localStorage'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import LocalStores from 'config/LocalStores'
import VoteTabButtons from '../VoteTabButtons'
import ProposalTabButton from '../ProposalTabButton'
import VoteNowModal from './VoteNowModal'
import ProposalData from './ProposalData'

const Row = styled('div')`
  margin: 30px 0px;
  padding: 0;
`

const Title = styled(Text)`
    font-size: 24px;
    font-weight: 600;
    line-height: 1.1;
    color:#8a6a10!important;
    cursor:pointer
`

const ProposalOverview = () => {
  const proposalData = getLocalStore(LocalStores.PROPOSAL_DATA)
  /* const proposalId = proposalData.map((item) => item.id) */


  return (

    <Page>
      <Heading as="h1" size="lg" color="primary">
        Voting
      </Heading>
      <Heading as="h2" color="secondary" mb="50px">
        Have you say in the future of the vEmpire <br /> ecosystem
      </Heading>

      <VoteTabButtons />
      <div style={{ marginTop: '50px' }}>
        <Divider />
        <div>
          <Heading as="h1" size="lg" color="primary">
            Proposals
          </Heading>
          <Row>

            {proposalData ?
              (proposalData.map((item) => {
                return <ProposalData {...item} />
              })
              ) : 'No Proposal Count'}

          </Row>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Divider />
        <div>
          <Heading as="h1" size="lg" color="primary" style={{ marginBottom: '30px' }}>
            Got a Suggestion?
          </Heading>
          <p>Community Propsals are a great way to see how the community feels about your ideas.</p>
          <p>
            They wont neccessarily be implemented if the community votes successful, but suggestions with a lot of community support may be made into Core proposals.
          </p>
        </div>
      </div>
    </Page >
  )
}

export default ProposalOverview;
