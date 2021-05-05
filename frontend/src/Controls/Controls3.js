import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import {AnswerAction} from "./../Redux/actions/AnswerAction";
import uuid from 'react-uuid'



const {createContext, useState, useContext } = React;

function useRadioButtons(name) {
    const [value, setState] = useState(null);

    const handleChange = (event) => {
        setState(event.target.value);
    };

    const inputProps = {
        onChange: handleChange,
        name,
        type: "radio",
        
    };

    return [value, inputProps];
}

const RadioGroupContext = createContext();

function RadioGroup({ children, name}) {
    
    const dispatch=useDispatch();
    
    const [state, inputProps] = useRadioButtons(name);
    
    if (state){
        const payload={}
        //I need to figure out how to set the length of the array containing the questions. So far this numeber is 4
        for(let j=1;j<5;j++){
            if (inputProps.name===j.toString()){
                payload["Q"]=j.toString();
                payload["id"]=j
            };

        }
          
        payload["A"]=state;
        console.log("Option",payload) 

        dispatch(AnswerAction(payload))
    }
    

    return (
        <RadioGroupContext.Provider value={inputProps} style={myLabel}>
            {children}
        </RadioGroupContext.Provider>
    );
}

function RadioButton(props) {
    const context = useContext(RadioGroupContext);
    
   
    return (
        <label >
            <input {...props} {...context} />
            {props.label}
        </label>
    );
}
const myLabel={
    "display":"block"
}
const Controls3 = () => {
    //const questions=useSelector(state=>state.AnswerReducer)
    //const NumQuest=questions.length;
    return (
        <section className="section home-container">
            <h1 className="title is-1">🍿Questions</h1>
            <div className="columns">
                <div className="column choices">
                    <h3 className="title is-3">Q1:</h3>
                    <RadioGroup name="1">
                        <RadioButton label="Front" value="front" />
                        <RadioButton label="Middle" value="middle" />
                        <RadioButton label="Back" value="back" />
                    </RadioGroup>
                </div>
                <div className="column">
                    <h3 className="title is-3">Q2:</h3>
                    <RadioGroup name="2">
                        <RadioButton label="Popcorn" value="popcorn" />
                        <RadioButton label="Candy" value="candy" />
                        <RadioButton label="Soda" value="soda" />
                    </RadioGroup>
                </div>
                <div className="column">
                    <h3 className="title is-3">Q3:</h3>
                    <RadioGroup name="3">
                        <RadioButton label="Avengers Endgame" value="avengersEndgame" />
                        <RadioButton label="Sonic" value="sonic" />
                        <RadioButton label="Detective Pikachu" value="detectivePikachu" />
                        <RadioButton label="Spiderman" value="spiderman" />
                    </RadioGroup>
                </div>
                <div className="column">
                    <h3 className="title is-3">Q4:</h3>
                    <RadioGroup name="4">
                        <RadioButton label="Avengers Endgame" value="avengersEndgame" />
                        <RadioButton label="Sonic" value="sonic" />
                        <RadioButton label="Detective Pikachu" value="detectivePikachu" />
                        <RadioButton label="Spiderman" value="spiderman" />
                    </RadioGroup>
                </div>

            </div>
        </section>
    );
}

export default Controls3
