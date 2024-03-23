import { useEffect, useState } from "react";
import infoApi from "../api/modules/infoUsersAndMovie.api";

export function useFetchAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [onRequestInfo, setOnRequestInfo] = useState(false);

  async function loadUsers() {
    setOnRequestInfo(true);
    const { response, err } = await infoApi.getAllUsers();
    setOnRequestInfo(false);
    if (response) {
      setUsers(response);
    }
    if (err) {
      setError(err);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, error, onRequestInfo };
}
