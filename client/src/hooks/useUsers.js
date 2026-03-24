import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadUsers } from "../services/users";
import { handleActionEvent } from "../utils/handle-action-event";
import { runUserAction } from "../utils/run-user-actions";
import { checkStatusAndRedirect } from "../utils/check-status-and-redirect";
import { checkUserStatus } from "../utils/check-user-status";

const useUsers = (delay = 2000) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const reload = useCallback(async () => {
    try {
      const data = await loadUsers();
      setUsers(data);
    } catch (error) {
      setAlert?.("Failed to load list");
    }
  }, [setAlert]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (!alert) return;
    const id = setTimeout(() => setAlert(null), delay);
    return () => clearTimeout(id);
  }, [alert]);

  const handleToolbarAction = async (actionId) => {
    let event = null;

    const check = await checkUserStatus();

    if (!check.ok) {
      checkStatusAndRedirect(navigate, setAlert);
      return;
    }

    try {
      event = await runUserAction({
        selectedUsers,
        reload,
        navigate,
        setAlert,
      })(actionId, selectedUsers);
    } catch (err) {
      setAlert("Error");
    }

    setSelectedUsers([]);

    if (event) {
      await handleActionEvent(event, setAlert);
    }
  };

  return { users, selectedUsers, setSelectedUsers, handleToolbarAction, alert };
};

export default useUsers;
