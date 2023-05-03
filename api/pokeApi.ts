import axios from "axios";

/* This code is creating an instance of the Axios library with a base URL of
'https://pokeapi.co/api/v2'. This instance can be used to make HTTP requests to the PokeAPI. */
const pokeApi = axios.create({ baseURL: 'https://pokeapi.co/api/v2', headers: { 'Accept-Encoding': 'gzip,deflate,compress' }, });

export default pokeApi;