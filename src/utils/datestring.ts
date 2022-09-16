export const toLocaleDateString = (dateString: string, options: Intl.DateTimeFormatOptions) => {
  if (!dateString || dateString === '')
    return '';
  return (new Date(dateString)).toLocaleDateString('en-US', options);
};
