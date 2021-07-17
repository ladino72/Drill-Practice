//https://codesandbox.io/s/radio-button-with-react-context-ktkf4?from-embed=&file=/package.json:0-561
//https://dev.to/hlebon/share-states-and-functionalities-with-react-context-4oh

//https://getbootstrap.com/docs/4.4/utilities/sizing/

import React, {createContext,useContext,useState, useEffect} from "react";

const RadioContext = createContext();

function useRadioContext() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error(
      `Radio compound components cannot be rendered outside the Radio component`
    );
  }
  return context;
}

function RadioGroup({ children, defaultValue, onChange }) {
  const [state, setState] = useState("");

  function handleOnChange(value) {
    setState(value);
    onChange(value);
  }

  useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  return (
    <RadioContext.Provider value={[state, handleOnChange]}>
      <div role="radiogroup">{children}</div>
    </RadioContext.Provider>
  );
}

function RadioButton({ value, children }) {
  const [state, onChange] = useRadioContext();
  const checked = value === parseInt(state); 
  //console.log("state",typeof(state),"value",typeof(value),"Checked",checked) //value is a number, state is a string! This caused me a lot of time
  return (
    <label>
      <input 
        value={value}
        checked={checked}
        type="radio"
        onChange={({ target }) => onChange(target.value)}
      />
      {children}
    </label>
  );
}

RadioGroup.RadioButton = RadioButton;

export default RadioGroup;

