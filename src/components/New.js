import React,{useState} from "react";
import Properties from "./Properties";

function New() {


  const [datas,setDatas]=useState(null)
  const list=[{
    name:'shinadh',
    age:'21'
  },
  {
    name:'faris',
    age:'33,'
  }
]

const handleData=(data)=>{
  console.log(data,'data recieved from child');
  setDatas(data)
}

  return(
    <div>
  {list.map((values)=>(
    <Properties data={values} key={values.name} onChildData={handleData}/>
  ))}
   <p>Data received from child: {datas}</p>
  </div>
  )
  
}

export default New;
