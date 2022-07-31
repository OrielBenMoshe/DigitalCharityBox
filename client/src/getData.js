import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

/** Get two parameters: 
 * path - to endpoint, and 
 * setState - to load data into it 
 * */
export const GetData = async (path, setState) => {
  axios.get(baseURL+path).then(
    (res) => {
      setState(res.data);
    },
    (err) => {
      console.log(err);
      setState(err);
    }
  );
};

export const PostToServer = async (path, obj, data, response) => {
  axios.post(baseURL+path, obj).then(
    (res) => {
      if (data) {
        data(res.data);
      }
      if (response) {
        response(res);
      }
    },
    (err) => {
      console.log(err);
    }
  );
};

export const PutToServer = async (route, obj, response) => {
  axios.put(baseURL+route, obj).then(
    (res) => {
      console.log(res);
      if (response) {
        response(res);
      }
    },
    (err) => {
      console.log(err);
    }
  );
};
