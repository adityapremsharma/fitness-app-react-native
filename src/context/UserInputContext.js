import createDataContext from "./createDataContext"

const userInputReducer = (state, action) => {
    switch(action.type) {
        case "HEIGHT":
            return {...state, height: action.payload}
        case "WEIGHT":
            return {...state, weight: action.payload}
        case "CALORIES":
            return {...state, calories: action.payload}
        case "WATER":
            return {...state, water: action.payload}
        case "BMI":
            return {...state, bmi: action.payload}
        default:
            return state
    }
}

const setHeight = (dispatch) => {
        return (getHeight, toggleHeight) => dispatch({type: "HEIGHT", payload: {data: getHeight, toggle: toggleHeight}})
    }
const setWeight = (dispatch) => {
        return (getWeight, toggleWeight) => dispatch({type: "WEIGHT", payload: {data: getWeight, toggle: toggleWeight}})
    }
const setCalories = (dispatch) => {
        return (getCalories) => dispatch({type: "CALORIES", payload: getCalories})
    }
const setWater = (dispatch) => {
        return (getWater) => dispatch({type: "WATER", payload: getWater})
    }
const setBmi = (dispatch) => {
        return (getBmi) => dispatch({type: "BMI", payload: getBmi})
    }

export const {Context, Provider} = createDataContext(userInputReducer, {setHeight, setWeight, setCalories, setWater, setBmi}, {height: {data: 0, toggle: false}, weight: {data: 0, toggle: false}, calories: 0, water: 0, bmi: 0})