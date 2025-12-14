import { Offer } from '../types';
import { OFFER_SORT_OPTIONS } from './consts';

export type OfferSortOption = (typeof OFFER_SORT_OPTIONS)[number]['value'];

export const comparePopular = (): number => 0;

export const comparePriceLowToHigh = (a: Offer, b: Offer): number =>
  a.price - b.price;

export const comparePriceHighToLow = (a: Offer, b: Offer): number =>
  b.price - a.price;

export const compareTopRatedFirst = (a: Offer, b: Offer): number =>
  b.rating - a.rating;

export const offerComparators: Record<
  OfferSortOption,
  (a: Offer, b: Offer) => number
> = {
  popular: comparePopular,
  'price:low-to-high': comparePriceLowToHigh,
  'price:high-to-low': comparePriceHighToLow,
  'top-rated-first': compareTopRatedFirst,
};
