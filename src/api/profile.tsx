/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from './index'

export function validate() {
  return axios.get('/user/validate');
}