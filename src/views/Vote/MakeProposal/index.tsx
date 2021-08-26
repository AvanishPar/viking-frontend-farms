import React, { useReducer, useState } from 'react'
import { Heading, Button } from '@pancakeswap-libs/uikit'
import { setLocalStore, getLocalStore } from 'utils/localStorage'
import LocalStores from 'config/LocalStores'
import Page from 'components/layout/Page'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { proposeCount, propose } from 'utils/alphaGovernor'
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
  description: null,
  paramValue: null,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTRACT':
      return {
        ...state,
        contract: action.value
      };
    case 'ETHER':
      return {
        ...state,
        ether: action.value
      };
    case 'TITLE':
      return {
        ...state,
        title: action.value
      };
    case 'ADDRESS':
      return {
        ...state,
        address: action.value
      };
    case 'TEXTAREA':
      return {
        ...state,
        description: action.value
      };
    case 'PARAMCHANGE':
      return {
        ...state,
        paramValue: action.value
      };
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

  const addZero = (num) => {
    const total = 64;
    const loopCount = total - num;
    let str = ''
    for (let i = 0; i < loopCount; i++) {
      str += '0'
    }
    return str;
  }

  const hexValue = (value) => {
    let nHex
    const result = value.map((item) => {

      if ((item.value).substring(0, 2) === '0x') {
        const newValue = (item.value)?.substring(2)
        const num = newValue.length;
        nHex = `${addZero(num)}${newValue}`
      }
      else {
        const hex = `${Number(item.value).toString(16)}`;
        const num = hex.length;
        nHex = `0x${addZero(num)}${hex}`
      }
      return nHex
    }
    )

    const params = result.join('')
    return params

  }



  const onPublish = async () => {
    const value = getLocalStore(LocalStores.PROPOSAL_DATA)
    const proposalCount = await proposeCount()
    const paramData = hexValue(state.paramValue)

    const item = [
      ...value,
      {
        id: Number(proposalCount) + 1,
        title: state.title,
        description: state.description,
      }
    ]

    const proposeResult = await propose([state.address], [Number(state.ether)], [state.contract], [paramData], (state.description))
    if (proposeResult.status === true) {
      setLocalStore(LocalStores.PROPOSAL_DATA, item)
    }
  }

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
          <ProposalRight handleEther={handleEtherValue} handleContract={handleContractAddress} onPublish={onPublish} />
        </Action>
      </Row>

    </Page>
  )
}

export default MakeProposal
