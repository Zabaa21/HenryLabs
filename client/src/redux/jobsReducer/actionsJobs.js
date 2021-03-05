import axios from "axios";
import Swal from 'sweetalert2';
import { consoleLog } from '../../services/consoleLog'

export const POST_JOB = 'POST_JOB';
export const GET_JOBS = 'GET_JOBS';
export const DELETE_JOBS = 'DELETE_JOBS'

const token = localStorage.getItem('data');

export const postJob = (values) => (dispatch) => {
    return axios
     .post(`/jobs/post`, {
        title: values.title,
        type: values.type,
        contract: values.contract,
        webProfile: values.webProfile,
        salary: values.salary,
        description: values.description,
        requirements: values.requirements,
        benefits: values.benefits,
        others: values.others,
        language: values.language,
        seniority: values.seniority,
    }, { headers: {'Authorization': 'Bearer ' + token }
     }).then((data) => {
        dispatch({
            type: POST_JOB,
            payload: data
        })
        Swal.fire({
            icon: 'success',
            title: 'Trabajo posteado correctamente',
        });
    }).catch(err => consoleLog(err));
}

export const getJobs = () => (dispatch) => {
    return axios
    .get(`/jobs/list`, { headers: {'Authorization': 'Bearer ' + token }})
    .then((data) => {
        dispatch({
            type: GET_JOBS,
            payload: data
        })
    }).catch(err => consoleLog(err))
}

export const deleteJobs = () => (dispatch) => {
    return axios
    .delete(``)
    .then((data) => {
    
    }).catch((err)=> consoleLog(err))
}
