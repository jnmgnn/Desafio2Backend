// Creamos la clase Producto
export default class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.id(); // Utilizamos el método estático para obtener el ID
    }

    static id() { // Método estático para poder incrementar el ID
        !Product.idSuma ? (Product.idSuma = 1) : Product.idSuma++;
        return Product.idSuma;
    }
}