import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import PopularFeatured from '../../components/popularfeatured/PopularFeatured';
import List from '../../components/list/List';
import "./Popularmovie.scss"

const Popularmovie = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [popularWebseriesList, setPopularWebseriesList] = useState([]);
  const [featuredItemType, setFeaturedItemType] = useState(null);

  useEffect(() => {
    const fetchPopularLists = async () => {
      try {
        const res = await axios.get('https://netflix-mern-backend.onrender.com/api/lists', {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        console.log("res.data:");
        res.data.forEach(item => console.log(item));

        const popularMovies = res.data.filter(list => list.title === "Popular Movies");
        const popularWebseries = res.data.filter(list => list.title === "Popular Webseries");

        console.log("popMovies:",popularMovies);
        console.log("popweb:",popularWebseries);

        setPopularMovieList(popularMovies);
        setPopularWebseriesList(popularWebseries);

        const randomItemType = Math.random() < 0.5 ? "movie" : "webseries";
        setFeaturedItemType(randomItemType);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPopularLists();
  }, []);

  return (
    <div className='popular-movie'>
      <Navbar />
      <PopularFeatured 
        type={featuredItemType} 
        popularMoviesList={popularMovieList} 
        popularWebseriesList={popularWebseriesList} 
      />

      <div>
        <h2>Popular Movies</h2>
        {popularMovieList.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </div>

      <div>
        <h2>Popular Webseries</h2>
        {popularWebseriesList.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Popularmovie;
