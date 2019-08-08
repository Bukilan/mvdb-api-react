

import React from "react";
import { PropTypes }  from 'prop-types';
import { connect } from "react-redux";
import MyTable from "./components/MyTable"
import IsLoading from "./components/isLoading"
import CancelCross from "./components/CancelCross"
import { itemFetchMovies } from './redux/actions/items';
import star from './static/images/image2vector.svg'
import tickets from './static/images/buy-tickets.png'

import "./static/App.css"


class App extends React.Component {


    componentDidMount() {
        this.props.fetchMovie()
    }

    render() {

        if (this.props.state.items.list.length === 0) {
            return (
                <div>
                    <CancelCross/>
                    <IsLoading/>
                </div>
            )
        }


        const getGenres = (j) => {
            let genre_str ='';
            this.props.state.items.list[j].genre.map((item, i) => {
                if (i === this.props.state.items.list[j].genre.length - 1) {
                    genre_str += `${item}`
                } else {
                    genre_str += `${item} | `
                }
            })
            return genre_str;
        }

        return (
            <div>
                <MyTable/>

                <table className="data_table">
                    <tbody>
                    <tr className="rt-table">
                        {this.props.state.items.list.slice(0, 4).map(function (item) {
                            return (
                                    <td className="elem">
                                        {item.poster}
                                        <img className="elem_ticket" src={tickets} alt={'movie poster'}/>

                                        <h3 className="elem_rating">
                                            <img className="elem_rating_star" alt={'star'} src={star} width={20}/>
                                            {item.rating + ' / 10'}
                                        </h3>
                                    </td>
                            )
                        })}
                    </tr>

                    <tr className="rt-table">
                        {this.props.state.items.list.slice(0, 4).map(function (item,i) {
                            return (
                                <td className="elem">

                                    <h2 className="elem_title">
                                        {item.title} ({item.year})
                                    </h2>

                                    <h5 className="elem_genres">
                                        {getGenres(i)}
                                    </h5>

                                </td>
                            )
                        })}
                    </tr>

                    <tr className="rt-table">
                        {this.props.state.items.list.slice(4, 8).map(function (item) {
                            return (
                                <td className="elem">
                                    {item.poster}
                                    <img className="elem_ticket"  alt={'movie poster'} src={tickets}/>

                                    <h3 className="elem_rating">
                                        <img className="elem_rating_star" alt={'star'} src={star} width={20}/>
                                        {item.rating + ' / 10'}
                                    </h3>
                                </td>
                            )
                        })}
                    </tr>

                    <tr className="rt-table">
                        {this.props.state.items.list.slice(4, 8).map(function (item,i) {
                            return (
                                <td className="elem">

                                    <h2 className="elem_title">
                                        {item.title} ({item.year})
                                    </h2>

                                    <h5 className="elem_genres">
                                        {getGenres(i)}
                                    </h5>

                                </td>
                            )
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

App.propTypes = {
    fetchMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
        page: state.page,
        genre: state.genre,
        state: state,
});


const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovie: (page, genre) => dispatch(itemFetchMovies(page, genre))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App)