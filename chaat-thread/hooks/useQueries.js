import { useCallback, useEffect, useState } from "react";
   
export const useQueries = ({ prefixUrl = "",tokenJwt } = {}) => {
 const [data, setData] =useState({
  data: null,
  isLoading: true,
  isError: false,
 }); 
   
const fetchingData = useCallback(
 async ({ url ="", method ="GET", token  } = {}) => {

  try {
   const response = await fetch(url, { method ,headers : {"Content-Type" : "application/json", Authorization : `Bearer ${token}`} });
   const result = await response.json();
   setData({
    ...data,
    data: result,
    isLoading: false,
   });
  return result
  } catch (error) {
   setData({
    ...data,
    isError: true,
    isLoading: false,
   });
   throw error
  }
}, []);
   
useEffect(() => {
  if (prefixUrl && tokenJwt) {
    fetchingData({ url: prefixUrl, token : tokenJwt });
  }
}, []);

   
return { ...data,fetchingData };
};