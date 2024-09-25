import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { method = "GET", body = null, headers = {} } = options;
  const fecthData = async () => {
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("test call");
    fecthData();
  }, [url, method, body, JSON.stringify(headers)]);

  return { data, loading, error };
};

export default useFetchData;
