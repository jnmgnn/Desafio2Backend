import ProductManager from './ProductManager.js';
import Product from './Product.js';

const productManager = new ProductManager('./productos.json');
console.log(productManager.path)

const producto1 = new Product('Hello Kitty', 'Peluche', 2500, '', 'HK01', []);
const producto2 = new Product('Cinamorrol', 'Peluche', 2000, '', 'CR01', []);
const producto3 = new Product('Pochacco', 'Peluche', 1500, '', 'PC01', []);
const producto4 = new Product('Pompompurin', 'Peluche', 1800, '', 'PP01', []);
const productos = [
    {
        title: 'Hello Kitty', 
        description: 'Peluche', 
        price: 2500, 
        thumbnail:'', 
        code:'HK01', 
        stock:[]
    },
    {
        title: 'Cinamorrol', 
        description: 'Peluche', 
        price: 2000, 
        thumbnail:'', 
        code:'CR01', 
        stock:[]
    },
    {
        title: 'Hello Kitty', 
        description: 'Peluche', 
        price: 2500, 
        thumbnail:'', 
        code:'HK01', 
        stock:[]
    },
    {
        title: 'Hello Kitty', 
        description: 'Peluche', 
        price: 2500, 
        thumbnail:'', 
        code:'HK01', 
        stock:[]
    },
    {
        title: 'Keroppi', 
        description: 'Peluche', 
        price: 1400, 
        thumbnail:'', 
        code:'KP01', 
        stock:[]
    }
]

productManager.initialize(); // Corrected method name

// Llamamos los productos con GET
productManager.getProducts();

// Añadimos los productos con addProduct
productos.forEach(prod => productManager.addProduct(prod))

productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);

// Los actualizamos reemplazando un prod
productManager.updateProd(3, { title: 'My Melody', description: 'Peluche', price: 2300, thumbnail: '', code: 'MM01', stock: 110 });

// Borramos productos
productManager.deleteProd(4);

setTimeout(async () => {
    await productManager.getProducts(); // Added "await" to ensure proper timing
}, 2000);

productManager.getProdById(2);
productManager.getProdById(3);