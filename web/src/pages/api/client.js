import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEPPATH_API_URL,
  });
}
