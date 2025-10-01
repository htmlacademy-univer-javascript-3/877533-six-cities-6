import { useMemo } from 'react';
import { FavoritesProps } from './Favorites.types';
import { Offer } from '../../types';
import { OfferCardList } from '../../components/OfferCardList';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const Favorites = ({ offers }: FavoritesProps) => {
  const groupedOffers = useMemo(() => {
    if (!offers.length) {
      return {};
    }

    const offersByCities: Record<string, Offer[]> = {};

    offers.forEach((offer) => {
      const cityName = offer.city.name;
      if (offersByCities[cityName]) {
        offersByCities[cityName].push(offer);
      } else {
        offersByCities[cityName] = [];
      }
    });

    return offersByCities;
  }, [offers]);

  return (
    <div
      className={clsx('page', {
        'page--favorites-empty': !offers.length,
      })}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main
        className={clsx('page__main page__main--favorites', {
          'page__main--favorites-empty': !offers.length,
        })}
      >
        {offers.length ? (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(groupedOffers).map((cityName) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferCardList
                        offers={groupedOffers[cityName]}
                        offerCardProps={{
                          previewImageWidth: 150,
                          previewImageHeight: 100,
                          classNames: {
                            root: 'favorites__card',
                            imageWrapper: 'favorites__image-wrapper',
                            info: 'favorites__card-info',
                          },
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
};
