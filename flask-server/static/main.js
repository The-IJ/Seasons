
$(document).ready(function () { //waits till doc loads
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,  //store copies to access easily
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

});

/*
document.addEventListener('DOMContentLoaded', function () {
  // Init
  document.querySelector('.image-section').style.display = 'none';
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('#result').style.display = 'none';

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('#imagePreview').style.backgroundImage = 'url(' + e.target.result + ')';
        document.querySelector('#imagePreview').style.display = 'none';
        document.querySelector('#imagePreview').style.fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  document.querySelector("#imageUpload").addEventListener('change', function () {
    document.querySelector('.image-section').style.display = 'block';
    document.querySelector('#btn-predict').style.display = 'block';
    document.querySelector('#result').textContent = '';
    document.querySelector('#result').style.display = 'none';
    readURL(this);
  });

  // Predict
  document.querySelector('#btn-predict').addEventListener('click', function () {
    var form_data = new FormData(document.querySelector('#upload-file')[0]);

    // Show loading animation
    document.querySelector(this).style.display = 'none';
    document.querySelector('.loader').style.display = 'block';

    // Make prediction by calling api /predict
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/predict', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Get and display the result
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('#result').style.display = 'block';
        document.querySelector('#result').textContent = ' Result:  ' + xhr.responseText;
        console.log('Success!');
      }
    };
    xhr.send(form_data);
  });
});
*/

