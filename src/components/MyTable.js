
import React from 'react';
import "../static/MyTable.css"
import {itemFetchMovies} from "../redux/actions/items";
import {connect} from "react-redux";
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

let genre = '';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
const genreCustomStyles = {
    control: (base, state) => ({
        ...base,
        background: "#000",
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        borderColor: "white",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            borderColor: "cyan",
        }
    }),

    singleValue: base => ({
        ...base,
        color: "#fff"
    }),
    input: base => ({
        ...base,
        color: "#fff"
    }),

    menu: base => ({
        ...base,
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    option: base => ({
        background: "#000",
        textAlign: "left",
        padding: "10px",
    })
};

const genre_options = [
    { value: 'Action', label: 'Action' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Family', label: 'Family' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'History', label: 'History' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Music', label: 'Music' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'TV Movie', label: 'TV Movie' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'War', label: 'War' },
    { value: 'Western', label: 'Western' },
];



 const MyTable = (props) => {


    const handleMenu = () => {
        props.fetchMovie(1);
        window.location.reload();
    };

    const onGenreChange = () => {
        if (genre.state.value !== null) {
            if (  genre.state.value.length !== 0){
                console.log(genre)
                props.fetchMovie(1, genre.state.value.value)
            } else { alert("please, choose genre")}
        }
    };


        return (
            <tr className="header">
                <th>
                    <h1 className="header-name" onClick={handleMenu}>
                        Movie list
                    </h1>
                </th>
                <th width="150"/>
                <th>
                    <Select
                        ref={node => {genre = node}}
                        className="genre-form"
                        closeMenuOnSelect={true}
                        components={makeAnimated()}
                        isMulti={false}
                        options={genre_options}
                        styles={genreCustomStyles}
                    />
                </th>
                <th width="10"/>
                <th>
                    <button onClick={onGenreChange} className="genre-button">Submit</button>
                </th>
                <th width="120"/>
            </tr>
        )
    };


const mapStateToProps = (state) => ({
    state: state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovie: (page, method, query_value, year) => dispatch(itemFetchMovies(page, method, query_value, year))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTable)