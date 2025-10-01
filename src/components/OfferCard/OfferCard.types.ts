import { Offer } from '../../types';

export type OfferCardClassNames = 'root' | 'imageWrapper' | 'info';

export type OfferCardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  offer: Offer;
  classNames?: Partial<Record<OfferCardClassNames, string>>;
  previewImageWidth?: number;
  previewImageHeight?: number;
};
