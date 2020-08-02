import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

import useStyles from './style.js'

const StandardRating = ({ titles, ratings, footer }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.scorecard} xs={12} sm={12} md={4} lg={4}>
      <Paper className={classes.content}>
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            justify="center"
            className={classes.titleWrapper}
          >
            {titles?.map((title, index) => {
              return (
                <Typography key={title + index} className={classes.title}>
                  <b>{title}</b>
                </Typography>
              )
            })}
          </Grid>

          {ratings ? (
            <>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: 160 }} component="th">
                      Max-Temperature
                    </TableCell>
                    <TableCell align="right">
                      {ratings?.maxTemp.value}
                      {'\u00B0C'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 160 }} component="th">
                      Min-Temperature
                    </TableCell>
                    <TableCell align="right">
                      {ratings?.minTemp.value}
                      {'\u00B0C'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 160 }} component="th">
                      Moisture
                    </TableCell>
                    <TableCell align="right">{ratings?.moisture}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 160 }} component="th">
                      Humidity
                    </TableCell>
                    <TableCell align="right">{ratings?.humidity} %</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : (
            <Grid item xs={12} md={12} lg={12}>
              <CircularProgress
                size={60}
                style={{ margin: '68px 0' }}
                color="secondary"
              />
            </Grid>
          )}

          <Grid item xs={12} md={12} lg={12} className={classes.footer}>
            <label>{footer}</label>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default StandardRating
