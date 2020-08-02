import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper } from '@material-ui/core'

import SearchBar from './SearchBar'
import Card from './Card'

import useStyles from './style.js'

import { API_GET } from '../../utils/api'

const Setting = () => {
  const classes = useStyles()
  const [plants, setPlants] = useState([])

  useEffect(() => {
    API_GET(`users/plants`)
      .then((res) => {
        setPlants(res.data)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }, [])

  return (
    <Container>
      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          <Grid container>
            <SearchBar />
          </Grid>
        </Paper>
        <Grid container spacing={3} xs={12} sm={12} md={12} lg={12}>
          {plants.map(({ plantId, deviceId }) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Card plantName={plantId.commonName} deviceId={deviceId} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Setting
