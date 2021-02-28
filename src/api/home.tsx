/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "./index";

export function getSliders() {
  return axios.get('/slider/list');
}

export function getLessons(
  currentCategory: string, // 当前分类
  offset: number, // 偏移量
  limit: number // 每页的条数
) {
  return axios.get(`/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`);
}