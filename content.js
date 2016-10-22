/*https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName
Select all HTML elements in the webpage.
*/
var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

//For each element consider all of its childern (node).

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
/*//https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
If the child is text
*/
        if (node.nodeType === 3) {
            
            var text = node.nodeValue;
            var replacedText = text.replace(/ugly/gi, 'pretty');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
