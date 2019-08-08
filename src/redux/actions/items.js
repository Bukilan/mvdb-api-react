
import React from "react";
import image_not_found from '../../static/images/images.png'

const genre_options = {
    28: 'Action' ,
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War' ,
    37: 'Western',
};


export function itemFetchMovies(page = 1, genre = 'action') {
    return function (dispatch) {
        console.log(`https://cors-anywhere.herokuapp.com/https://mvdb-api.herokuapp.com/movie_list?sort=popularity.desc&genre=${genre}&page=${page}&amount=8`);
         return fetch(`https://cors-anywhere.herokuapp.com/https://mvdb-api.herokuapp.com/movie_list?sort=popularity.desc&genre=${genre}&page=${page}&amount=8`, {method: 'GET', headers: {
                 'origin': 'x-requested-with',
             }})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let movies = [];

                let currentCount = 1;
                function makeCounter() {
                     return function() {
                        return currentCount++;
                    };
                }

                let counter = makeCounter();
                for (let i = 0; i < data.results.length; i++) {

                    let tmp_genres = []

                    data.results[i].genre_ids.forEach(item => {
                        tmp_genres.push(genre_options[`${item.toString()}`]);
                    })

                     let image_url;

                    if (data.results[i].poster_path === null) {
                        image_url = {image_not_found}
                    } else {
                        image_url = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
                    }

                    movies.push({
                        key: {i},
                        number: counter(),
                        poster: <img
                            className="elem_poster"
                            src={image_url}
                            alt="new"
                        />,
                        title: data.results[i].title,
                        year: new Date(Date.parse(data.results[i].release_date)).getFullYear(),
                        rating: data.results[i].vote_average,
                        genre: tmp_genres
                    })
                }
                console.log('fetch data here');
                console.log(movies);

                    dispatch(
                        {
                            type: 'ITEMS_FETCH_DATA_SUCCESS',
                            payload: movies,
                            payload_page: page,
                            payload_genre: genre,
                        }
                    );
            });
    }
}
