$(document).ready(function () {
    console.log("On ready");

    function getTags() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/tags",
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    }

    setInterval(getTags, 1000);
    getTags();
});