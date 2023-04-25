import React,{Component} from 'react';
import { useState,useEffect} from 'react';


const StudentForm = () =>
{

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [student,setStudents] = useState([])
  

  const handleClick =(e)=>{
    
    const student ={name,address}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    })
    .then(()=>{
        console.log("New Student added")
      })
      .catch((e) => {
        console.log(e);
      })
    
  }

 
  useEffect(() => {
    (async () => {
        try {
            let response = await fetch("http://localhost:8080/student/getAll", {
                method: "GET"
            });

            let jsonResponse = await response.json();
            console.log(jsonResponse);
            setStudents(jsonResponse);
        } catch (e) {
            console.log(e);
        }
    })();
  }, [])
   return (
    <div>
        <form action="/" class="decor">
      <div className="form-left-decoration"></div>
      <div class="form-right-decoration"></div>
      <div className="circle"></div>
      <div className="form-inner">
        <h1>III-ACDS</h1>
        <input type="text" placeholder="Student Name" value = {name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="Address" value = {address} onChange={(e)=>setAddress(e.target.value)}/>
        
        <button type="submit" href="/" onClick={handleClick}>Submit</button>
      </div>
    </form>

    <div>
        <h1>Students</h1>
        {
            student.map((data) =>
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div style={{ 
                        display: "flex",
                        flexDirection: "column",
                        flex: 1 }}>
                            <span> ID: {data.id} </span>
                            <span> Student Name: {data.name} </span>
                            <span> Address: {data.address} </span>
                    </div>

                    <div style={{ 
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        
                       
                        }}>
                            <button style ={
                                {
                                    width :'70px'
                                }
                            }
                            
                            onClick={async () => {
                                try {
                                    console.log(data);
                                    let response = await fetch("http://localhost:8080/student/delete", {
                                        method: "POST",
                                         body:JSON.stringify(student)
                                    });

                                    if (response.ok) {
                                        let newArr = student.filter(val => val.id === data.id);
                                        setStudents(newArr);
                                    }
                                } catch (e) {
                                    console.log(e);
                                }   
                            }} > Delete </button>
                    </div>
                </div>
            )
        }

    </div>
    
     
   </div>     


   );


}

export default StudentForm;



