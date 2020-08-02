import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { FirebaseDatabaseNode } from '@react-firebase/database'

// Icons
import { ReactComponent as Temperature } from '../Assets/icons/temperature.svg'
import { ReactComponent as Humidity } from '../Assets/icons/humidity.svg'
import { ReactComponent as Moisture } from '../Assets/icons/moisture.svg'
import { ReactComponent as Plant } from '../Assets/icons/plant.svg'

// Components
import Card from './Card'
import StandardRating from './StandardRating'
import LineChart from './LineChart'

// CSS
import { useStyles } from './style'

// Store
import { useStateValue } from '../../store/stateProvider'

const Overview = () => {
  const classes = useStyles()
  const [store] = useStateValue()

  return (
    <Container className={classes.root}>
      <Container className={classes.block}>
        <Grid container spacing={3}>
          <Card
            title="Plant Name"
            content={`${store?.plantSelected?.commonName}`}
            Icon={Plant}
            iconColor="#337f8cd9"
          />
          <FirebaseDatabaseNode
            path={`/${store?.plantSelected?.deviceId}/lastUpdated/tempHumidity`}
          >
            {(data) => {
              return (
                <>
                  <Card
                    title="Temperature"
                    content={`${data?.value?.temperature} \u00B0C`}
                    Icon={Temperature}
                    iconColor="#28a1c5"
                  />
                  <Card
                    title="Humidity"
                    content={`${data?.value?.humidity} %`}
                    Icon={Humidity}
                    iconColor="#6e00f0"
                  />
                </>
              )
            }}
          </FirebaseDatabaseNode>
          <FirebaseDatabaseNode
            path={`/${store?.plantSelected?.deviceId}/lastUpdated/soilMoisture`}
          >
            {(data) => {
              return (
                <Card
                  title="Moisture"
                  content={`${data?.value?.moisture} %`}
                  Icon={Moisture}
                  iconColor="#b5006d"
                />
              )
            }}
          </FirebaseDatabaseNode>
        </Grid>
      </Container>
      <Container className={classes.block}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sm={12} lg={3}>
            <StandardRating
              titles={['Plant Profile']}
              ratings={store?.plantSelected}
              footer={`Standard plant rating`}
            />
          </Grid>

          <Grid item xs={12} md={9} sm={12} lg={9}>
            <LineChart
              heading="Temperature"
              route={`sensors/${store?.plantSelected?.deviceId}`}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Overview
