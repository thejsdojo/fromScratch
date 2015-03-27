//Globals
var slides, showMoreElements, lastSlide, currentSlide = 0;

function init () {
	slides = document.getElementById('slider').getElementsByTagName('li');
	showMoreElements = document.getElementsByClassName('showMoreElement');
	
	setInterval(function () {
		moveSlider();	
	}, 3000)
}

function showMore (element) {
	element.style.display = 'none';
	var nextElement = element.parentElement.getElementsByClassName('showMoreElement')[0];
	nextElement.style.maxHeight = '1000px';
	nextElement.style.height = 'auto';
	
	console.log(nextElement);
}

function moveSlider () {
	slides[currentSlide].style.zIndex = '3'
	slides[currentSlide].style.transform = 'translate3d(-100%,0,0)'
	slides[currentSlide].style.webkitTransform = 'translate3d(-100%,0,0)'
	lastSlide = currentSlide;
	
	
	currentSlide++;
	
	if (currentSlide > slides.length-1) {
		currentSlide = 0;
	}
	

	slides[currentSlide].style.zIndex = '4'
	slides[currentSlide].style.transform = 'translate3d(0%,0,0)'
	slides[currentSlide].style.webkitTransform = 'translate3d(0%,0,0)'
	
	
	for (var x = 0; x < slides.length; x++) {
		if (x !== currentSlide && x !== lastSlide) {
			slides[x].style.zIndex = '2'
			slides[x].style.transform = 'translate3d(100%,0,0)';
			slides[x].style.webkitTransform = 'translate3d(100%,0,0)';
			
		}
	} 
}

function sendMessage () {
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				alert('your message was sent');
			} else {
				alert('your message was not sent', xmlhttp.status);
			}
		}
	}
	
	var personName = document.getElementById('name').value;
	var personEmail = document.getElementById('email').value;
	var personMessage = document.getElementById('message').value;
	
	var sendData = JSON.stringify({
	    "key": "---",
	    "message": {
	        "text": personMessage,
	        "subject": "Message from Website",
	        "from_email": personEmail,
	        "from_name": personName,
	        "to": [
	            {
	                "email": "matt@thejsdojo.com",
	                "name": "Matthew",
	                "type": "to"
	            }
	        ]
	    }
	});
	
	xmlhttp.open('POST','https://mandrillapp.com/api/1.0/messages/send.json',true);
	xmlhttp.send(sendData);
	
}


