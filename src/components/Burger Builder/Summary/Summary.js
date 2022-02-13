import React from 'react'

export default function Summary(props) {
    const summaryArr=props.ingredients.map(item=>{
        return <li key={item.type} style={{listStyle:'none'}}>
                    <span style={{textTransform:'capitalize'}}>{item.type}</span> :{item.amount}
                </li>
    })
  return (
        <div>
            <ul>
                {summaryArr}
            </ul>
        </div>
  )
}

