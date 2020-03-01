$(document).ready(() => {
	const bookingForm = $(".bookingForm");
	const bookingResponse = $(".bookingForm .bookingResponse");

	bookingForm.submit(e => {
		e.preventDefault();
		const formData = new FormData(this);
		fetch(bookingForm.action, { method: bookingForm.method, body: formData })
			.then(res => {
				res.json();
			})
			.then(data => {
				console.log(data.bookingResponse);
				// bookingResponse.text(data.bookingResponse);
			})
			.catch(err => {
				console.log(err);
				// bookingResponse.css(color, "red").text(err);
			});
	});
});
