export const increment = (nr) => {
  return {
    type: "INCREMENT",
    payload: nr,
  };
};

export const decrement = (nr) => {
  return {
    type: "DECCREMENT",
    payload: nr,
  };
};

export const SetData = (data) => {
  return {
    type: "SET_POST",
    payload: data,
  };
};

export const SetSingle = (data) => {
  return {
    type: "SET_SINGLE_POST",
    payload: data,
  };
};

export const logged = () => {
  return {
    type: "SIGN_IN",
  };
};

export const GetUserData = (data) => {
  return {
    type: "GET_USER_DATA",
    payload: data,
  };
};

export const RemoveUserData = (data) => {
  return {
    type: "REMOVE_USER_DATA"
  };
};


export const SetToken = (token) => {
  return {
    type: "TOKEN",
    payload: token,
  };
};

export const RemoveToken = () => {
  return {
    type: "REMOVE_TOKEN"
  };
};
