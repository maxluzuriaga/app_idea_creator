$(function() {
	setInterval(function() {
		$.ajax({
			url: "/count",
			type: "GET",
			error: function(xhr, textStatus, error) {
				console.log(error);
			}			
		});
	}, 3000);

	$("form").submit(function(e) {
		var formData = $(this).serializeArray(),
			formURL = $(this).attr("action"),
			method = $(this).attr("method").toUpperCase();

		$.ajax({
			url: formURL,
			type: method,
			data: formData,
			error: function(xhr, textStatus, error) {
				console.log(error);
			}
		});

		e.preventDefault();
	});
});