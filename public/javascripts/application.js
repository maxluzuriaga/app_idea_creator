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

function updateCount(upto) {
	var current = parseInt($("#ideas-count span").html());
	count(current, upto);
}

function count(current, upto) {
	if(current != upto) {
		var diff = (upto > current) ? 1 : -1;
		var delta = Math.abs(upto - current)
		var speed = Math.floor(3000/Math.pow(delta, 2));

		if (speed == 0) {
			current += Math.floor(diff * (delta / 1000) * 5);
		}

		$("#ideas-count span").html(current + diff);

		setTimeout(function(){
			count(current + diff, upto);
		}, speed);
	}
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
		}, 2000);
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