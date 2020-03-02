const e = require("express");

$(document).ready(() => {
	//fetch recent Enquiries
	fetch("enq/recentEnquiries")
		.then(res => res.json())
		.then(data => {
			console.log(data.recentEnquiries);
			// const enquiries = data.recentEnquiries;
			// enquiries.forEach(enquiry => {

			// });
		})
		.catch(err => console.log(err));

	//fetch all Enquiries
	fetch("enq/allEnquiries")
		.then((res = res.json()))
		.then(data => {
			console.log(data.allEnquiries);
			// const enquiries = data.allEnquiries;
			// enquiries.forEach(enquiry => {

			// 	<tr>
			// 	<td>enquiry.name</td>
			// 	<td>enquiry.email/td>
			// 	<td>enquiry.</td>
			// 	<td>enquiry.</td>
			// 	<td>
			// 		<button>enquiry.status</button>
			// 	</td>
			// </tr>
		})
		.catch(err => console.log(err));

	//fetch recent Bookings

	fetch("book/recentBookings")
		.then(res => res.json())
		.then(data => {
			console.log(data.recentBookings);
			// const bookings = data.recentBookings;
			// bookings.forEach(enquiry => {

			// });
		})
		.catch(err => console.log(err));

	//fetch all Bookings
	fetch("book/allBookings")
		.then(res => res.json())
		.then(data => {
			console.log(data.allBookings);
			// const bookings = data.recentBookings;
			// bookings.forEach(enquiry => {

			// });
		})
		.catch(err => console.log(err));
});
