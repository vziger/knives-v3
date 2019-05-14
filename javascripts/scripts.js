jQuery(document).ready(function() {
    jQuery('#email_form form').submit(function(returnValue) {
        var mail = jQuery("#input_mail").val();
        var http = new XMLHttpRequest();
        var url = "https://script.google.com/macros/s/AKfycbyiy3NvBKgYMSAuQm1ynrlgjUZK21mLN0QXiKbOqS8Qhp_pX3-B/exec";
        var params = "p1=" + mail;
        http.open("GET", url+"?"+params, true);
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            }
        }
        http.send(null);
    });
});
