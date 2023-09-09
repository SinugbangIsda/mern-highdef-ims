export const formatMoney = (value: number) => {
    const locale = 'en-PH';
  
    if (value >= 1000000000) {
      return (value / 1000000000).toLocaleString(locale, { style: 'currency', currency: 'PHP', currencyDisplay: 'code', maximumFractionDigits: 2 }) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toLocaleString(locale, { style: 'currency', currency: 'PHP', currencyDisplay: 'code', maximumFractionDigits: 1 }) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toLocaleString(locale, { style: 'currency', currency: 'PHP', currencyDisplay: 'code', maximumFractionDigits: 2 }) + 'K';
    } else {
      return value.toLocaleString(locale, { style: 'currency', currency: 'PHP', currencyDisplay: 'code', maximumFractionDigits: 2 });
    }
  };