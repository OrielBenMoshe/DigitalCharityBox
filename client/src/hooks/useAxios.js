import { useEffect, useState } from "react";
import Axios from "axios";

require("dotenv").config();
const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function useAxios(method, path, payload = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async() => {
    console.log(path);
    setLoading(true);
    try {
      const res = await Axios[method](`${serverUrl}/${path}`, payload);
      setData(res.data);
      setError(null)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}
