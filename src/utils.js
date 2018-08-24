import type from 'of-type';

export function isPositiveInteger(value){
  return type(value, Number) && value >= 1 && Math.round(value) === value && value !== Infinity;
}

export function isNumericalValue(value) {
  return !Number.isNaN(value) && value !== Infinity && value !== -Infinity;
}