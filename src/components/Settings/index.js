import React from 'react'
import { Container, Grid, Paper } from '@material-ui/core'

import SearchBar from './SearchBar'
import Card from './Card'

import { useStateValue } from '../../store/stateProvider'
import useStyles from './style.js'

const Setting = () => {
  const classes = useStyles()

  return (
    <Container>
      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          <Grid container>
            <SearchBar />
          </Grid>
        </Paper>
        <Grid container spacing={3} xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card
              title="Plant Name"
              content="Money Plant"
              iconColor="#ffbb00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card
              title="Plant Name"
              content="Money Plant"
              iconColor="#ffbb00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card
              title="Plant Name"
              content="Money Plant"
              iconColor="#ffbb00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card
              title="Plant Name"
              content="Money Plant"
              iconColor="#ffbb00"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Setting
