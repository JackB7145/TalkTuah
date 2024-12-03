import React, {useState, useEffect} from 'react'


const Home = () => {
  const [topic, setTopic] = useState(null);
  let handleSubmit = async () => {
    try{
      await fetch('http://localhost:3000/topic', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topic
        })
      }).then(res => {
        return res.json();
      })
    } catch (e){
      console.log(e);
    }
  }

  return (
    <>
      <div className = "form">
        <input type='text' onChange={(e) => {
          setTopic(e.target.value)
          }} onSubmit = {handleSubmit}/>
      </div>
    </>
  )
}

export default Home