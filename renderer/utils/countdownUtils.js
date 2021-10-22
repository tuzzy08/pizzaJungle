import dayjs from 'dayjs';

function countdownUtil() {
	const timestamp = dayjs().minute(20);

	console.log(timestamp);
}

export default countdownUtil;
