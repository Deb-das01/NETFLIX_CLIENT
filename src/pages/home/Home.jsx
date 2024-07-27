import React from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { useEffect, useState } from "react";
//Below mentioned Axios is a npm package that allows to hit the external request
//Here axios is used to hit the API that we have created.
import axios from "axios";


const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);



  //The useEffect hook is used to create a side effect in case of any changes in the state variables
  //In this case if a change occures in any one of the variable [type,genre] then the function is called.
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTdmNjFjNTFjZmQ3NjNhYzc2OGMxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMjA5ODgwMywiZXhwIjoxNzUzNjM0ODAzfQ.gxTBqew4WcmyLPT-S25cK0KqKBCZPPgPuELABPKOYJk",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
    //The below mentioned array describes the set of state variables for which the useEffect will get executed.
  }, [type, genre]);
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.filter((list) => list.title !== 'Popular Movies' && list.title !== 'Popular Webseries')
        .map((list) => (
          <List key={list._id} list={list} />
        ))}
     </div>
  )
}

export default Home
