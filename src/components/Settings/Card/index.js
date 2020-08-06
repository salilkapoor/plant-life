import React from 'react'
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core'

import useStyles from './style.js'

const CustomCard = ({ plantName, deviceId }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th">Plant Name</TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {plantName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Device Id</TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {deviceId}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default CustomCard
