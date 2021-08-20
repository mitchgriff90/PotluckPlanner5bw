import React, {useState, useEffect, useReducer} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import RegisterForm from './components/Register';
import RegisterSchema from './components/RegisterSchema';
import * as yup from 'yup'
import LoginForm from './components/Login'
import axios from 'axios';
import LoginSchema from './components/LoginSchema.js'
import {reducer, initialState} from './reducers/PotluckReducer';
import PrivateRoute from './components/PrivateRoute';
import AddItemForm from './components/AddItemForm';
import AddItemCard from './components/AddItemCard';
import PotluckInfoCard from './components/PotluckInfoCard.js';
import NewPotluckInfoForm from './components/NewPotluckInfoForm';

const originalRegisterValues = {
  username:'',
  email: '',
  password: '',
  termsOfService: false
}

const originalRegisterErrors = {
  username:'',
  email:'',
  password:'',
  termsOfService:'Click the checkbox'
}

function App() {
  const [registerValues, setRegisterValues] = useState(originalRegisterValues)
  const [registerErrors, setRegisterErrors] = useState(originalRegisterErrors)
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [terms, termsRead] = useState(false);
  let history = useHistory();
 
  const registerChange = (evt) =>{
    const name = evt.currentTarget.name
    const value = evt.currentTarget.value
    yup
      .reach(RegisterSchema, name)
      .validate(value)
      .then(valid=>{
        setRegisterErrors({...registerErrors,
          [name]:''
        })
      })
      .catch(err=>{
        setRegisterErrors({...registerErrors,
          [name]:err.errors[0]
        })
      })

    setRegisterValues({...registerValues, [name]: value})
  }

  useEffect(()=>{
    RegisterSchema.isValid(registerValues)
    .then(valid=>{
      setRegisterDisabled(!valid)
    })
  }, [registerValues])

  const registerSubmit = evt =>{
    evt.preventDefault();
    if(terms){
      setRegisterErrors({...registerErrors, termsOfService:''})
    }else{
      setRegisterErrors({...registerErrors, termsOfService: 'Check the box'})
      return ''
    }

const newUser = {
  username:registerValues.username,
  password: registerValues.password
}

const url ='we need an API pls unit 4 person make us an API. API goes here'

    axios
    .post(url, newUser)
    .then(response => {
      console.log('response', response.data)
      history.push('/login')
    })
    .catch(err=>{console.log('err', err)})
  }

  const registerCheckbox =evt=>{
      const {checked}= evt.target;

      
    termsRead(checked)
    setRegisterErrors({...registerErrors, termsOfService:''})
  }

const [loginValues, setLoginValues] = useState({username: '', password: ''})
const [loginErrors, setLoginErrors] = useState({username:'', password:''})
const [loginDisabled, setLoginDisabled] = useState(false);
const onLoginChange = evt=>{
  const name= evt.currentTarget.name
  const value = evt.currentTarget.value
  yup
    .reach(LoginSchema, name)
    .validate(value)
    .then(valid=>{
      setLoginErrors({...loginErrors,
        [name]:''
      })
    })
    .catch(err=>{
      setLoginErrors({...loginErrors,
        [name]:err.errors[0]
      })
    })

  setLoginValues({...loginValues, [name]: value})
}

useEffect(evt =>{
  LoginSchema.isValid(loginValues)
  .then(valid=>{
    setLoginDisabled(!valid)
  })
}, [loginValues])

  const[state, dispatch] = useReducer(reducer, initialState)
 
const addTask = (item) => {
      dispatch({type: 'ADD_TODO', payload: item})
}

const toggleCompleted = (id) => {
      dispatch({type: 'TOGGLE_COMPLETED', payload: id})
}

const clearCompleted = () => {
  dispatch({ type: 'CLEAR_COMPLETED'})
}

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/login'>
          <LoginForm
          values={loginValues}
          onInputChange={onLoginChange}
          loginDisabled={loginDisabled}
          errors={loginErrors}/>
        </Route>

        <Route path='/register'> 
          <RegisterForm 
         values={registerValues} 
          onInputChange={registerChange}
         registerSubmit={registerSubmit}
         registerDisabled={registerDisabled}
         errors={registerErrors}
         termsOfService={registerCheckbox}/>
        </Route>

        <Route path='/'><Home /></Route>
        <PrivateRoute exact path='/protected' component= {NewPotluckInfoForm}/>
        <PrivateRoute exact path='/protected' component= {AddItemForm} addTask={addTask} clearCompleted={clearCompleted} />
        <PrivateRoute exact path='/protected' component={PotluckInfoCard}/>
        <PrivateRoute exact path='/protected' component={AddItemCard} state={state}  toggleCompleted={toggleCompleted} />
      </Switch>
    </div>
  );
}

export default App;