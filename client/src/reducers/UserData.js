
const UserData = (state = null, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
 
      localStorage.setItem("user_data", JSON.stringify(action.payload));
      return action.payload;
      case "REMOVE_USER_DATA":
       
        localStorage.removeItem("user_data");
        return null;
    default:
      return state;
  }
 
};

export default UserData;