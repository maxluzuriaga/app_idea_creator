$("form").submit(function(e) {
	var formData = $(this).serializeArray(),
		formURL = $(this).attr("action"),
		method = $(this).attr("method").toUpperCase();

	$.ajax({
		url: formURL,
		type: method,
		data: formData,
		error: function(xhr, textStatus, error) {
			alert(error);
		}
	});

	e.preventDefault();
});