export const shorten = (value: number) => {
  if (value > 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }

  if (value > 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }

  if (value > 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }

  return `${value}`;
};

export const watts = (value: number) => {
  if (value > 1e12) {
    return `${(value / 1e12).toFixed(1)} TW`;
  }

  if (value > 1e9) {
    return `${(value / 1e9).toFixed(1)} GW`;
  }

  if (value > 1e6) {
    return `${(value / 1e6).toFixed(1)} MW`;
  }

  if (value > 1e3) {
    return `${(value / 1e3).toFixed(1)} kW`;
  }

  return `${value} W`;
};
