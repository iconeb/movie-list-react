import React from 'react';
import axios from 'axios';

import './MovieListPage.css';

import Button from '../../components/Button';
import { MovieList, MovieListItem } from '../../components/MovieList';

import {
	deleteListRequest,
} from '../../store/movieList';

class MovieListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
	    this.props.deleteList();
  }

  async componentDidMount() {
    const movieListId = this.props.match.params.id;
    try {
      const response = await axios.get(`/api/movie-lists/${movieListId}`);
      this.setState({
    	id: response.data.id,
    	title: response.data.title,
        movies: response.data.movies
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

	const id = this.state.id;
	const list = this.state.title;
    const movies = this.state.movies.map(movie => (
      <MovieListItem key={movie.id} movie={movie} />
    ));

    return (
      <div className="movie-list-page">
        <div className="header">
          <h1>My List: {list}</h1>
        </div>
        <div className="movie-list-page-actions">
          <Button to={ "/lists/predict/" + id }>Predict</Button>
    	</div>
        <MovieList>
          {movies}
        </MovieList>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
	  deleteList: () => dispatch(deleteListRequest())
	});

export default MovieListPage;
