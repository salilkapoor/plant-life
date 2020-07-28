import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { API_GET, API_POST } from '../../../utils/api'

import useStyles from './style.js'

const SearchBar = (props) => {
  const classes = useStyles()
  const [plantName, setPlantName] = useState('')
  const [selectedPlantId, setselectedPlantId] = useState('')
  const [searchPlant, setSearchPlant] = useState([])
  const matches = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    API_GET(`plants/search?name=${plantName}`)
      .then((res) => {
        setSearchPlant(res.data.plants)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }, [plantName])

  const handleOnSelect = (e) => {
    setPlantName(e.target.innerText)
    setselectedPlantId(e.target.getAttribute('plantId'))
    setSearchPlant([])
  }

  const handleAddPlant = () => {
    API_POST(`plants`, {
      plantId: selectedPlantId
    })
      .then((res) => {
        setSearchPlant(res.data.plants)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  return (
    <>
      <Grid item xs={12} sm={9} md={10} lg={10}>
        <TextField
          id="plant_name"
          placeholder="Plant name"
          value={plantName}
          onChange={(e) => {
            setPlantName(e.target.value)
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        {searchPlant.length > 0 && (
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12} sm={10} md={10} lg={10}>
                {searchPlant.map((res) => {
                  return (
                    <div
                      className={classes.title}
                      plantId={res.id}
                      onClick={(e) => {
                        handleOnSelect(e)
                      }}
                    >
                      {res.commonName}
                    </div>
                  )
                })}
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
      <Grid
        container
        justify={matches && 'center'}
        className={matches && classes.btn_wrapper}
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
      >
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={handleAddPlant}
        >
          Add
        </Button>
      </Grid>
    </>
  )
}

export default SearchBar
