// $(document).ready(function() {
// 	$("#enquiryForm").submit(e => {
// 		e.preventDefault();
// 		const enquiryForm = $("#enquiryForm");
// 		const enquiryResponse = $("#enquiryResponse");
// 		const formData = new FormData(enquiryForm);
// 		fetch(enquiryForm.action, { method: enquiryForm.method, body: formData })
// 			.then(res => {
// 				console.log(`------firstthen------`);
// 				res.json();
// 			})
// 			.then(data => {
// 				console.log(data);
// 				// enquiryResponse.text(data.bookingResponse);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 				// enquiryResponse.css(color, "red").text(err);
// 			});
// 	});
// });
