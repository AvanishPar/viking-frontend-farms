import React, { useReducer, useState } from 'react'
import { Heading, Checkbox, Radio, ButtonMenu, ButtonMenuItem, Button } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import ProposalRight from './ProposalRight'
import ProposalLeft from './ProposalLeft'

const Row = styled('div')`
  display: flex;
  justify-content: space-between;
`
const Title = styled('div')`
  flex: 0.6;
  margin-right:50px
`
const Action = styled('div')`
  flex: 0.4;
`

const initialState =
{
  contract: null,
  ether: null,
  title: null,
  address: null,
  textArea: null,
  paramValue: null,
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'CONTRACT':
      return { contract: action.value };
    case 'ETHER':
      return { ether: action.value };
    case 'TITLE':
      return { title: action.value };
    case 'ADDRESS':
      return { address: action.value };
    case 'TEXTAREA':
      return { textArea: action.value };
    case 'PARAMCHANGE':
      return { paramValue: action.value };
    default:
      throw new Error();
  }
};


const MakeProposal = () => {

  const [state, dispatch] = useReducer(counterReducer, initialState);

  const handleEtherValue = (e) => {
    dispatch({
      type: 'ETHER',
      value: e
    });
  };

  const handleContractAddress = (e) => {
    dispatch({
      type: 'CONTRACT',
      value: e
    });
  };

  const handleProposalTitle = (e) => {
    dispatch({
      type: 'TITLE',
      value: e
    });
  };

  const handleAddress = (e) => {
    dispatch({
      type: 'ADDRESS',
      value: e
    });
  };

  const handleTextArea = (e) => {
    dispatch({
      type: 'TEXTAREA',
      value: e
    });
  };

  const handleParamChange = (e) => {
    dispatch({
      type: 'PARAMCHANGE',
      value: e
    });
  };



  return (
    <Page>
      <NavLink to="/vote">
        <Button style={{ alignSelf: 'center', marginBottom: '20px' }} >
          Back
        </Button>
      </NavLink>

      <NavLink to="/history">
        <Button style={{ alignSelf: 'center', marginBottom: '20px', marginLeft: '10px' }} >
          Proposal Overview
        </Button>
      </NavLink>

      <Heading as="h1" size="lg" color="primary" style={{ marginBottom: '30px' }}>
        Make a Proposal
      </Heading>
      <Row>
        <Title>
          <ProposalLeft handleParamChange={handleParamChange} handleTitle={handleProposalTitle} handleAddress={handleAddress} handleTextArea={handleTextArea} />
        </Title>
        <Action>
          <ProposalRight handleEther={handleEtherValue} handleContract={handleContractAddress} />
        </Action>
      </Row>

    </Page>
  )
}

export default MakeProposal
