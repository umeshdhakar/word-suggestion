$(function () {
    var res = [];
    var out = "";

    function compare(n1, n2, lo, le) {
        var flag = 1;
        for (var i = 0; i <= le; ++i) {
            if (i == lo) continue;
            if (n1[i] != n2[i]) flag = 0;
        }
        return flag;
    }

    function add(word) {
        var j, f = 0;
        for (j = 0; j < res.length + 1; ++j) {
            if (res[j] != word) f = 1;
            else return;
        }
        if (f) {
            res.push(word);
            out += '<li id="item">' + word + '</li>';
        }
    }

    function set(word) {
        var str = $('#in').val();
        var lastIndex = str.lastIndexOf(" ");
        str = str.substring(0, lastIndex);
        str += " " + word.text();
        if (str.charAt(0) == ' ') str = str.substr(1);
        $('#in').val(str);
    }

    var liSelected;
    $('#in').on("keydown", function (e) {
        var li = $('li');
        if (e.which === 40) {
            if (liSelected) {
                liSelected.removeClass('selected');
                next = liSelected.next();
                if (next.length > 0) {
                    liSelected = next.addClass('selected');
                    set(liSelected);
                } else {
                    liSelected = li.eq(0).addClass('selected');
                    set(liSelected);
                }
            } else {
                liSelected = li.eq(0).addClass('selected');
                set(liSelected);
            }
        } else if (e.which === 38) {
            if (liSelected) {
                liSelected.removeClass('selected');
                next = liSelected.prev();
                if (next.length > 0) {
                    liSelected = next.addClass('selected');
                    set(liSelected);
                } else {
                    liSelected = li.last().addClass('selected');
                    set(liSelected);
                }
            } else {
                liSelected = li.last().addClass('selected');
                set(liSelected);
            }
        } else {
            var flag = 0,
                len = 0;
            var input = $('#in').val();
            var input = input.match(/\w+$/)[0];
            for (var i = 0; i < w.length; ++i) {
                if (w[i] == input) flag = 1;
            }
            if (!flag) {
                len = input.length - 1;
                for (var loc = len; loc >= 0; --loc) {
                    for (c = 0; c < w.length; ++c) {
                        if (compare(input, w[c], loc, len)) {
                            add(w[c]);
                        }
                    }
                }
            }
            $('#list').html(out);
            res = [];
            out = "";
        }
    });
    $('#in').focusin(function () {
        $("#in").after(" <ul id='list'></ul>");
    });
    $('#in').focusout(function () {
        $('#list').remove();
    });
});