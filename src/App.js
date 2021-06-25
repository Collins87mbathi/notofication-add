import React,{useState,useReducer} from "react"
import Modal  from "./Modal";

const reducer = (state,action) => {
if(action.type==='ADD_ITEM'){
  const ppl = [...state.people, action.payload ]
  return(
  {...state, people:ppl,isModel:true, modelcontent:'item added'}
  );
}

if(action.type==='REMOVE_ITEM') {
   const newppl = state.people.filter((person)=> {
   return person.id !== action.payload;
   });
    return (
       {...state, people: newppl,isModel:true, modelcontent:'item removed'}
    );
}

if(action.type==='NO_VALUE') {
    return(
    {...state,isModel:true, modelcontent:'please enter an item'}
    );
}

if(action.type==='CLOSE_MODAL'){
    return(
        {...state,isModel:false}
    )
}



};

const initialState = {
    people:[],
    isModel: false,
    modelcontent: '',
};


function App() {
 
const [name,setName] = useState('');

const [state, dispatch] = useReducer(reducer, initialState);

function handleclick(e) {
    e.preventDefault();
    if(name)
    {
    const newitem = {id:Math.random()*1000,name};
    dispatch({type:'ADD_ITEM',payload:newitem});
    setName('');

    } else
     {
   dispatch({type:'NO_VALUE'});
    }
};

const closeModal = () => {
    dispatch({type:'CLOSE_MODAL'});
};

    return (
        <>
        {state.isModel && ( <Modal modelcontent={state.modelcontent} closeModal={closeModal}/>)}

        <form onSubmit={handleclick} className='title'>
        <div>
        <input type='text'className='text' value={name} onChange={(e)=>setName(e.target.value)} /> 
        </div>
       
        <button className='btn' type='submit'>Add</button>
        
          </form>

    {state.people.map((input)=>{
        const {id,name} = input;
        return (
        <div className='item' key={id}>
            <h4>{name}</h4>
            <button className='remove' onClick={()=>dispatch({type: 'REMOVE_ITEM',payload:input.id})}>remove</button>
        </div>
        );
    })} 

</>
    )
}

export default App
