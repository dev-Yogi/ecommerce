import React, { Component } from 'react'
import Product from './Product'


export default class ShoppingCart extends Component {

  //executes when the compontent is mounted
  constructor(props){
    console.log("constructor - Shopping Cart");
    super(props); //calling the parent component
      //initialization of state
      this.state = {
        products: [
       
        ],
      };
    }
  render() {
    console.log("render - Shopping Cart");
    return (
      <div className="container-fluid">
        <h4>Shopping Cart </h4>

        <div className="row">
            {this.state.products.map((prod) => {
                return <Product key={prod.id} 
                                product={prod} 
                                onIncrement = {this.handleIncrement}
                                onDecrement = {this.handleDecrement}
                                onDelete = {this.handleDelete}> 
                          <button className='btn btn-primary'>
                             Buy Now
                          </button>
                      </Product>
                
            })}
        </div>
      </div>
    );
  }
//render ends here

//executes after the constructor and render method(includes life cycle of child components, if any of current(parent) component)
componentDidMount = async() => {
//fetch data from data source
  var response = await fetch("http://localhost:5000/products" ,{
    method: "GET"
});
  //converting json into javascript object array to allow the data to be rendered from the DOM (this.state.products.map((prod)) 
  var prods = await response.json();
  
  console.log(prods)

  this.setState({products: prods})
}

componentDidUpdate(prevProps, prevState){
  console.log("componentDidUpdate - ShoppingCart", 
  prevProps,
  prevState,
  this.props,
  this.state
  );

  //if(prevProps.x !== this.props.x){
    //make https call 
  //}
}

componentWillUnmount(){
  console.log("componentWillUnmount -ShoppingCart");
}

componentDidCatch(error, info){
  console.log("componentDidCatch -ShoppingCart");
  console.log(error,info)

  localStorage.lastError = `${error}\n${JSON.stringify(info)}`
}



handleIncrement = (product, maxValue) =>{
  //get index of selected product
  let allProducts = [...this.state.products];
  let index = allProducts.indexOf(product);

  if(allProducts[index].quantity < maxValue){
    allProducts[index].quantity ++

        // update the state of the current compontent (parent component) in order to render in the DOM
  this.setState({products: allProducts});
  }
};

handleDecrement = (product, minValue) =>{
  //get index of selected product
  let allProducts = [...this.state.products];
  let index = allProducts.indexOf(product);

  if(allProducts[index].quantity > minValue){
    allProducts[index].quantity--;
  
  this.setState({products: allProducts});

  }   
};

handleDelete = (product) => {
  let allProducts = [...this.state.products];
  let index = allProducts.indexOf(product);

  if(window.confirm("Are you sure you want to delete?")){
    allProducts.splice(index,1);
  }


  this.setState({products: allProducts});
}
}
