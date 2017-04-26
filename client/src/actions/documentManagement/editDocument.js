import axios from 'axios';
import { browserHistory } from 'react-router';

export default (details, documentid) => {
  return (dispatch) => {
    const token=window.localStorage.getItem('token');
    if(!token){
      return
    }
    return axios.put(`/documents/${documentid}`, details, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      browserHistory.push('/');
    }).catch((err) => {
      dispatch({
        type: 'DOCUMENT_UPDATE_FAILED',
        status: 'failed',
        error: err.message
      });
    });
  };
};