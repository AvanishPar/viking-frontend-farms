import React, { useState } from 'react'
import { Heading, Checkbox, Radio, ButtonMenu, ButtonMenuItem, Button } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Divider from 'views/Farms/components/Divider'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Label = styled('label')`
  font-size: 20px;
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
const Card = styled('div')`
  width: 100%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 20px;
`
const Row = styled('div')`
  display: flex;
  justify-content: space-between;
`
const ProposalRightComponent = () => {
  const TranslateString = useI18n()
  const [index, setIndex] = useState(0)

  return (
    <Container>
      <Heading as="h1" size="lg" color="primary" style={{ marginBottom: '30px' }}>
        Action
      </Heading>
      <Label>Start Date</Label>
      <Text type="date" placeholder="YYYY/MM/DD" />
      <Label>Start Time</Label>
      <Text type="time" placeholder="HH/MM" />
      <Label>End Date</Label>
      <Text type="date" placeholder="HH/MM" />
      <Label>End Time</Label>
      <Text type="time" placeholder="HH/MM" />
      <Row>
        <Label>Creater :-</Label>
        <Label>Oxabc...</Label>
      </Row>
      <Button style={{ alignSelf: 'center' }}>Publish</Button>
    </Container>
  )
}

export default ProposalRightComponent
