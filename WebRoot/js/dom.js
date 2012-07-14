

var markerCache = {};
function getSpan(marker) {
	if (markerCache[marker] == null) {
		markerCache[marker] = createSpan();
		markerCache[marker].className = 'marker'
		console.log('creating span');
	}
	else 
		console.log('found cached span...');
	return markerCache[marker];
}


function createSpan() {
	var s = document.createElement('span');
	return s;
}

function setVisible(el, isVisible) {
	el.style.visibility = isVisible;
}