/**
 * Formats a currency value with K, M, B notation
 * @param value - The number to format
 * @param prefix - Currency symbol prefix (default: '$')
 * @returns Formatted currency string 
 */
export function formatCurrency(value: number, prefix: string = '$'): string {
  if (value === undefined || value === null) return `${prefix}0`;
  
  // For small values, show more decimals
  if (value < 1) {
    const formatted = value.toFixed(6);
    return `${prefix}${parseFloat(formatted)}`;
  } else if (value < 10) {
    const formatted = value.toFixed(4);
    return `${prefix}${parseFloat(formatted)}`;
  }
  
  // For larger values use K, M, B notation
  if (value >= 1e9) {
    const formatted = (value / 1e9).toFixed(2);
    return `${prefix}${parseFloat(formatted)}B`;
  } else if (value >= 1e6) {
    const formatted = (value / 1e6).toFixed(2);
    return `${prefix}${parseFloat(formatted)}M`;
  } else if (value >= 1e3) {
    const formatted = (value / 1e3).toFixed(2);
    return `${prefix}${parseFloat(formatted)}k`;
  }
  
  // Default formatting
  return `${prefix}${value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Formats large numbers (non-currency) with K, M, B notation
 * @param value - The number to format 
 * @returns Formatted number string
 */
export function formatLargeNumber(value: number): string {
  if (value === undefined || value === null) return '0';
  
  if (value >= 1e9) {
    const formatted = (value / 1e9).toFixed(2);
    return `${parseFloat(formatted)}B`;
  } else if (value >= 1e6) {
    const formatted = (value / 1e6).toFixed(2);
    return `${parseFloat(formatted)}M`;
  } else if (value >= 1e3) {
    const formatted = (value / 1e3).toFixed(2);
    return `${parseFloat(formatted)}K`;
  }
  
  return value.toString();
}

/**
 * Formats a price value with appropriate decimal places based on value range
 * @param price - The price to format
 * @returns Formatted price string
 */
export function formatPrice(price?: number): string {
  if (price === undefined || price === null) return '0';
  
  // Format based on price range
  if (price < 0.01) {
    const formatted = price.toFixed(6);
    return parseFloat(formatted).toString();
  } else if (price < 1) {
    const formatted = price.toFixed(4);
    return parseFloat(formatted).toString();
  } else {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}
