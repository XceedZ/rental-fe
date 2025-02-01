import moment from 'moment';

moment.updateLocale('id', {
  months: [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ],
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ],
  weekdays: [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ],
  weekdaysShort: [
    'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'
  ],
  weekdaysMin: [
    'Mi', 'Se', 'Sa', 'Ra', 'Ka', 'Ju', 'Sa'
  ]
});

export function YYYYMMDDHH24SS(date) {
  return moment(date).format('YYYYMMDDHHmmss');
}

export function YYYYMMDD(date) {
  return moment(date).format('YYYYMMDD');
}

export function calculateDuration(startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, 'days') + 1;
}

export function YYYYMMDDtoDDMMYYYY(date) {
  return moment(date, 'YYYYMMDD').format('DD/MM/YYYY');
}

export function YYYYMMDDtoDMMMYYYY(date) {
  return moment(date, 'YYYYMMDD').format('D MMM YYYY');
}

export function YYYYMMDDtoYYYYMMDDHHMMSS(date) {
  return moment(date, 'YYYYMMDD').format('YYYY-MM-DD HH:mm:ss');
}

export function YYYYMMDDtoDMMMMYYYY(date) {
  return moment(date, 'YYYYMMDD').format('D MMMM YYYY');
}

export function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => {
    const days = calculateDuration(item.startDate, item.endDate);
    return total + Number(item.price) * item.qty * days;
  }, 0);
}