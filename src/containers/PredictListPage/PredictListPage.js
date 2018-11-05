import React from 'react';
import axios from 'axios';

import './PredictListPage.css';

import { MovieList, MovieListItem } from '../../components/MovieList';

class PredictListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    const movieListId = this.props.match.params.id;
    try {
      const response = await axios.get(`/api/movie-lists/predict/${movieListId}`);
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
      <div className="predict-list-page">
        <div className="header">
          <h1>Prediction for: {list}{id}</h1>
        </div>
        <MovieList>
          {movies}
        </MovieList>
      </div>
    );
  }

}

export default PredictListPage;
