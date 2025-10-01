import { Fragment, useState } from 'react';
import { CommentFormData, CommentFormProps } from './CommentForm.types';
import clsx from 'clsx';

const fallbackDefaultValues: CommentFormData = { rating: 4, review: '' };

export const CommentForm = ({
  defaultValues,
  onSubmit,
  className,
  ...props
}: CommentFormProps) => {
  const [formData, setFormData] = useState<CommentFormData>(
    defaultValues ?? fallbackDefaultValues
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled = isSubmitting || !formData.rating || !formData.review;

  const handleFieldChange = (
    event: React.ChangeEvent,
    options?: Partial<{ isNumber: boolean }>
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: options?.isNumber ? Number(value) : value,
    });
  };

  const handleFormSubmit = async (
    event: React.FormEvent,
    data: CommentFormData
  ) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit?.(data);
      setFormData(fallbackDefaultValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={clsx('reviews__form form', className)}
      onSubmit={(event) => void handleFormSubmit(event, formData)}
      {...props}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: 5 }, (_, i) => 5 - i).map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={formData.rating === rating}
              onChange={(event) => handleFieldChange(event, { isNumber: true })}
              readOnly={isSubmitting}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        readOnly={isSubmitting}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
