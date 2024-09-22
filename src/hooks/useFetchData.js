import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { method = "GET", body = null, headers = {} } = options;

  useEffect(() => {
    const fecthData = async () => {
      try {
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

    fecthData();
  }, [url, method, body, headers]);

  return { data, loading, error };
};

export default useFetchData;
