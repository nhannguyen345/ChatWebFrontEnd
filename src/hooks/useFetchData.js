import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { method = "GET", body = null, headers = {} } = options;
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url,
        method,
        data: body,
        headers: { ...headers },
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method, body, JSON.stringify(headers)]);

  return { data, loading, error };
};

export default useFetchData;
