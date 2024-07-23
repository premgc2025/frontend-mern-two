
import React, { useContext, useEffect, useState } from 'react'

import { authContex } from '../context/authContext'
import moment from 'moment'


function CheckYourMacros() {

  const loggedUser = useContext(authContex)
  const [items, setItems] = useState([])
  const [total, setTotal] = useState({})

  console.log("total", total)
  console.log("items for", items)
  console.log("Name", loggedUser.loggedUser)

  function dateHandle(event) {
    const date = moment(event.target.value).format("YYYY-MM-DD")
    console.log("date", date)

    fetch(`http://localhost:5000/trackings/${loggedUser.loggedUser.id}/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `bearer ${loggedUser.loggedUser.token}`
      }
    })


      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        setItems(data)
        console.log("data log", data)



      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    totalMacros()
  }, [items])

  // Calculate Total Macros

  function totalMacros() {
    const macro = {
      totalcalories: 0,
      totalprotein: 0,
      totalcarbs: 0,
      totalfat: 0,
      totalqty: 0,

    }

    items.forEach((element) => {
      console.log("element", element)

      macro.totalcalories += element.details.calories;
      macro.totalprotein += element.details.protein;
      macro.totalcarbs += element.details.carbohydrate;
      macro.totalfat += element.details.fat;
      macro.totalqty += element.quantity;

    })

    setTotal(macro)

  }

  return (
    <div className="food-container">
      <div className="nutrition-inp tracking-date">
        <input type="date" onChange={dateHandle} />
        <p>Select Date and Check Your Macros</p>
      </div>
   
       { items.length!==0 ? (


        <div className="food-parent macros-parent">
          {
            items.map((item, i) => {

              return (
                <div className="food-item" key={i + 1} >

                  <p className='foods-table-title'>{item.foodId.name} (per {item.quantity}G)</p>
                  <table key={i} className='foods-table'>
                    <thead>
                      <th>Calories</th>
                      <th>Proteins</th>
                      <th>Carbs</th>
                      <th>Fats</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.details.calories} kCal</td>
                        <td>{item.details.protein}g</td>
                        <td>{item.details.carbohydrate}g</td>
                        <td>{item.details.fat}g</td>

                      </tr>
                    </tbody>
                  </table>
                </div>
              )

            })
          }

          <div className="food-item"  >

            <p className='foods-table-title macro-total-title'>Total Macros  {total.totalqty}G consumed by {loggedUser.loggedUser.name}</p>
            <table className='foods-table'>
              <thead>
                <th>&#8721; Calories</th>
                <th>&#8721; Proteins</th>
                <th>&#8721; Carbs</th>
                <th>&#8721; Fats</th>
              </thead>
              <tbody>
                <tr className='macro-total'>
                  <td>{Number(total.totalcalories).toFixed(2)} kCal</td>
                  <td>{Number(total.totalprotein).toFixed(2)}g</td>
                  <td>{Number(total.totalcarbs).toFixed(2)}g</td>
                  <td>{Number(total.totalfat).toFixed(2)}g</td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>):null
    
        }
    </div>
  )
}

export default CheckYourMacros