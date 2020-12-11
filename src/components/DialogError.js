
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab,Dialog, IconButton,Grid, Button ,Box,Typography, Container,  Breadcrumps, AppBar, Toolbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  typographyStyle: {
    marginTop: theme.spacing(4),
    marginButtom: theme.spacing(6),
    color: theme.palette.grey[700],
    padding: theme.spacing(4) 
  },
  dialogModal:{
    height: '30%',
    width: '60%',
    borderRadius: '25px',
  },
  boxButton: {
    textAlign: 'center',
  },
  buttonStyle:{
    borderRadius: 41,
  }


})) 



export default function DialogError({ handleClose, closeRedact }) {
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);

  const classes = useStyles();

  const handleClickOpen = () =>  setOpen(true); 

  const handleCloseSecond = () =>  setOpenSecond(false);

  const handleCloseErr = () => {
    setOpenErr(false);
    setOpenSecond(false);
  }


  const handleCloseModal = () =>  setOpen(false) ;



  return (
  <div>
      <Button 
          className={classes.buttonStyle}
          style={{color: '#FFFFFF', backgroundColor: '#01BDA7' , width: '300px'}}
          variant="contained"
          onClick={handleClickOpen}
    > Сохранить изменения </Button>


    <Dialog onClose={handleClose} open={open}>

      <div className={classes.dialogModal}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>

          <Typography 
            align='center' 
            variant='h5' 
            display='block' 
            className={classes.typographyStyle} 
          > 
              Incorrect Entry
          </Typography>
    
          <Box m={3} className={classes.boxButton}>
            <Button autoFocus 
              className={classes.buttonStyle}
              variant="contained" 
              size='small' 
              onClick={handleClose} 
              style={{color: '#FFFFFF', backgroundColor: '#01BDA7', width: '200px'}}
            >
                Продолжить редактирование 
            </Button>
          </Box>
          <Box m={3} className={classes.boxButton}>
            <Button autoFocus  
              className={classes.buttonStyle}
              variant='outlined'
              size='medium' 
              rounded
              onClick={closeRedact}
              style={{ color: '#01BDA7', borderColor: '#01BDA7' , width: '200px'}}
            >
                Отменить изменения
            </Button>
          </Box>

          </div>
    </Dialog>

    </div>
  )
}

