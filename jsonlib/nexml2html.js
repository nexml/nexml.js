function nexml2html(json) {
	var NeXMLNameSpaceSeparator = ':';
	var doc = new NeXML.Document(json);
	
	// dublin core
	var title   = doc.getMetaObject('dc:title');
	var journal = doc.getMetaObject('dc:publisher');
	var authors = doc.getMetaObjectArray('dc:contributor');
	
	// prism
	var year   = doc.getMetaObject('prism:publicationDate');	
	var volume = doc.getMetaObject('prism:volume');
	var issue  = doc.getMetaObject('prism:number');
	var doi    = doc.getMetaObject('prism:doi');
	var start  = doc.getMetaObject('prism:startingPage');
	var end    = doc.getMetaObject('prism:endingPage');
	document.title = title;
	
	document.write('<span class="contributor">'+authors.join(', ')+'</span> ');
	document.write('<span class="year">'+year+'.</span> ');
	document.write('<span class="title">'+title+'</span> ');
	document.write('<span class="journal">'+journal+'. </span> ');
	document.write('<span class="volume">'+volume+'</span>');
	document.write('<span class="issue">('+issue+'):</span> ');
	document.write('<span class="pagerange">'+start+'-'+end+'</span> ');
	document.write('<span class="doi">[doi:<a href="http://dx.doi.org/'+doi+'">'+doi+'</a>]</span>');
	
	
}