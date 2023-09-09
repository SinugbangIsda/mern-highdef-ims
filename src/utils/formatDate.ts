import { 
  format, 
  parse 
} from 'date-fns';

export const formatDate = (value: string, originalDateFormat:  string, targetDateFormat: string) => {
  const date = parse(value, originalDateFormat, new Date());

  if (isNaN(date.getTime())) {
    return value;
  }

  return format(date, targetDateFormat);
};