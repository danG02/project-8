//Context API File
import React from 'react';
import {storeProducts, detailProduct} from "./data";

//Creating the context object
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends React.Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
//LifeCycle Method
    componentDidMount() {
        this.storeProducts();
    }

//Getting new fresh values
    storeProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return {products: tempProducts}
        })
    }
//These are our methods
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }

    openModel = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modelProduct: product, modelOpen: true}
        })
    }

    closeModel = () => {
        this.setState(() => {
            return {modelOpen: false}
        })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index  = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
            return { products: tempProducts, cart:[...this.state.cart,
            product] };
            }, 
            () => {
                this.addTotals();
            }
        );
    };
//For the cart page
//we use arrow method so we dont have to mess with constructors
    increment = (id) => {
        //deconstructor w/ ...
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(
            () => {
            return { cart:[...tempCart] }
            },
            () => {
                this.addTotals()
            }
        );
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;
            this.setState(
                () => {
                return { cart:[...tempCart] }
                },
                () => {
                    this.addTotals()
                }
            );
        }

    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        }, () => {
            this.addTotals();
        })

    }

    clearCart = (id) => {
        this.setState(() => {
            return { cart:[] }
        }, () => {
            //this gives fresh new default values w/o this, we still carry the value in our cart
            this.storeProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.07;
        //tofixed is how many decimal places
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal:subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }


    render() { 
        return (
            <ProductContext.Provider 
            value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel: this.openModel,
                closeModel: this.closeModel,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
 
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

//Provider needs to sit on top of application
