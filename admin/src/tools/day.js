import dayjs from 'dayjs';

const day = {
  getDate(date) {
    return dayjs(date).format('YYYY年MM月DD日');
  },
};

export default day;
