import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

/** Get two parameters: 
 * path - to endpoint, and 
 * setState - to load data into it 
 * */
export const GetData = async (path, setState) => {
  console.log("in GetData!");
  try {
    const res = await axios.get(baseURL+path)
    if (setState) {
      setState(res.data);
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export const PostData = async (path, obj, setState, setResponse) => {
  axios.post(baseURL+path, obj).then(
    (res) => {
      if (setState) {
        setState(res.data);
      }
      if (setResponse) {
        setResponse(res);
      }
    },
    (err) => {
      console.log(err);
    }
  );
};

export const UpdateData = async (path, obj, setResponse) => {
  console.log("obj from serverRequest:", obj);
  try {
    const res = await axios.put(baseURL+path, obj);
    // console.log("res:", res.data);
    if (setResponse) {
      setResponse(res.data);
    }
  } catch (error) {
    console.log("error:", error);
    setResponse(error.response);
  }
};
