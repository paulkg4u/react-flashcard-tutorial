import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import  axios from 'axios'

function App() {

  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([])
  const categoryEl = useRef()
  const amountEl = useRef()
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      console.log(response);
      setCategories(response.data.trivia_categories);
    })
  }, [])
  

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.get('https://opentdb.com/api.php',{
      params:{
        amount:amountEl.current.value,
        category:categoryEl.current.value
      }
    })
    .then((response) => {
      setFlashcards(response.data.results.map((item, index) =>{
        const answer = decodeString(item.correct_answer);
        const options = [...item.incorrect_answers.map(opt => decodeString(opt)), answer]
        return {
          id : `${index}-${Date.now()}`,
          question: decodeString(item.question),
          answer : answer,
          options : options.sort(() => Math.random() -.5)
        }
      }));
      
    })
  }
  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        
        <label htmlFor="category">
          Category
        </label>
        
        <select id="category" ref={categoryEl}>
          {categories.map(category =>{
            return <option value = {category.id} key={category.id}>{category.name}</option>
          })}
      
        </select>
        
      </div>
      <div className="form-group">
        
        <label htmlFor="amount">
          Number of Questions
        </label>
        
        
        <input ref = {amountEl} type="number" name="amount" id="amount" defaultValue={10} min="1" max="50" step="1"/>
        
        
      </div>
      <div className="btn">
        
        
        <button className="btn">
          Generate
        </button>
        
        
        
      </div>
    </form>
    
    <div className="container">
      <FlashcardList flashcards={flashcards}/>
    </div>
    </>
    
    
  );
}

export default App;
