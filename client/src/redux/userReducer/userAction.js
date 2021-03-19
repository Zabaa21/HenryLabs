import axios from 'axios';
import Swal from 'sweetalert2';
import { consoleLog } from '../../services/consoleLog';


export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_PM = 'GET_PM';
export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
export const GET_INFO_USER_COHORT = 'GET_INFO_USER_COHORT';
export const GET_USER_BY_ROLE = 'GET_USER_BY_ROLE';
export const UPDATE_USER = 'UPDATE_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SET_COHORT_MESSAGE = 'SET_COHORT_MESSAGE';
export const CLEAN_COHORT_MESSAGE = 'CLEAN_COHORT_MESSAGE';
export const CREATE_MIGRATION_REQUEST = 'CREATE_MIGRATION_REQUEST';
export const COMPLETE_DATA = 'COMPLETE_DATA';
export const REMOVE_USER = 'REMOVE_USER';

export const removeUser = () => (dispatch) =>{
  return dispatch({type: REMOVE_USER})
}

export const getUsers = () => (dispatch, getState) => {
    return axios.get('/users/listAll',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_USERS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const getUser = (userId) => (dispatch, getState) => {
    return axios.get(`/users/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_USER, payload: res.data}))
    .catch(e => consoleLog(e))
}

export const getStudents = () => (dispatch, getState) => {
    return axios.get('/users/listAll?role=student',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_STUDENTS, payload: res.data}))
    .catch(e => consoleLog(e))
}

export const getPm = () => (dispatch, getState) => {
    return axios.get('/users/listAll?role=pm',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => {dispatch({type: GET_PM, payload: res.data})})
    .catch(e => consoleLog(e))
}

export const getInstructors = () => (dispatch, getState) => {
    return axios.get('/users/listAll?role=instructor',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_INSTRUCTORS, payload: res.data }))
    .catch(err => consoleLog(err));
    };

export const getInfoUserCohort = (userId, flag = false) => (dispatch, getState) => {
    return axios.get(`/users/infoCohort/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
      .then(res => {
        if(!res.data.message){
          const { id, title, number, instructor_name } = res.data.cohorts[0];
            dispatch({
              type: GET_INFO_USER_COHORT,
              payload: { id, title, number, instructor: instructor_name }});
        } else {
          dispatch({type: SET_COHORT_MESSAGE, payload: res.data.message})
        }
        })
      .catch(err => consoleLog(err));
};

export const getUsersByRole = (role) => (dispatch, getState) => {
    return axios.get(`/users/listAll?role=${role}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
      .then(res => {
          const usersByRole = res.data[0].users;
          dispatch({type: GET_USER_BY_ROLE, payload: usersByRole }); })
      .catch(err => consoleLog(err));
};

export const updateUser = (userId, userData) => (dispatch, getState) => {
  return axios.put(`/users/update/${userId}`, userData,
    { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then((res) => {
      dispatch({type: UPDATE_USER, payload: res.data.user }); })
    .catch(err => consoleLog(err));
};

export const completeData = (userId, newData) => (dispatch, getState) => {
  return axios.put(`/users/completeProfile/${userId}`, newData,
    { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
  .then( res => dispatch({ type: COMPLETE_DATA, payload: res.data}))
  .catch( error => consoleLog(error.message));
}


//Register user (register form)
export const registerUser = (values, userRole) => (dispatch, getState) => {
    const roles = userRole
    const {firstName, lastName, email, password} = values
    return axios.post(`/users/createuser`, {
        firstName, lastName, email, password, roles
    }, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
      .then(res => {
        if(res.data.message){
            Swal.fire('Oops...',
            'El usuario ya existe', 'error')
        } else {
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
            Swal.fire('Felicitaciones', `
            Se ha registrado el usuario en HenryApp<br>`)
        }
    }).catch(err => consoleLog(err));
};

export const sendMigrationRequest = (userId, reason, wishedStartingDate) => (dispatch, getState) => {
  return axios.post(`migrations/createRequest/user/${userId}`, { reason, wishedStartingDate },
    { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
  .then(res => dispatch({ type: CREATE_MIGRATION_REQUEST, payload: res.data }))
  .catch(err => consoleLog(err));
};
