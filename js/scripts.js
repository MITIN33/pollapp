// Empty JS for your own code to be here
$(function () {

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    var ques = [
        'My girlfriend is cheating shoudl i leave here ?',
        'Making girlfriend pregnant is right or not ?',
        'Should girl drive the car ?'
    ];

    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'states',
            source:substringMatcher(ques),
            templates: {
                empty: [
                    "<div ><a href='#' style='color:black;margin-left:5px;'>",
                    '  Could not find your question, then ask one.',
                    '</a></div>'
                ].join('\n'),
                suggestion: function (data) {
                    return "<div ><a href='#' style='color:black'>" + data + "</a></div>";
                }
            }
        }
    );
});