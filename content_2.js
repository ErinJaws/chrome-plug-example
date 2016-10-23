/*
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName
Select all HTML elements in the webpage.
*/
var elements = document.getElementsByClassName("comment-renderer-text-content");

for (var i = 0; i < elements.length; i++) {
    var text = elements[i].innerHTML;
    
    var replacedText = text.replace(/the/g,"tha");
    
    if (replacedText !== text) {
        console.log('replaced2');
        text = replacedText 
    }
}


