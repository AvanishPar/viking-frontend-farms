import { Heading, Checkbox } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import React from 'react'
import Divider from 'views/Farms/components/Divider'
import VoteTabButtons from './VoteTabButtons'

const Vote = () => {
    return (
        <Page>
            <Heading as="h1" size="lg" color="primary" >
                Voting
            </Heading>
            <Heading as="h2" color="secondary" mb="50px" >
                Have you say in the future of the vEmpire <br /> ecosystem
            </Heading>

            <VoteTabButtons />
            <div style={{ marginTop: "50px" }}>
                <Divider />
                <div >
                    <Heading as="h1" size="lg" color="primary" >
                        Proposals
                    </Heading>
                    <div>
                        <Checkbox scale="sm" />Vote Now
                        <Checkbox scale="sm" />Closed
                    </div>
                </div>
            </div>
            {/* <Image src="/images/egg/8.png" alt="illustration" width={1352} height={587} responsive /> */}
        </Page>
    )
}

export default Vote
