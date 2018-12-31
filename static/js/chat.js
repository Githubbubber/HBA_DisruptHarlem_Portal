$(document).ready(function() {
	var socket = io.connect('http://127.0.0.1:5000');
	var counter = 0;

	socket.on('connect', function() {
		if (counter === 0) {
			socket.send('User has connected');
		}
	});

	socket.on('message', function(msg) {
		$('#messages').append('<li>' + msg + '</li>');
	});

	$('#sendbutton').on('click', function(e) {
		e.preventDefault();
		var sayWhat = $('#myMessage').val();
		socket.send(sayWhat);
		$('#myMessage').val('');
	});
});