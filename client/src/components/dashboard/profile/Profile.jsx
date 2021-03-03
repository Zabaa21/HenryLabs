import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import {
  Grid, Avatar, Link, Card, CardActions, CardContent, Typography, Badge,
  Dialog, DialogTitle, Button, Paper, ListItemText, ListItemAvatar, ListItem,
  Divider, List, IconButton, Input,
} from "@material-ui/core";
import { useStylesProfile, chipStyles} from "./styles";
import { Edit, LocalLibrary, Computer,Group, GroupWork} from '@material-ui/icons';
import AvatarEditor from 'react-avatar-editor'
import { getInfoUserCohort, getUser} from "../../../redux/userReducer/userAction";
import { formatDate } from "./utils";
import UpdateProfile from "./UpdateProfile";
import github from "./assets/github.png"
import google from "./assets/google.png"
import imagen from "./assets/Lillo-R.png"
import Tooltip from '@material-ui/core/Tooltip';



export default function Profile() {
  const classes = useStylesProfile();
  const dispatch = useDispatch()
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const userData = useSelector(state=> state.userReducer.user)
  const infoCohort = useSelector(state=> state.userReducer.infoUserCohort)
  const cohortMessage = useSelector(state => state.userReducer.cohortMessage)
  
  useEffect(() => {
    dispatch(getUser(userLoggedIn.id));
    dispatch(getInfoUserCohort(userLoggedIn.id));
  }, [dispatch]);
  
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    
    
  }
  
  const handleEditPicture = (event) => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  
  return (
    <React.Fragment>
      {/*<Dialog aria-labelledby="simple-dialog-title" open={true}>*/}
      {/*  <DialogTitle id="simple-dialog-title">Edit Avatar</DialogTitle>*/}
      {/*  <Paper elevation={3} className={classes.PaperModal}>*/}
      {/*    <Grid*/}
      {/*      container*/}
      {/*      direction="column"*/}
      {/*      justify="center"*/}
      {/*      alignItems="center"*/}
      {/*      spacing={2}*/}
      {/*    >*/}
      {/*      <Grid item>*/}
      {/*        <AvatarEditor*/}
      {/*          width={250}*/}
      {/*          height={250}*/}
      {/*          border={50}*/}
      {/*          borderRadius={150}*/}
      {/*          color={[0, 0, 0, 0.5]} // RGBA*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*      <Grid container item direction="row" justify="space-between">*/}
      {/*        <Input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange}/>*/}
      {/*        <IconButton  className="button"><Edit  color="primary"/></IconButton>*/}
      {/*      </Grid>*/}
      {/*      <Grid container item direction="row" justify="space-between">*/}
      {/*      </Grid>*/}
      {/*      <Grid item>*/}
      {/*        <Button variant="outlined" color="primary">*/}
      {/*          Save*/}
      {/*        </Button>*/}
      {/*      </Grid>*/}
      {/*    </Grid>*/}
      {/*  </Paper>*/}
      {/*</Dialog>*/}
  
      <Grid item container justify="flex-start" direction="column">
        <Grid item container justify="flex-start">
          <Grid item container justify="flex-start" xs={12} sm={8} md={6}>
            <Grid item sm={3}>
              <Card className={classes.root} variant="outlined">
                <CardContent className={classes.dataUser}>
                  <Grid className={classes.info}>
                    <Typography variant="h5">Datos Personales</Typography>
                    <UpdateProfile />
                  </Grid>
                  <Typography
                    className={classes.pos}
                    color="textPrimary"
                    gutterBottom
                    variant="body1"
                  >
                    Email: {userData?.email}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Fecha de nacimiento: {userData? formatDate(userData.dateOfBirth): ""}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Dirección: {userData?.address}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Ciudad: {userData?.city}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Provincia: {userData?.state}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    País: {userData?.country}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Nacionalidad: {userData?.nationality}
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="body1">
                    Teléfono/Celular: {userData?.cellphone}
                  </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
  
          
          
          <Grid item container justify="center" xs={12} sm={8} md={6} direction="column">
            <Grid item container justify="center">
                <Badge
                  type="file"
                  badgeContent={
                    <div style={chipStyles}>
                      <Tooltip title="Cambiar imagen" placement="right-end">
                        <IconButton onClick={handleEditPicture}  className="button"><Edit color="secondary"/></IconButton>
                      </Tooltip>
                    </div>
                  }
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange}/>
                  <Avatar src={imagen} className={classes.large}/>
              </Badge>
            </Grid>
            <Grid item container justify="center">
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
              <Grid item container justify="center" direction="row">
                <Link
                  target="_blank"
                  href="https://accounts.google.com/signin/v2/
                  identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.
                  com%2F&ec=GAZAmgQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                >
                  <Avatar className={classes.medium} src={google} />
                </Link>
                <Link target="_blank" href={`https://github.com/${userData.githubUser}`}>
                  <Avatar className={classes.medium} src={github} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="space-around"
          direction="row"
          sm={12}
          style={{ marginTop: "2%" }}
        >
          <Grid item sm={10}>
          </Grid>
        </Grid>
      </Grid>
      { !cohortMessage ?
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Computer />
          </ListItemAvatar>
          <ListItemText
            primary="Cohorte"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {infoCohort.number}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <LocalLibrary />
          </ListItemAvatar>
          <ListItemText
            primary="Instructor"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {infoCohort.instructor}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <GroupWork />
          </ListItemAvatar>
          <ListItemText
            primary="Grupo Stand Up"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Group />
          </ListItemAvatar>
          <ListItemText
            primary="Pm"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  Sandra Adams
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  Sandra Adams
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List> : cohortMessage }
    </React.Fragment>
  );
}
