
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Button } from 'react-native-web';


const NumberButton = (props) => {
  const onNumberButtonPress = () => {

    if((!(isNaN(props.getNumbers)) || props.getNumbers != '') && props.getNumbers.length < 12){
      
      if(props.getNumbers == "0"){

      } else{
        props.onPressNumberButton(props.getNumbers + props.buttonNumber);
      }
      

      if(props.getStatement != null){
        var lastCharacter = props.getStatement.slice(-1);
        if(lastCharacter =='/' || lastCharacter =='*' || lastCharacter =='-' || lastCharacter =='+'){
          //adding an empty string so that it won't pass the if clause again
          props.setStatement(props.getStatement + ' ');
          props.onPressNumberButton(props.buttonNumber);
        }
      }
      
    } else {
      props.onPressNumberButton(props.buttonNumber);
    }
  }

  return(
    <Pressable onPress={() => onNumberButtonPress()} style={props.buttonStyleName}><Text style={styles.buttonText}>{props.buttonNumber}</Text></Pressable>
  )
}
const ResetButton = (props) => {
  return(
    <Pressable onPress={() => {props.onPressResetButton(""); props.setStatement("")}} style={props.buttonStyleName}><Text style={styles.buttonText}>{props.resetButtonText}</Text></Pressable>
  )
}

const calc = (x) =>{
  return new Function('return ' + x)();
}
const OperatorButton = (props) => {

  //first calculating the mathematical statement.
  //there is an 11 digit memory limit.
  //converting the calculation into exponential form if memory limit exceeded.
  const onOperatorButtonPress = () =>{

    var numberOperation;
    if(props.getNumbers != ""){
      if(props.operatorText == "X" ||props.operatorText == "+" ||props.operatorText == "-" ||props.operatorText == "/" ||props.operatorText == "=" ||props.operatorText == "%"){
        if(props.operatorText=="%"){
          numberOperation = ((props.getNumbers) / 100).toString();
        } else{
          numberOperation = calc(props.getStatement + ' ' + props.getNumbers).toString();
        }
        if((numberOperation.length >= 12 && (numberOperation.toString().match(/e/g) || []).length >= 1) || (numberOperation.length >= 12 && !((numberOperation.toString().match(/\./g) || []).length >= 1))){
        //if((numberOperation.length >= 12 && (numberOperation.toString().match(/e/g) || []).length >= 1) || (numberOperation.length >= 12 && !((numberOperation.toString().match(/\./g) || []).length >= 1))){
          numberOperation = Number(numberOperation).toExponential();
          numberOperation = numberOperation.toString();
          var numberExponent = numberOperation.substring(numberOperation.lastIndexOf('e'));
          if(numberExponent.length <= 4){
            numberOperation = numberOperation.split('e')[0].substring(0, 7) + numberExponent;
          } else {
            numberOperation = 0;
          }
        }else if(numberOperation.length >= 12 && (numberOperation.toString().match(/\./g) || []).length == 1){
          numberOperation = numberOperation.substring(0, 12)
        }
      }

      //checking which operator button was pressed in the if statements.
      //thus only one of the if clause conditions are met
      if(props.operatorText == "X"){
        props.setNumbers(numberOperation);
        props.setStatement(numberOperation + '*');
      } else if(props.operatorText == '+'){
        props.setNumbers(numberOperation);
        props.setStatement(numberOperation + '+');
    } else if(props.operatorText == '-'){
        props.setNumbers(numberOperation);
        props.setStatement(numberOperation + '-');
    } else if(props.operatorText == "/"){
        if(props.getNumbers == "0"){
          numberOperation = "0";
        }
        props.setNumbers(numberOperation);
        props.setStatement(numberOperation + '/');
    } else if(props.operatorText == "="){
      if(props.getNumbers == "0"){
        numberOperation = "0";
      }
      props.setNumbers(numberOperation);
      props.setStatement(" ");
    } else if(props.operatorText == "%"){
      props.setNumbers(numberOperation);
    } else if(props.operatorText == "+/-"){
      if(props.getNumbers.toString().charAt(0) == "-"){
        props.setNumbers(props.getNumbers.substring(1));
      } else{
        props.setNumbers('-' + props.getNumbers);
      }
    } else if(props.operatorText == "."){
      if(!((props.getNumbers.toString().match(/\./g) || []).length >= 1)){
        if(props.getNumbers.toString().slice(-1) != "."){
          props.setNumbers(props.getNumbers + ".");
        }
      }
      
    }
    }

  }
  return(
    <Pressable onPress={() => onOperatorButtonPress()} style={props.buttonStyleName}><Text style={styles.buttonText}>{props.operatorText}</Text></Pressable>
  )
}

export default function App() {
  const [calculatorNumbers, setCalculatorNumbers] = useState("");
  const [calculatorStatement, setCalculatorStatement] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.calculatorDisplay}><Text style={styles.displayStyle}>{calculatorNumbers}</Text></View>
        <View style={styles.buttonWrapper}>
          <ResetButton buttonStyleName={styles.buttonStyle}  setStatement={setCalculatorStatement} onPressResetButton={setCalculatorNumbers} resetButtonText='C'/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="+/-" setNumbers={setCalculatorNumbers} getNumbers={calculatorNumbers}/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="%" setNumbers={setCalculatorNumbers} getNumbers={calculatorNumbers}/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="/" getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers} setStatement={setCalculatorStatement} getStatement={calculatorStatement}/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='7'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='8'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='9'/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="X" getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers} setStatement={setCalculatorStatement} getStatement={calculatorStatement}/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='4'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='5'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='6'/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="-" getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers} setStatement={setCalculatorStatement} getStatement={calculatorStatement}/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='1'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='2'/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='3'/>
          <OperatorButton buttonStyleName={styles.buttonStyle}  operatorText="+" getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers} setStatement={setCalculatorStatement} getStatement={calculatorStatement}/>
          <NumberButton buttonStyleName={styles.buttonStyle}  getNumbers={calculatorNumbers} onPressNumberButton={setCalculatorNumbers} getStatement={calculatorStatement} setStatement={setCalculatorStatement} buttonNumber='0'/>
          <OperatorButton buttonStyleName={styles.buttonStyle} operatorText="." getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers}/>
          <OperatorButton buttonStyleName={styles.buttonStyle2} operatorText="=" getNumbers={calculatorNumbers} setNumbers={setCalculatorNumbers} setStatement={setCalculatorStatement} getStatement={calculatorStatement}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper:{
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#353535',
    height: 480,
    width: 350

  },
  calculatorDisplay:{
    backgroundColor: '#929292',
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end'
  },
  buttonWrapper:{
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    columnGap: '2%',
    rowGap: 10,
    paddingTop: 10
  },
  buttonStyle:{
    borderRadius: 10,
    backgroundColor: '#DF4A2B',
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontSize: 20,
    userSelect: 'none'
  },
  displayStyle:{
    fontSize: 40
  },
  buttonStyle2:{
    borderRadius: 10,
    backgroundColor: '#DF4A2B',
    width: '200%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
