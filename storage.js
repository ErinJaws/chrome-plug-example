//Way 2
var dictionary = { bad: 'good', worse: 'better', awful: 'wonderful'},
      regexp = RegExp ('\\b(' + Object.keys (dictionary).join ('|') + ')\\b', 'g');

text = text.replace (regexp, function (_, word) { return dictionary[word]; });
                                                                                                     
//Way 3
content = replaceOnceUsingDictionary(dictionary, content, function(key, dictionary){
    return '_' + dictionary[key] + '_';
});


function replaceOnceUsingDictionary(dictionary, content, replacehandler) {
    if (typeof replacehandler != "function") {
        // Default replacehandler function.
        replacehandler = function(key, dictionary){
            return dictionary[key];
        }
    }

    var patterns = [], // \b is used to mark boundaries "foo" doesn't match food
        patternHash = {},
        oldkey, key, index = 0,
        output = [];
    for (key in dictionary) {
        // Case-insensitivity:
        key = (oldkey = key).toLowerCase();
        dictionary[key] = dictionary[oldkey];

        // Sanitize the key, and push it in the list
        patterns.push('\\b(?:' + key.replace(/([[^$.|?*+(){}])/g, '\\$1') + ')\\b');

        // Add entry to hash variable, for an optimized backtracking at the next loop
        patternHash[key] = index++;
    }
    var pattern = new RegExp(patterns.join('|'), 'gi'),
        lastIndex = 0;

    // We should actually test using !== null, but for foolproofness,
    //  we also reject empty strings
    while (key = pattern.exec(content)) {
        // Case-insensitivity
        key = key[0].toLowerCase();

        // Add to output buffer
        output.push(content.substring(lastIndex, pattern.lastIndex - key.length));
        // The next line is the actual replacement method
        output.push(replacehandler(key, dictionary));

        // Update lastIndex variable
        lastIndex = pattern.lastIndex;

        // Don't match again by removing the matched word, create new pattern
        patterns[patternHash[key]] = '^';
        pattern = new RegExp(patterns.join('|'), 'gi');

        // IMPORTANT: Update lastIndex property. Otherwise, enjoy an infinite loop
        pattern.lastIndex = lastIndex;
    }
    output.push(content.substring(lastIndex, content.length));
    return output.join('');
}
