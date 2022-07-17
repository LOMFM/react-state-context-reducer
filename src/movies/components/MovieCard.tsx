import { StarRating, Button } from 'shared/components';

import { getAvgRating } from 'movies/ratings';
import { Movie } from 'types';
import { useMovies } from './MovieProvider';

interface MovieCardProps {
    movie: Movie,
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { moviesDispatch } = useMovies();
    const onRate = (evt: number) => {
        moviesDispatch({
            type: 'rate',
            payload: {
                movieId: movie.id,
                rating: evt
            }
        })
    };

    const onDelete = () => {
        moviesDispatch({
            type: 'delete',
            payload: {
                movieId: movie.id,
            }
        })
    };

    // TODO: implement required functionality

    return (
        <div data-testid={"movie-item-" + movie.id}>
            {/* TODO: Display image */}
            <img className="card-img-top" alt="" src={movie.imageUrl} />
            <div className="card-body">
                <h4 className="card-title">
                    {/* TODO: Display title */}
                    {movie.title}
                </h4>
                {/* TODO: Display subtitle */}
                <h6 className="card-subtitle mb-2 text-muted">
                    {movie.subtitle}
                </h6>
                <p className="text-justify" style={{ fontSize: '14px' }}>
                    {/* TODO: Display description */}
                    {movie.description}
                </p>
                {/* TODO: Implement delete functionality */}
                <Button onClick={onDelete}>Delete</Button>
            </div>
            <div className="card-footer">
                <div className="clearfix">
                    <div className="float-left mt-1">
                        {/* TODO: Display stars */}
                        <StarRating rating={getAvgRating(movie)} onRate={onRate} />
                    </div>
                    {/* TODO: Display rating value */}
                    <div data-testid="movie-rating" className="card-footer-badge float-right badge badge-primary badge-pill">
                        <span>{getAvgRating(movie)}</span>
                    </div>
                </div>
            </div>
        </div>    
    )
};
