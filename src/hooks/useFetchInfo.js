import { useEffect, useState } from "react";
import infoApi from "../api/modules/infoUsersAndMovie.api";
import { showToast } from "../utils/functions";

export function useFetchInfo() {
  const [info, setInfo] = useState([]);
  const [recentBooksCreated, setRecentBooksCreated] = useState([]);
  const [onRequestInfo, setOnRequestInfo] = useState(false);

  async function fetchGetInfo() {
    setOnRequestInfo(true);
    const { response, err } = await infoApi.getInfo();
    setOnRequestInfo(false);
    if (response) {
      setInfo(response?.infoAllMoviesAndUsers);
      setRecentBooksCreated(response?.lastTenBooksCreated);
    }
    if (err) {
      showToast(err.message, "error");
    }
  }

  useEffect(() => {
    fetchGetInfo();
  }, []);

  return { info, onRequestInfo, recentBooksCreated };
}
