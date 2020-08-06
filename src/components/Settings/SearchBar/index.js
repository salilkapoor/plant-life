import React, { useState } from 'react'
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core'
import { Search, Keyboard } from '@material-ui/icons'
import { API_GET, API_POST } from '../../../utils/api'

import useStyles from './style.js'

const SearchBar = (props) => {
  const classes = useStyles()
  const [plantName, setPlantName] = useState('')
  const [selectedPlantId, setselectedPlantId] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [searchPlant, setSearchPlant] = useState([])

  const handlePlantName = (e) => {
    setPlantName(e.target.value)
    API_GET(`plants/search?name=${e.target.value}`)
      .then((res) => {
        setSearchPlant(res.data.plants)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  const handleOnSelect = (e) => {
    setPlantName(e.target.innerText)
    setselectedPlantId(e.target.getAttribute('plantId'))
    setSearchPlant([])
  }

  const handleAddPlant = () => {
    API_POST(`plants`, {
      plantId: selectedPlantId,
      deviceId: deviceId
    })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  return (
    <>
      <Grid container xs={12} sm={9} md={10} lg={10} spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.searchBar}>
          <TextField
            fullWidth
            id="plant_name"
            autoComplete="off"
            placeholder="Plant name"
            value={plantName}
            onChange={(e) => {
              handlePlantName(e)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          {searchPlant.length > 0 && (
            <Grid className={classes.search_result}>
              <Grid item xs>
                {searchPlant.map((res) => {
                  return (
                    <div
                      className={classes.title}
                      plantId={res._id}
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
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            id="device_id"
            placeholder="Device Id"
            value={deviceId}
            onChange={(e) => {
              setDeviceId(e.target.value)
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid container xs={12} sm={3} md={2} lg={2}>
        <Grid item xs className={classes.btn_wrapper}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={handleAddPlant}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SearchBar
