import axios from 'axios'
import { Server } from "../components/Properties";

//전체 생산자 상품 중 최신 재배일지 조회
export const getServerToday = () => axios(Server.getRestAPIHost() + '/common/today', { method: "get", withCredentials: true, credentials: 'same-origin' })

export const getServerTodayTime = () => axios(Server.getRestAPIHost() + '/common/todaytime', { method: "get", withCredentials: true, credentials: 'same-origin' })

export const getServerVersion =  () => axios(Server.getRestAPIHost() + '/version', { method: "get", withCredentials: true, credentials: 'same-origin' });

export const getSitemap = () => axios(Server.getRestAPIHost() + '/sitemap', { method: "get", withCredentials: true, credentials: 'same-origin' });
