function listenForDelete() {
	$(".delete").click(function() {
		$.ajax({
			type: "POST",
			url: $(this).attr("href"),
			error: function(xhr, textStatus, error) {
				console.log(error);
			}
		});
		return false;
	});
}

$(function() {
	if ($("#ideas-count").length) {
		setInterval(function() {
			$.ajax({
				url: "/count",
				type: "GET",
				error: function(xhr, textStatus, error) {
					console.log(error);
				}			
			});
		}, 3000);
	}

	if ($("#ideas-list").length) {
		setInterval(function() {
			$.ajax({
				url: "/update_ideas",
				type: "GET",
				success: function() {
					listenForDelete();
				},
				error: function(xhr, textStatus, error) {
					console.log(error);
				}			
			});
		}, 3000);
	}

	$("#ideaform").submit(function(e) {
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

	listenForDelete();
});