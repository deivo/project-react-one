/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "./index";

export function getSliders() {
  return axios.get('/slider/list');
}