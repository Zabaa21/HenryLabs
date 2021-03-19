import { CardActionArea, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getJobs } from '../../../redux/jobsReducer/actionsJobs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1)
  },
  card:{
    display: 'flex',
    flexDirection: 'row',
  },
  type:{
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(0),
    alignItems: "center"
  },
  button:{
    width: "5%",
    marginLeft: theme.spacing(0),
  },
  right:{
    marginRight: theme.spacing(3),
  }
}));

const JobList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const jobState = useSelector((state) => state.jobReducer.jobs);
  moment.locale('es')  
  useEffect(() => {
    dispatch(getJobs());
    // eslint-disable-next-line
  }, []);
     return (
      <>
         {jobState && jobState.map((job) =>{return (
           <CardActionArea key={job.id} onClick={() => history.push(`/panel/lista-trabajos/${job.id}`)}>           
              <Grid container className={classes.root}  > 
                <Grid xs={8} item container justify="flex-start">
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography gutterBottom variant="h5" >
                        {job.title}
                      </Typography>   
                    </Grid>
                    <Grid item container direction="row" justify="flex-start">
                      <Grid xs={6} item container justify="flex-start">
                        <Grid item>
                          <Typography className={classes.type} variant="body2" >
                            {job.contract } | {job.type}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid xs={6} item container justify="flex-start">
                        <Grid item>
                        
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={4} item container justify="flex-end">
                  <Grid item container direction="column" alignItems="flex-end" justify="flex-end">
                    <Grid item>
                        <Typography className={classes.right}  variant= 'body2'>
                          ${job.salary}
                        </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.right} variant='caption' color='textSecondary' >
                        {moment(job.createdAt).subtract(1, 'days').calendar()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="fullWidth"/>
           </CardActionArea>
           )
          })}
       </>
     );

};

export default JobList;
