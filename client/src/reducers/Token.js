const TokenReducer = (state = null, action) => {
  switch (action.type) {
    case "TOKEN":
    
      localStorage.setItem("TOKEN", action.payload);
      return action.payload;
      case "REMOVE_TOKEN":
       
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("user_data");
        return null;
    default:
      return state;
  }
 
};

export default TokenReducer;
