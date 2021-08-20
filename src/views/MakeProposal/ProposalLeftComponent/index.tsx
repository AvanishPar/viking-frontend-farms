import React, { useState } from 'react'
// import { Heading, Checkbox, Radio, ButtonMenu, ButtonMenuItem, Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import AddParam from '../AddParam'

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

const ProposalLeftComponent = () => {
  const TranslateString = useI18n()
  // const [text, setText] = useState([])
  const [fields, setFields] = useState([{ value: null }])

  function handleChange(i, event) {
    const values = [...fields]
    values[i].value = event.target.value
    setFields(values)
  }

  function handleAdd() {
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
    <Container>
      <Label>Proposal Title :</Label>
      <Text type="text" placeholder="Title" />
      <Label>Content :</Label>
      <Card />
      <Label>Add Params :-</Label>
      <AddParam />
    </Container>
  )
}

export default ProposalLeftComponent
