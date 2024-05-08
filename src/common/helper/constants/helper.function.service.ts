import ms from 'ms';

export function seconds(msValue: string): number {
  return ms(msValue) / 1000;
}

export function transformToObject(values: string[]) {
  const obj = values.reduce((acc, value, index) => {
    acc[`url_cert_${index}`] = value;
    return acc;
  }, {});
  return obj;
}
