var stripe = Stripe('pk_test_huujno2o9Y3e4HZZr3fFaUDN');
var elements = stripe.elements();

var $form = $('#check-out-form');
$form.submit(function(event){

    $form.find('button').prop('disabled',true);
    

});