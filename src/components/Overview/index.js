import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import ApartmentIcon from '@material-ui/icons/Apartment'
import GroupIcon from '@material-ui/icons/Group'
import Block from '@material-ui/icons/Block'
import BlurCircular from '@material-ui/icons/BlurCircular'

import Card from './Card'
import ScoreCard from './ScoreCard'
import LineChart from './LineChart'

import { useStyles } from './style'

const Overview = () => {
  const classes = useStyles()
  const [overallSocialDistancingScore] = useState(Object.create(null))

  useEffect(() => {}, [])

  return (
    <Container className={classes.root}>
      {/* Cards having count */}
      <Container className={classes.block}>
        <Grid container spacing={3}>
          <Card
            title="Plant Name"
            content="Money Plant"
            Icon={ApartmentIcon}
            iconColor="#ffbb00"
          />
          <Card
            title="Temperature"
            content="32"
            Icon={GroupIcon}
            iconColor="#00b8f0"
          />
          <Card
            title="Humidity"
            content="98 %"
            Icon={Block}
            iconColor="
          #6e00f0"
          />
          <Card
            title="Moisture"
            content="512"
            Icon={BlurCircular}
            iconColor="#eb1212"
          />
        </Grid>
      </Container>

      <Container className={classes.block}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sm={12} lg={3}>
            <ScoreCard
              titles={['Overall Social', 'Distancing Score']}
              status={overallSocialDistancingScore.status}
              percentage={overallSocialDistancingScore.percentage}
              statusColor={overallSocialDistancingScore.color}
              footer={`Data over last ${14} days`}
            />
          </Grid>

          <Grid item xs={12} md={9} sm={12} lg={9}>
            <LineChart
              heading="Temperature Variation"
              title="For a day"
              subtitle="Excellent"
              route="corporate/getAverageOverallSocialDistancing"
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Overview
