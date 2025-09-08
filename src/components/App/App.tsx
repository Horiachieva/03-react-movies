import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';

import type { Movie } from '../../types/movie';

export default function App() {
  return <div className={css.app}></div>;
}
