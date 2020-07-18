//FUNCTION 1 [Make image gray]
//Global varible
var image;
//var image2;
//Upload original image
function upload() {
    var fileinput = document.getElementById("pic");
    image = new SimpleImage(fileinput);
    var canvas = document.getElementById("c");
    image.drawTo(canvas);
}
//Make the image gray
function makeGray() {
    for (var pixel of image.values()) {
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("c2");
    image.drawTo(imgcanvas);
    addbtdownload();
}
//Make the image red
function makeRed() {
    for (var pixel of image.values()) {
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if (avg<128){
            pixel.setRed(2*avg);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen((2*avg)-255);
            pixel.setBlue((2*avg)-255); 
        }
    }
    var imgcanvas = document.getElementById("c2");
    image.drawTo(imgcanvas);
    addbtdownload();
}
//Make the image blue
//function makeBlue() {}
//add download button
function addbtdownload() {
    var dlGray = document.getElementById("downloadGrayImage");
    dlGray.innerHTML = '<button><a href="#" id="dlGrayBt" download="grayimage.jpg" onclick="downloadGrayImg(this)">Download image</a></button>';
}
//remove download button
function rmvbtdownload() {
    var dlGray = document.getElementById("downloadGrayImage");
    dlGray.innerHTML = '';
}
//download your image
function downloadGrayImg() {
    var grayImage = document.getElementById("c2").toDataURL("image/jpg");
    document.getElementById('dlGrayBt').href = grayImage;
    alert("Image has been downloaded successfully!")
}
//Erase canvas
function clearC() {
    var ctx = document.getElementById("c").getContext("2d");
    ctx.clearRect(0,0,image.getWidth(),image.getHeight());
    var ctx2 = document.getElementById("c2").getContext("2d");
    ctx2.clearRect(0,0,image.getWidth(),image.getHeight());
    rmvbtdownload();
}

//FUNCTION 2 [Replace black screen]
//Global varible
var fgimg = null;
var bgimg = null;
//Upload foreground image
function loadfg() {
    var fginput = document.getElementById("fg");
    fgimg = new SimpleImage(fginput);
    var fgcanvas = document.getElementById("fgcan");
    fgimg.drawTo(fgcanvas);
}
//Upload background image
function loadbg() {
    var bginput = document.getElementById("bg");
    bgimg = new SimpleImage(bginput);
    var bgcanvas = document.getElementById("bgcan");
    bgimg.drawTo(bgcanvas);
}
//Composite two images, replace black screen
function createCmp() {
    if (fgimg == null || !fgimg.complete()) {
        alert("Foreground image not loaded!");
        return;
    } 
    if (bgimg == null || !bgimg.complete()) {
        alert("Background image not loaded!");
        return;
    }
    if (fgimg.getWidth() > bgimg.getWidth()) {
        alert("Foreground image must have smaller size than background image! Please try again.");
        clearCvs()
    }
    var output = new SimpleImage(fgimg.getWidth(),fgimg.getHeight());
    for(var pixel of fgimg.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (pixel.getBlue()<10 && pixel.getRed()<10 && pixel.getGreen()<10) {
            var bgPixel = bgimg.getPixel(x,y);
            output.setPixel(x,y,bgPixel);
        } else {
            output.setPixel(x,y,pixel);
        }
    }
    var fgcanvas = document.getElementById("fgcan");
    output.drawTo(fgcanvas);
    hidecvs();
    addbt();
    //setTimeout(alert("Process complete!"), 6000); 
}
//hide extra canvas
function hidecvs() {
    var extracvs = document.getElementById("bgcan");
    extracvs.style.display = "none";
}
//reset canvas
function showcvs() {
    var extracvs = document.getElementById("bgcan");
    extracvs.style.display = "block";
}    
//add download button
function addbt() {
    var dlbt = document.getElementById("dlbt");
    dlbt.innerHTML = '<button><a href="#" id="btn-download" download="myimage.jpg" onclick="downloadImg(this)">Download your image</a></button>';
}
//remove download button
function rmvbt() {
    var dlbt = document.getElementById("dlbt");
    dlbt.innerHTML = '';
}
//download your image
function downloadImg() {
    var newImage = document.getElementById("fgcan").toDataURL("image/jpg");
    var button = document.getElementById('btn-download');
    button.href = newImage;
    alert("Image has been downloaded successfully!")
}
//Erase canvas
function clearCvs() {
    var ctx = document.getElementById("fgcan").getContext("2d");
    ctx.clearRect(0,0,fgimg.getWidth(),fgimg.getHeight());
    var ctx2 = document.getElementById("bgcan").getContext("2d");
    ctx2.clearRect(0,0,bgimg.getWidth(),bgimg.getHeight());
    rmvbt();
    showcvs();
}

