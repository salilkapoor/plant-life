import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CircularLoader = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      <Typography variant="h4" component="div" color="textSecondary">{`${Number(props.value).toFixed(2)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default CircularLoader;