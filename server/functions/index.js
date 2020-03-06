const getHr = hour => {
	const hr = parseInt(hour.slice(0, 2));
	if (hr == 0) {
		return 1440;
	}
	return hr * 60;
};

const getMin = minute => {
	const min = parseInt(minute.slice(3));
	return min;
};

const getTime = Time => {
	const minutes = getHr(Time) + getMin(Time);
	return minutes;
};

module.exports = { getTime };
