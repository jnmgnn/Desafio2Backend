import fs from 'fs'
import constants from 'constants'

  //Creamos la class Product Manager
export default class ProductManager {
  constructor(path){
      this.products = [];
      this.path = path;
  }

  
  async getProducts(){
      return this.products
  }

  
  async ensureFileExists() {
    try {
        await fs.access(this.path, constants.F_OK, (err) => {
          console.log('\n> Pidiendo permiso para leer este archivo');
          if (err)
            console.error('No se puede acceder a este archivo');
          else
            console.log('Accediendo al archivo');
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(this.path, '[]');
        } else {
            console.log('Error: ', error);
        }
    }
  }

      //Crea archivo con el array de products y luego lo hace string
      async writeProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products), (err) => {
          if (err)
            console.log(err);
          else {
            console.log("Archivo creado exitosamente!\n");
          }
        });
    }
  

  //Crea variable para almacenar la lectura del archivo y lo devuelve
    async readProducts() {
      try {
        const fileContent = await fs.readFile(this.path, "utf-8");
        return JSON.parse(fileContent);
      } catch (error) {
        return [];
      }
    }
  

  async addProduct(product) {
    try {
      const prodById = this.products.find((prod) => prod.id === product.id); //Creamos una variable qu busque products por ID

      if (prodById) {
        console.log(`El producto ${prodById.title} ya existe.`); //Si coincide el ID con otro producto, ya existe.
        //Sumamos el stock
        prodById.stock += product.stock;
        console.log(
          `Nuevo stock ${prodById.stock} del producto ${prodById.title}`
        );
      } else {
        this.products.push(product); //Si no coincide, agregamos el producto al array
        console.log(`${product.title} agregado exitosamente`);
      }

      
      await this.writeProducts(this.products);
    } catch (error) {
      if (error.code === "ENOENT") { //Si el code coincide con ERROR NO ENTRY
        console.log(
          `El archivo ${this.path} no existe. Creando archivo y agregando el producto ${product.title}` 
        );

        await this.writeProducts([product]);
        console.log(
          `Se ha creado el archivo ${this.path} y se agregó el producto ${product.title}` //Crea archivo y agrega producto
        );
      } else {
        console.log("Error: ", error);
      }
    }
  }



  async getProdById(id) {
    const prodById = this.products.find((prod) => prod.id === id);
    prodById ? console.log(prodById) : console.log("No se ha encontrado el producto :(");
  }

  async deleteProd(id) {
    const prodById = this.products.find((prod) => prod.id === id);

    if (prodById) {
      await this.writeProducts(this.products.filter((prod) => prod.id !== id));

      console.log(
        `El producto ${prodById.title} fue eliminado correctamente`
      );
    } else {
      console.log("Producto no encontrado");
    }
  }

  

  async updateProd(id, product) {
    const index = this.products.findIndex((prod) => prod.id === id); //Usamos findIndex para compararlo con el ID del producto del array
    
    if (index !== -1) {
      this.products[index].title = product.title;
      this.products[index].description = product.description;
      this.products[index].price = product.price;
      this.products[index].code = product.code;
      this.products[index].stock = product.stock;
    
      await this.writeProducts(this.products);
    } else {
      console.log("Producto no encontrado");
    }
  }

  async initialize(){
    await this.ensureFileExists();
    this.products = await this.readProducts();
  }
} 