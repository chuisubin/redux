const middle = store => next => async action => {
  console.log("run in middle and action is ", JSON.stringify(action));
  if (action.type == "ADD_FD") {
    try {
      const age = action.payload;
      const r = await fetch(
        "http://rest.learncode.academy/api/johnbob/friends",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Superman", age: age })
        }
      );
      const res = await r.json();
      console.log("json is ", res);
      next({ type: "UPDATA_FD", ...res });
    } catch (r) {
      return next(action);
    }
  }

  return next(action);
};
export default middle;
