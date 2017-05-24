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
            source: substringMatcher(ques),
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

    //------------------------Code from index page-----------------------------------------

    var previousComment = '';

    $('.comment-toggle').click(function () {
        var div = $(this).closest('.question-area').find('.carousel-inner');
        div.toggle();
    });


    //Modal Related Script
    $('#add-option').click(function () {
        var op = $(this).closest('.form-group').find('input').val();
        var div = $('#option-gen-list').append(
            "<li><div class='input-group form-group margin-bottom-sm'> <input disabled class='form-control' name='OptionsList' type='text' placeholder='Option' value='" + op + "' ><span id='add-option' class='input-group-addon'><i id='close-btn' class='fa fa-close' aria-hidden='true'></i></span></div></li>"
        );
    });

    $(".modal").on("hidden.bs.modal", function () {
        $("#ques").html("");
        $("#desc").html("");
        $("#option-gen-list").html("");
    });


    $("#option-gen-list").on("click", "i.fa-close", function () {
        $(this).closest('li').remove();
    });


    //--Comment Edit Save login----

    $('.q-side-text').on('click', '.fa-edit', (function () {

        var cmt = $(this).closest('.comment-text-area').find('span').first().html();
        var parentDiv = $(this).closest('.comment-text-area');
        previousComment = $(this).closest('.comment-text-area').html();
        parentDiv.find('.text-area').hide();

        var htmlcontent = [
            "<div class='edit-comment'>",
            "<textarea type='text' name='' class='comment-box' rows='1' placeholder='comment'>" + cmt + "</textarea>",
            "<div class='q-side-text'>",
            "<div id='cancelBtn' class='anchor cancel-comment'> Cancel</div>",
            "<div class='anchor save-comment'> Save</div>",
            "</div>",
            "</div>"
        ].join('\n');

        $(this).closest('.comment-text-area').append(htmlcontent);

        console.log(parentDiv);

        parentDiv.on('click', '.cancel-comment', function () {
            parentDiv.find('.edit-comment').remove();
            parentDiv.find('.text-area').show();
        });


        parentDiv.on('click', '.save-comment', function () {
            var textareactrl = parentDiv.find('.edit-comment').find('textarea');
            var newCmt = textareactrl.val();
            console.log(newCmt);
            parentDiv.find('.edit-comment').remove();
            parentDiv.find('.text-area').show();
            parentDiv.find('.text-area').find('span').first().html(newCmt);

        });

    }));

    $('.q-side-text').on('click', '.fa-close', (function () {
        $(this).closest('li').remove();
    }));



    //-------Save new comment Logic---------

    $('.save-comment').click(function (e) {

        var comment = $(this).closest('.comment-text-area').find('.comment-box').val();
        if (comment == "") return;
        $(this).closest('.comment-area').find('.comments-list').prepend("<li>"
            + "<div class='media'>"
            + "<a href=''><img class='d-flex align-self-start mr-3 comment-thumnbnail-img' src='pp.png' alt='Abhishek'></a>"
            + "<div class='comment-text-area'>"
            + "		<strong>Mitin</strong> " + comment
            + "    	<div class='q-side-text'>13 hr</div>"
            + "</div>"
            + "</div></li>");
        $(this).closest('.comment-text-area').find('.comment-box').val("")
        // save the comment to the this quesion 
    });

    $('.comment-box').keypress(function (e) {
        if (e.keyCode == 13) {
            var cmt = $(this).val();
            if (cmt == "") return;

            $(this).closest('.comment-area').find('.comments-list').prepend("<li>"
                + "<div class='media'>"
                + "<a href=''><img class='d-flex align-self-start mr-3 comment-thumnbnail-img' src='pp.png' alt='Abhishek'></a>"
                + "<div class='comment-text-area'>"
                + "		<strong>Mitin</strong> " + cmt
                + "    	<div class='q-side-text'>13 hr</div>"
                + "</div>"
                + "</div></li>");
            $(this).val("");
        }
    });




    $('#likeBtn').click(function () {
        if ($(this).text() == 'Like') {
            $('#likeBtn').html('Unlike');
        }
        else {
            $(this).html('Like');
        }
    });

    $('#reg').click(function () {

        var formdata = JSON.stringify($('#questionform').serializeArray());
        formdata = JSON.parse(formdata);
        var data = {};
        $.each(formdata, function (index, element) {
            data[element.name] = element.value;
        });

        console.log(data);


    });


    //********************** Submit quettion call*********************/

    $('.modal').on('click', '#submitForm', function () {

        var formdata = JSON.stringify($('#questionForm').serializeArray());
        formdata = JSON.parse(formdata);
        var data = {};
        $.each(formdata, function (index, element) {
            data[element.name] = element.value;
        });

        var options = [];

        $('#option-gen-list li').each(function (i, o) {
            options.push($(this).find('input').val());
        });

        data['OptionsList'] = options;

        console.log(data);
        $.post("http://localhost:5408/api/Question/Create", data,
            function (data, textStatus, jqXHR) {
                console.log('success create question');
            }
        );

    });


    // Profile page script //////////

    $('#navId a').click(function () {
        $(this).tab('show');
    });



    /***********   OTPION CLICKED */

    $('.option .input-group-addon').click(function () {

        //TO DO ITEM TO UPDATE THE OPTIONS

        var url = "";
        var optionId = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: url,
            data: { "id": optionId },
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });

        var plusBtn = $(this).closest('.option').find('.input-group-addon');
        $(this).closest('.options-list').find('.input-group-addon').removeClass('option-clicked');
        plusBtn.addClass('option-clicked');

    });



});