import React, { useState } from 'react'
import { Heading, Checkbox, Radio, ButtonMenu, ButtonMenuItem, Button } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import {NavLink} from 'react-router-dom'
import Divider from 'views/Farms/components/Divider'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import ProposalRightComponent from './ProposalRightComponent'
import ProposalLeftComponent from './ProposalLeftComponent'

const Row = styled('div')`
  display: flex;
  justify-content: space-between;
`
const LeftComponent = styled('div')`
  flex: 0.6;
  margin-right:50px
`
const RightComponent = styled('div')`
  flex: 0.4;
`
const MakeProposal = () => {
  const TranslateString = useI18n()
  const [index, setIndex] = useState(0)

  const handleClick = (newIndex) => setIndex(newIndex)
  return (
    <Page>
      <NavLink to="/vote">
      <Button style={{ alignSelf: 'center' ,marginBottom:'20px'}} >
        Back 
      </Button>
      </NavLink>
       
      <Heading as="h1" size="lg" color="primary" style={{ marginBottom: '30px' }}>
        Make a Proposal
      </Heading>
      <Row>
        <LeftComponent>
          <ProposalLeftComponent />
        </LeftComponent>
        <RightComponent>
          <ProposalRightComponent />
        </RightComponent>
      </Row>

      {/* <Image src="/images/egg/8.png" alt="illustration" width={1352} height={587} responsive /> */}
    </Page>
  )
}

export default MakeProposal
