import React from 'react';
import { Card,CardBody,CardHeader,CardFooter } from 'reactstrap';

const control=[
    {label:'Cheese',type:'Cheese'},
    {label:'Meat',type:'Meat'},
    {label:'Salad',type:'Salad'},
]

const BuildControl=(props)=>{
    return (
        <div className='d-flex'>
            <div className='mr-auto ml-5' style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <div>
                <button className="btn btn-danger btn-sm m-1" onClick={props.remove}>Less</button>
                <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
            </div>
        </div>
    )
}

export default function Controls(props) {
  return (
        <div className='container ml-md-5'style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}>
                    <h4>Add Igredients</h4>
                </CardHeader>

                <CardBody>
                    {
                        control.map(item=>{
                            return <BuildControl type={item.type} 
                            label={item.label}
                             key={Math.random()}
                             added={()=>props.added(item.type)}
                             remove={()=>props.remove(item.type)}
                             />
                        })
                    }
                </CardBody>

                <CardFooter style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}>
                    <h5>Price: <strong>{props.totalPrice}</strong> BDT</h5>
                </CardFooter>
            </Card>
        </div>
  );
}
