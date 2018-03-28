import $ from 'jquery';

/** Test POST request */
function testPost() {
    $.post('http://localhost:3000/sis/name', {rin: 'rin_goes_here', pass: 'password_goes_here'}, (data) => alert(data));
}

$(testPost);
