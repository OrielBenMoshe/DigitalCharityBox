import React, { useEffect, useState } from "react";
import axios from "axios";

export const GetData = async (url, data) => {
  axios.get(url).then(
    (res) => {
      data(res.data);
    },
    (err) => {
      console.log(err);
    }
  );
};

export const PostToServer = async (url, obj, data, response) => {
  axios.post(url, obj).then(
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
  axios.put(route, obj).then(
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
