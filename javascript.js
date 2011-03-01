$(document).ready(function() {
	$("div.panel_button").click(function(){
		$("div#panel").animate({
			height: "500px"
		})
		.animate({
			height: "400px"
		}, "fast");
		$("div.panel_button").toggle();
	
	});	
	
   $("div#hide_button").click(function(){
		$("div#panel").animate({
			height: "0px"
		}, "fast");
		
	
   });	


	var draggable_options = {
		snapMode: "inner",
		containment: ".taskTable"
	};
	$('a[draggable="true"]').draggable(draggable_options);
	$('.column').droppable({ 
		drop: function(event, ui) {
			$('.help').fadeOut();
			$(ui.draggable).appendTo($(this)).css({top: "auto", left: "auto"});
		}
	}).hover(function() {
		$(this).children('.help').stop(true, true).fadeIn();
	}, function() {
		$(this).children('.help').stop(true, true).fadeOut();
	});



	$('#taskGen').submit(function(event) {
		event.preventDefault();
		var inputs = $('input[type="text"], input[type="date"], select');
		var html = '<dl>';
		for( var i = 0; i < inputs.length; i++) {
			var name_attr = inputs.eq(i).attr('name');
			var name = $('label[for='+name_attr+']').html();
			html = html + '<dt class="name">' + name + '</dt><dd class="value">' + inputs.eq(i).val() + "</dd>";
		}
		html = html + '</dl>';
		$('<a draggable="true">' + html + '</a>').appendTo($('.column:first-child')).draggable(draggable_options);
		$('.column').css({height: 'auto'});
		$('.column').css({ height: getMaxHeight() + 'px' });
		$('#hide_button').click();
		$('input[type="text"],input[type="date"]').val('');
		$('select option:first-child').attr('selected', 'selected');
		return false;
	});


});

function getMaxHeight() {
	var columns = $('.column');
	var maxHeight = 0;

	for (var i = 0 ; i < columns.length; i++) {
		if (columns.eq(i).height() > maxHeight) {
			maxHeight = columns.eq(i).height() + 50;
		}
	}
	return maxHeight;
	
}

/** start drag and drop js **/

