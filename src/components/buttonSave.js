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
    height: '300px',
    width: '600px',
    borderRadius: '25px',
    border: '1px solid blue',
  },
  boxButton: {
    textAlign: 'center',
  },
  buttonStyle:{
    borderRadius: 41,
    height: '50px', 
  }


})) 



export default function ButtonSave({closeRedact, currentValue, dataObj}) {
  const [open, setOpen] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);

  const classes = useStyles();

  const handleClickOpen = () =>  setOpen(true); 

  const handleClose = async () => {
    setOpen(false);
      let data = await JSON.parse( sessionStorage.getItem('login') ); 
      let verifyToken; 
         await jwt.verify(data.token, process.env.NEXT_PUBLIC_SECRET_KEY, function(err, decoded) {
           if(!err && decoded){
              //this.funcSendInfo(data.id);
              verifyToken = true;
              console.log('decoded')
           }else{
             console.log(err)
             window.location.href = '/auth/login'
           }
      });

    if(verifyToken){
          setOpenSecond(true);
            if(!dataObj.name.isError && !dataObj.email.isError && !dataObj.phoneNumber.isError){
              currentValue();
            }else{
              setOpenErr(true);
            }
    }else{
      console.log(err)
    }

  };

  const handleCloseSecond = () =>  setOpenSecond(false);

  const handleCloseErr = () => {
    setOpenErr(false);
    setOpenSecond(false);
  }


  const handleCloseModal = () =>  setOpen(false) ;

  const idArr = ['email', 'phoneNumber', 'name', 'status', 'created', 'updated', 'redactItem', 'updateItem', 'deleteItem'];

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

          <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>

          <Typography align='center' variant='h5' display='block' className={classes.typographyStyle} > Сохранить изменения?</Typography>
    
                            <Box m={3} className={classes.boxButton}>
                                <Button autoFocus 
                                    className={classes.buttonStyle}
                                    variant="contained" 
                                    size='medium' 
                                    onClick={handleClose} 
                                    style={{color: '#FFFFFF', backgroundColor: '#01BDA7', width: '200px'}}
                          > Сохранить </Button>
                            </Box>

                          <Box m={3} className={classes.boxButton}>
                                <Button autoFocus  
                                    className={classes.buttonStyle}
                                    variant='outlined'
                                    size='medium' 
                                    rounded
                                    onClick={closeRedact}
                                    style={{ color: '#01BDA7', borderColor: '#01BDA7' , width: '200px'}}
                          > Не сохранять </Button>
                            </Box>

    </div>
      </Dialog>


      <Dialog onClose={handleCloseSecond} open={openSecond} >
        <div className={classes.dialogModal}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          <Typography align='center' variant='h5' display='block' className={classes.typographyStyle} > Изменения сохранены </Typography>
    
                            <Box m={3} className={classes.boxButton}>
                                  <Button 
                                    autoFocus 
                                    variant="contained" 
                                    style={{color: '#FFFFFF', backgroundColor: '#01BDA7', width: '200px'}}
                                    onClick={handleCloseSecond} 
                                    color="primary"
                                    className={classes.buttonStyle}
                            > Хорошо </Button>
                            </Box>

    </div>
      </Dialog>
    
      <Dialog onClose={handleCloseErr} open={openErr}>
        <div className={classes.dialogModal}>

          <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>

          <Typography align='center' variant='h5' display='block' className={classes.typographyStyle} > 
   Неверно введены данные. Изменения не сохранены 
          </Typography>
                              
                          <Box m={3} className={classes.boxButton}>
                                <Button 
                                  autoFocus 
                                  variant="contained" 
                                  onClick={handleCloseErr} 
                                  className={classes.buttonStyle}
                                  style={{color: '#FFFFFF', backgroundColor: '#01BDA7', width: '300px'}}
                          > Вернуться к редактированию </Button>
                          </Box>
        </div>
      </Dialog>

    </div>
  )
}

