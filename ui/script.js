$(document).ready(function () {
    function getTags() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8011/tags",
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    }

    setInterval(getTags, 1000);
    getTags();
});