// import axios from 'axios';
// import * as actionTypes from '../actionTypes';

// export default (token, roleid) => {
//   return function (dispatch) {
//     return axios.get(`api/role/${roleid}`, {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then((response) => {
//         dispatch({
//           type: actionTypes.VIEW_ROLE,
//           role: response.data
//         });
//       }).catch((err) => {
//         dispatch({
//           type: actionTypes.ROLE_RETRIEVAL_FAILED,
//           status: 'failed',
//           error: err.message
//         });
//       });
//   };
// };
