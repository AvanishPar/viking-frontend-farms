import React, { useCallback, useEffect, useState } from 'react'
import { Heading, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useUserAccount from 'hooks/useUserAccount'
import ProposalInput from '../ProposalInput'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Label = styled('label')`
  font-size: 20px;
  color:#ffffff;
  margin-bottom: 20px;
`
const Text = styled('input')`
  font-size: 20px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 0px;
  margin-bottom: 20px;
`
const PublishButton = styled(Button)`
background-color: #27262c !important;
border: 1px solid #FFFFFF !important;
`
const TextField = styled('input')`
  width:250px;
  padding:10px;
  border:none;
  border-radius:8px;
  font-size:20px;
  padding:10px;
  outline:none;
  margin-bottom:20px;
`


const Row = styled('div')`
  display: flex;
`
interface ProposalProps {
  handleContract?: (e) => void
  handleEther?: (e) => void
  onPublish?: () => void
  value?: any
}

const ProposalRight: React.FC<ProposalProps> = ({ value, handleContract, handleEther, onPublish }) => {
  const [pendingTx, setPendingTx] = useState(true)
  // console.log(value);
  const [date, setDate] = useState(new Date())
  const { account } = useUserAccount()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  // const checkParam = () =>{
  //   const count = value.paramValue.length;
  //   let flag = true; 
  //   for(let i=0;i<count;i++){
  //     if(value.paramValue[i].value === null){
  //       flag = true
  //     }else{
  //       flag = false
  //     }
  //   }
  //  return flag; 
  // } 
  useEffect(() => {
    if (value.contract && value.ether && value.title && value.address && value.description && value.paramValue[0].value.length !== 0) {
      setPendingTx(false)
    } else {
      setPendingTx(true)
    }
  }, [value])

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <Container>
      <Heading as="h1" size="lg" color="primary" style={{ marginBottom: '30px', marginTop: '30px' }}>
        Action
      </Heading>
      <Row>
        <div style={{ marginRight: "30px" }}>
          <Label>Start Date</Label><br /><br />
          {/* <ProposalInput value={date.toLocaleDateString()} readonly="readOnly" /> */}
          <TextField value={date.toLocaleDateString()} />
        </div>
        <div>
          <Label>Start Time</Label><br /><br />
          {/* <ProposalInput  value={date.toLocaleTimeString()} readonly="readOnly" /> */}
          <TextField value={date.toLocaleTimeString()} />
        </div>
      </Row>
      <Row>
        <div style={{ marginRight: "30px" }}>
          <Label>Ether Value</Label><br /><br />
          <TextField value={value.ether} onChange={(e) => handleEther(e.currentTarget.value)} placeholder="Value" />
          {/* <ProposalInput value={value.ether} onChange={(e) => handleEther(e.currentTarget.value)} /> */}
        </div>
        <div>
          <Label>Contract Method</Label><br /><br />
          <TextField value={value.contract} onChange={(e) => handleContract(e.currentTarget.value)} placeholder="Method" />
          {/* <ProposalInput value={value.contract} onChange={(e) => handleContract(e.currentTarget.value)} /> */}
        </div>
      </Row>
      <Row>
        <Label>Creater {accountEllipsis}</Label>
      </Row>
      <PublishButton disabled={pendingTx} onClick={onPublish} style={{ alignSelf: 'flex-end' }}>
        Publish
      </PublishButton>
    </Container>
  )
}

export default ProposalRight
