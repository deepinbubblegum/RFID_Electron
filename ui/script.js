$(document).ready(function () {
    var epc_box = $('#epc_box').text();
    var last_item = $('#last_item').text();
    var rssi_dBm = $('#rssi_dBm').text();
    var total_box = $('#total_box').text();

    function updateBox(data) {
        data.forEach(element => {
            epc_box == element.EPC ? null : $('#epc_box').text(element.EPC);
            last_item == element.Name ? null : $('#last_item').text(element.Name);
            rssi_dBm == element.RSSI ? null : $('#rssi_dBm').text(element.RSSI);
            epc_box = $('#epc_box').text();
            last_item = $('#last_item').text();
            rssi_dBm = $('#rssi_dBm').text();
        });
        total_box == data.length ? null : $('#total_box').text(data.length);
        total_box = $('#total_box').text();
    }

    function updateTable(array) {
        let counting_data = 0;
        $('#table_body').empty();
        array.forEach(element => {
            counting_data++;
            let row = '<tr><th>'+ counting_data +'</th> <td>' + element.EPC + '</td><td>' + element.Name + '</td><td>' + element.RSSI + '</td></tr>';
            $('#table_body').append(row);
        });
    }

    function getTags() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8011/tags",
            dataType: "json",
            success: function (response) {
                updateBox(response);
                updateTable(response);
            }
        });
    }

    setInterval(getTags, 500);
    getTags();
});