export type CommentFormData = {
  rating: number;
  review: string;
};

export type CommentFormProps = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  'onSubmit'
> & {
  defaultValues?: CommentFormData;
  onSubmit?: (data: CommentFormData) => void | Promise<void>;
};
