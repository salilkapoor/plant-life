import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
  CircularProgress
} from '@material-ui/core'
import { API_GET } from '../../../utils/api'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
    padding: '17px 40px',
    minWidth: 300,
    minHeight: 375
  },
  heading: {
    fontSize: '18px'
  },
  title: {
    fontSize: '16px'
  },
  subtitle: {
    fontSize: '14px'
  }
}))

const CustomLineChart = ({ heading, title, subtitle, route }) => {
  const classes = useStyles()
  const [type, setType] = useState('tempHumidity')
  const [data, setData] = useState([])
  const [head, setHead] = useState(heading)

  useEffect(() => {
    API_GET(`${route}/${type}`)
      .then((res) => {
        setData(res.data.dataset)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [type, route])

  const handleType = (e) => {
    let map = {
      moisture: 'Moisture',
      tempHumidity: 'Temperature'
    }
    setHead(map[e.target.value])
    setType(e.target.value)
  }

  return (
    <Grid item xs={12} md={12} sm={12} lg={12}>
      <Paper className={classes.content}>
        <Grid container>
          <Grid item xs={12} md={9} sm={12} lg={9}>
            <Grid item xs>
              <Typography className={classes.heading}>
                <b>{head}</b>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
            <Grid item xs>
              <Typography className={classes.subtitle}>{subtitle}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={3} md={3} sm={3} lg={3}>
            <Select
              value={type}
              displayEmpty
              className={'chart-filter'}
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleType}
            >
              <MenuItem value={'moisture'}>Moisture</MenuItem>
              <MenuItem value={'tempHumidity'}>Temperature</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <div
            style={{
              height: 272,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {data.length > 0 ? (
              <ResponsiveContainer>
                <LineChart
                  width={600}
                  minHeight={300}
                  data={data}
                  margin={{ top: 25, bottom: 5 }}
                >
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey={data[0] && Object.keys(data[0])[0]} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    name={data[0] && Object.keys(data[0])[1]}
                    type="monotone"
                    dataKey={data[0] && Object.keys(data[0])[1]}
                    stroke="#8884d8"
                    strokeWidth="2"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default CustomLineChart
