var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
var imageObj = new Image();

// adding an image via url box
function addImage(e) {
	var imgUrl = $("#imgUrl").val();
	if (imgUrl.length) {
		imageObj.src = imgUrl;
	}
	e.preventDefault();
}


function download(dataURL){
    $("#imgToSave").val(dataURL);
    document.location.href = dataURL;
}

imageObj.src = 'image/puppies.jpg';
imageObj.onload = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height );
    
    var width = imageObj.naturalWidth;
    var height = imageObj.naturalHeight;
      
    var wrh = imageObj.width / imageObj.height;
            var newWidth = canvas.width;
            var newHeight = newWidth / wrh;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * wrh;
            }
    ctx.drawImage(imageObj,0,0, newWidth , newHeight);
};

// editing image via filter properties
function editImage() {
	var gs = $("#gs").val(); // grayscale
	var blur = $("#blur").val(); // blur
	var br = $("#br").val(); // brightness
	var ct = $("#ct").val(); // contrast
	var huer = $("#huer").val(); //hue-rotate
	var opacity = $("#opacity").val(); //opacity
	var invert = $("#invert").val(); //invert
	var saturate = $("#saturate").val(); //saturate
	var sepia = $("#sepia").val(); //sepia

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter ='grayscale(' + gs+
                             '%) blur(' + blur +
                             'px) brightness(' + br +
                             '%) contrast(' + ct +
                             '%) hue-rotate(' + huer +
                             'deg) opacity(' + opacity +
                             '%) invert(' + invert +
                             '%) saturate(' + saturate +
                             '%) sepia(' + sepia + '%)';
   
    ctx.drawImage(imageObj, 0, 0, canvas.width, imageObj.height * (canvas.width/imageObj.width));
}


//When sliders change image will be updated via editImage() function
$("input[type=range]").change(editImage).mousemove(editImage);

// Reset sliders back to their original values on press of 'reset'
$('#imageEditor').on('reset', function () {
	setTimeout(function() {
		editImage();
	},0);
});


//on pressing return, addImage() will be called
$("#urlBox").submit(addImage);

//on uploading file
$('#file').on('change', function(ev) {
    var f = ev.target.files[0];
    var fr = new FileReader();
    
    fr.onload = function(ev2) {
        imageObj.src = ev2.target.result;
    };
    
    fr.readAsDataURL(f);
});

//save image
$('.save').on('click', function(e){
    //e.preventDefault(); 
    var image;
    var type = $(this).data('type');
    switch(type){
        case 'png': 
            image = canvas.toDataURL("image/png");
            break;
        case 'jpg': 
            image = canvas.toDataURL("image/jpeg");
            break;
        case 'gif': 
            image = canvas.toDataURL("image/gif");
            break;
    }
    this.href = image;
    this.download = 'test.' + type;
});
