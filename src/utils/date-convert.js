import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export function YYYYMMDDHH24SS(date) {
  return moment(date).locale('id').format('YYYYMMDDHHmmss');
}

export function YYYYMMDD(date) {
  return moment(date).locale('id').format('YYYYMMDD');
}

export function calculateDuration(startDate, endDate) {
  const start = moment(startDate).locale('id');
  const end = moment(endDate).locale('id');
  return end.diff(start, 'days') + 1;
}

export function YYYYMMDDtoDDMMYYYY(date) {
  return moment(date, 'YYYYMMDD').locale('id').format('DD/MM/YYYY');
}

export function YYYYMMDDtoDMMMYYYY(date) {
  return moment(date, 'YYYYMMDD').locale('id').format('D MMM YYYY');
}

export function YYYYMMDDtoYYYYMMDDHHMMSS(date) {
  return moment(date, 'YYYYMMDD').locale('id').format('YYYY-MM-DD HH:mm:ss');
}

export function YYYYMMDDtoDMMMMYYYY(date) {
  return moment(date, 'YYYYMMDD').locale('id').format('D MMMM YYYY');
}