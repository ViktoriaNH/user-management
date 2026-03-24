import { checkUserStatus } from "./check-user-status";
import { userActions } from "./user-actions";

// note: wrapper for user actions (block, delete, etc.)
export const runUserAction =
  (context) =>
  async (actionId, selectedUsers = []) => {
    const check = await checkUserStatus();

    if (!check.ok) {
      await checkStatusAndRedirect(context.navigate, context.setAlert);
      return undefined;
    }

    const action = userActions[actionId];
    if (!action) {
      return undefined;
    }

    try {
      return await action({ ...context, selectedUsers });
    } catch (err) {
      context.setAlert?.("Error while performing action");
      return undefined;
    }
  };
