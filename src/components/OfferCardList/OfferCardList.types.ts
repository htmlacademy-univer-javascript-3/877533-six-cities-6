import { Offer } from '../../types';
import { OfferCardProps } from '../OfferCard/OfferCard.types';

export type OfferCardListProps = {
  topSection?: React.ReactNode;
  offers: Offer[];
  offerCardProps?: Omit<OfferCardProps, 'offer'>;
};
