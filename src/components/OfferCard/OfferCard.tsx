import clsx from 'clsx';
import { OfferCardProps } from './OfferCard.types';
import { Link } from 'react-router-dom';

export const OfferCard = ({
  offer: {
    id,
    isPremium,
    previewImage,
    price,
    isFavorite,
    rating,
    title,
    type,
  },
  className,
  classNames,
  previewImageWidth,
  previewImageHeight,
  ...props
}: OfferCardProps) => (
  <article
    className={clsx('place-card', className, classNames?.root)}
    {...props}
  >
    {isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div
      className={clsx('place-card__image-wrapper', classNames?.imageWrapper)}
    >
      <Link to={`/offer/${id}`}>
        <img
          className="place-card__image"
          src={previewImage}
          width={previewImageWidth}
          height={previewImageHeight}
          alt="Place image"
        />
      </Link>
    </div>
    <div className={clsx('place-card__info', classNames?.info)}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

        <button
          className={clsx('place-card__bookmark-button button', {
            'place-card__bookmark-button--active': isFavorite,
          })}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {isFavorite ? 'In bookmarks' : 'To bookmarks'}
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);
