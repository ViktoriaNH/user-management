import { supabase } from "../supabaseClient";
import { ACTION_EVENTS } from "../data/action-events";
import { getCurrentUserId } from "../services/auth";
import {
  blockUsers,
  unblockUsers,
  deleteUsers,
  deleteUnverifiedUsers,
} from "../services/users";
import { isSelfIncluded } from "../helpers/is-self-included";

export const userActions = {
  block: async ({ selectedUsers, reload }) => {
    const currentUserId = await getCurrentUserId();

    await blockUsers(selectedUsers);
    await reload();

    const isSelf = isSelfIncluded(currentUserId, selectedUsers);
    if (isSelf) {
      return ACTION_EVENTS.SELF_BLOCKED;
    }

    return ACTION_EVENTS.USERS_BLOCKED;
  },

  unblock: async ({ selectedUsers, reload }) => {
    await unblockUsers(selectedUsers);
    await reload();

    return ACTION_EVENTS.USERS_UNBLOCKED;
  },

  delete: async ({ selectedUsers, reload }) => {
    const { data: authUser } = await supabase.auth.getUser();
    const currentUserId = authUser?.user?.id;

    const isSelf = selectedUsers.includes(currentUserId);

    let result;
    try {
      result = await deleteUsers(selectedUsers, authUser?.user?.email);
    } catch (err) {
      throw err;
    }

    await reload();

    return isSelf ? ACTION_EVENTS.SELF_DELETED : ACTION_EVENTS.USERS_DELETED;
  },

  "delete-unverified": async ({ reload }) => {
    const { data: authUser } = await supabase.auth.getUser();
    const currentUserId = authUser?.user?.id;

    let result;
    try {
      result = await deleteUnverifiedUsers();
    } catch (err) {
      throw err;
    }

    const isSelf = result?.requested?.includes(currentUserId);

    await reload();

    return isSelf ?
        ACTION_EVENTS.SELF_DELETED
      : ACTION_EVENTS.UNVERIFIED_DELETED;
  },
};
