import { useEffect, useState } from "react";
import infoApi from "../api/modules/infoUsersAndMovie.api";

export function useFetchInfo() {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [onRequestInfo, setOnRequestInfo] = useState(false);

  async function fetchGetInfo() {
    setOnRequestInfo(true);
    const { response, err } = await infoApi.getInfo();
    setOnRequestInfo(false);
    if (response) {
      setInfo(response);
    }
    if (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchGetInfo();
  }, []);

  return { info, onRequestInfo, error };
}
