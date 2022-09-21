import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import errorImg from './images/error-img.jpg';

function App() {

  const [inputval, setinputval] = useState("");
  const [error, seterror] = useState(false);
  const [response, setRespones] = useState("")
  const [apicalling,setApiCalling]=useState(false)

  useEffect(
    () => {
      axios.get(`https://api.github.com/users/${inputval?inputval:"ghulamyaseen778"}`)
        .then(res => {
          setRespones(res.data)
          setinputval('')
        })
        .catch(err => {
          console.log(err)
          seterror(true)
          setinputval('')
        })
    },
  [apicalling])

  const dataGetting = (e) => {
    e.preventDefault()
    console.log(inputval)
    if (!inputval.trim()) {
      console.log("filed is empty");
    }
    setApiCalling(!apicalling)
  }
  return (
    <>
      <div className="main-box">
        <div className="box-t">
          <form onSubmit={dataGetting}>
            <input type="text" className='seacrh-box' value={inputval} onChange={(e) => { setinputval(e.target.value) }} placeholder="Search Username" />
          </form>
        </div>
        <div className="box-b">
          {
            error === true ? <img src={errorImg} alt="" className="error-img"/> : (<>
              <div className="img-box">
                <img src={response.avatar_url} alt="" />
              </div>
              <div className="text-box">
                <ul>
                  <li>UserName:{response.name}</li>
                  <li>Bio:{response.bio}</li>
                  <li>Followers:{response.followers}</li>
                  <li>Following:{response.following}</li>
                  <li>Public Repos:{response.public_repos}</li>
                </ul>
              </div></>)
          }
        </div>
      </div>
    </>
  );
}

export default App;
