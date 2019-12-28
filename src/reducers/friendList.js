const initialState = {
  fdList: {}
};
const friendList = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATA_FD":
      console.log("UPDATA FD, ", action);
      return {
        ...state,
        fdList: { id: action.id, name: action.name, age: action.age }
      };

    default:
      return { ...state };
  }
};
export default friendList;
