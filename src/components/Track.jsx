import React, { useState } from 'react'
import { authContex } from '../context/authContext'
import { useContext } from 'react'
import FoodUnit from './FoodUnit'

function Track() {

  const loggedUser = useContext(authContex)
  const[foodsItem, setFoodsItem]= useState([])
  const[singleFood, setSingleFood] = useState(null);
  
  const[message, setMessage] = useState({
    type:"invisible",
    text:""
  })
  // console.log("foods",foodsName)

  function searchHandle(event){
    const foodsName = event.target.value
            if(foodsName.length!==0)
            {
              fetch(`http://localhost:5000/foods/${foodsName}`,
                {
                  method:"GET",
                  headers:
                  {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loggedUser.loggedUser.token}`
                  }

                }
              )
              .then((res)=>res.json())
              .then((data)=>{               
                  if(data.Message===undefined){
                    console.log("data food",data)
                    setFoodsItem(data)
                    setMessage({})
                  }
                  else{
                    setFoodsItem([])
                    setMessage({
                      type:"error",
                      text:data.Message
                    })
                   console.log("message in",message)
                  }
              })
              .catch((err)=>{
                console.log({Message:err})
              })
            }
            else{
              setFoodsItem([])
              setMessage({})
            }

  }
  return (
    <div className="track-container container">
      <div className="track-parent parent">
        <div className="search">
          <input type="search" placeholder='Search Foods by Name' name="search" className='search-item' onChange={searchHandle}/>
        </div>
        <div className="search-result">
         
          {
              foodsItem!==0 ? (foodsItem.map((item,i)=>{
                return(
                  <p key={i+1} className='search-eachitem' onClick={()=>{
                    setSingleFood(item)
                    setFoodsItem([])

                  }}>{item.name}</p>
                )
              })):null
          }
          <p className={message.type}>{message.text}</p>
        </div>
      </div>

      {
        singleFood!==null ? <FoodUnit  item ={singleFood}  /> : null
      }
    </div>
  )
}

export default Track;