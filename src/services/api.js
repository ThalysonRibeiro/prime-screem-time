// base da ulr https://api.themoviedb.org/3/
// movie/now_playing?api_key=e5b8ec6449951e486a4677a36e4e5195=pt-br
import axios from "axios";
const api = axios.create({
  baseURL: ' https://api.themoviedb.org/3/'
});
export default api;