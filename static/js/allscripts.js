$( ".select-tree" ).selectmenu({
    icons: {
        button: "glyphicon glyphicon-tree-conifer"
    }
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
theDate = new Date(), 			
today = months[theDate.getMonth()] + " " + theDate.getDate() + ", " + theDate.getFullYear();
			
$(".currently").text(today);