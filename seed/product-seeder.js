var Product = require("../models/product");
var mongoose = require("mongoose");
mongoose.connect("mongodb://Sommycart:Som801886@ds235022.mlab.com:35022/shopping", { useNewUrlParser: true });
var products = [
    new Product({
    imagepath:'https://i2.wp.com/www.shinyshiny.tv/AKG%20K242%20HD.jpeg?resize=200%2C200&ssl=1',
    title: 'Apple Watch Series 3 | Verizon Wireless',
    description:'Stay connected away from your phone.',
    price:'4999'
}),
new Product({
    imagepath:'https://ss7.vzw.com/is/image/VerizonWireless/pdp-kf-d-apple-watch-series-3-section-1-connected?$pngalpha$&scl=2',
    title: '',
    description:'',
    price:'999'
}),
new Product({
    imagepath:'https://a.scdn.gr/images/sku_main_images/010259/10259819/20161031162846_apple_macbook_pro_13_3_2_9ghz_i5_8gb_256gb_with_touch_bar_id_2016.jpeg',
    title: 'Apple MacBook Pro 13.3" 2.9GHz (i5',
    description:'Βρες τιμές καταστημάτων για το Apple MacBook Pro 13.3" 2.9GHz (i5/8GB/256GB) with Touch Bar (2016). Διάβασε απόψεις χρηστών και τεχνικά...',
    price:'299999'
}),
new Product({
    imagepath:'https://images-na.ssl-images-amazon.com/images/I/41WaLn-TBzL.jpg',
    title: 'Xiaomi Mi A1. Diagonal de la pantalla: 14 cm (5.5"), Resolución de la pantalla: 1920 x 1080 Pixeles, Tipo de visualizador: LTPS. Frecuencia del procesador: 2 GHz, Familia de procesador: Qualcomm...',
    description:'',
    price:'10999'
}),
new Product({
    imagepath:'https://images-na.ssl-images-amazon.com/images/I/51b%2BPNsVbyL._SX403_BO1,204,203,200_.jpg',
    title: 'Digital Video and HD, Second Editio',
    description:'Digital Video and HD, Second Edition: Algorithms and Interfaces (The Morgan Kaufmann Series in Computer Graphics) 2nd Edition',
    price:'99'
}),
new Product({
    imagepath:'https://cdn.shopclues.com/images/thumbnails/79884/320/320/1247346021620Led20Square2020Image202011502276394.jpg',
    title: 'Buy Transformer 1Pcs 16 Led 48w Proje',
    description:'Transformer 1Pcs 16 Led 48w Projector Auxiliary Work Bar Fog Lights Lamps Spot Beam Drl For KTM Duke 200',
    price:'989'
}),
];
var done=0;
for(var i =0; i<products.length;i++)
{
    products[i].save((res,err)=>{
        done++;
        if(done===products.length)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
}













