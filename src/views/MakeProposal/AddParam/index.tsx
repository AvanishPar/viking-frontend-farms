import React, { useState } from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Label = styled('label')`
  font-size: 20px;
  margin-bottom: 30px;
`
const Text = styled('input')`
  font-size: 20px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 0px;
  margin-bottom: 30px;
`
const Card = styled('div')`
  width: 100%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 30px;
`
const ParamContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const ProposalLeftComponent = () => {
  const [keyValue, setKeyValue] = useState(0)

  const [fields, setFields] = useState([{ value: null }])   
  // let counter = 0;

  function handleChange(i, event) {
    const values = [...fields]
    values[i].value = event.target.value
    setFields(values)
  }

  function handleAdd() {
   // const random = Math.floor(Math.random() *10000);
   // setKeyValue(random);
    // console.log(counter)    
    const values = [...fields]
   
    values.push({ value: null })
    setFields(values)
   
  }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  return (
    <>
      {fields.map((field, idx) => {
        return (
          <ParamContainer key={`${keyValue}`} >
            {console.log(keyValue) }
            <Text key={`${keyValue}`} type="text" placeholder="Params" onChange={(e) => handleChange(idx, e)} />
          </ParamContainer>
        )
      })}
      <Button style={{ alignSelf: 'center' }} onClick={() => handleAdd()}>
        Add Param
      </Button>
    </>
  )
}

export default ProposalLeftComponent
