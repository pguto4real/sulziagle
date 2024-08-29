import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext(null);
// const baseUrl = ' https://google-api31.p.rapidapi.com/';
const baseUrl = ' https://google-api31.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('elon musk');
    
  const getResults = async (url,searchTerm) => {
    setLoading(true);
    const functionUrl = baseUrl+""+url;

let options;
    if(url==='imagesearch'){
     
      const options = {
        method: 'POST',
        url: functionUrl,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: searchTerm,
          safesearch: 'off',
          region: 'wt-wt',
          color: '',
          size: '',
          type_image: '',
          layout: '',
          max_results: 100
        }
      };
      const data = await axios.request(options);
    
    setResults(data);
    }
    else if(url==='videosearch'){
      options = {
        method: 'POST',
        url: functionUrl,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: searchTerm,
          safesearch: 'off',
          timelimit: '',
          duration: '',
          resolution: '',
          region: 'wt-wt',
          max_results: 50
        }
      };
      
      const data = await axios.request(options);
      setResults(data);
    }
    else if(url==='websearch')
    {
      options = {
        method: 'POST',
        url: functionUrl,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: searchTerm,
          safesearch: 'off',
          timelimit: '',
          region: 'wt-wt',
          max_results: 20
        }
      };
      
      const data = await axios.request(options);
    
    setResults(data);
    }
    else
    {
      const options = {
        method: 'POST',
        url: 'https://google-api31.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: searchTerm,
          region: 'wt-wt',
          max_results: 25
        }
      };
      const data = await axios.request(options);
    
    setResults(data);
    }
    
    
  
    setLoading(false);
    
  };
  
  



  return (
    <ResultContext.Provider value={{ getResults,setResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);