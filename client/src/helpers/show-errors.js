const UNIQUE_ERROR = "user_already_exists";

export const showRegisterError = (error) => {
  const handlers = {
    [UNIQUE_ERROR]: () => "This email is already in use",
  };

  return (
    handlers[error.code] ||
    error.message ||
    "Something went wrong, please try again later"
  );
};

const LOGIN_ERROR = "invalid_credentials";

export const showLoginError = (error) => {
  const handlers = {
    [LOGIN_ERROR]: () => "Please check your email or password and try again",
  };
  
  return (
    handlers[error.code] ||
    error.message ||
    "Something went wrong, please try again later"
  );
};
