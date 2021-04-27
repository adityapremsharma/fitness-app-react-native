import createDataContext from "./createDataContext";

const fitnessReducer = (state, action) => {
  switch (action.type) {
    case "DISTANCE":
      return { ...state, distance: action.payload };
    case "PACE":
      return { ...state, pace: action.payload };
    case "TIME":
      return { ...state, duration: action.payload };
    case "START":
      return { ...state, start: action.payload };
    case "KCAL":
      return { ...state, kcal: action.payload };
    default:
      return state;
  }
};

const setDistance = (dispatch) => {
  return (getDistance) => dispatch({ type: "DISTANCE", payload: getDistance });
};
const setPace = (dispatch) => {
  return (getPace) => dispatch({ type: "PACE", payload: getPace });
};
const setTime = (dispatch) => {
  return (getTime) => dispatch({ type: "TIME", payload: getTime });
};
const setStart = (dispatch) => {
  return (getStart) => dispatch({ type: "START", payload: getStart });
};
const setKcal = (dispatch) => {
  return (getKcal) => dispatch({ type: "KCAL", payload: getKcal });
};

export const { Context, Provider } = createDataContext(
  fitnessReducer,
  { setDistance, setPace, setTime, setStart, setKcal },
  { distance: 0, pace: 0, duration: 0, start: false, kcal: 0 }
);
