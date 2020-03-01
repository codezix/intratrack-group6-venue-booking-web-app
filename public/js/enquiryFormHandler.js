$(document).ready(() => {
  const enquiryForm = $(".enquiryForm");
  const enquiryResponse = $(".enquiryForm .enquiryResponse");

  enquiryForm.submit(e => {
    e.preventDefault();
    const formData = new FormData(this);
    fetch(enquiryForm.action, { method: enquiryForm.method, body: formData })
      .then(res => {
        res.json();
      })
      .then(data => {
        console.log(data.enquiryResponse);
        // enquiryResponse.text(data.enquiryResponse);
      })
      .catch(err => {
        console.log(err);
        // enquiryResponse.css(color, "red").text(err);
      });
  });
});
