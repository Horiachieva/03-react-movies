import { useEffect } from 'react';
import { getImageUrl } from '../services/imageUrl';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';
import { createPortal } from 'react-dom';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (!movie) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = overflow;
    };
  }, [movie, onClose]);

  if (!modalRoot || !movie) return null;

  const imageSrc =
    getImageUrl(movie.backdrop_path, 'original') || '/no-image.png';

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <img src={imageSrc} alt={movie.title} className={css.image} />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || '—'}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
