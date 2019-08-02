import React,{Component} from 'react';
import Input from '../../component/UI/Input/Input';
import classes from './Product.css';
import Button from '../../component/UI/Button/Button'
class Product extends Component{
    state = {
        Product: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5
                },
                valid: false
            },
            price:{
                 elementType: 'input',
                 elementConfig:{
                      type: 'text',
                      placeholder:'Price',
                 },
                value: '',
                validation:{
                    required: true,
                
                    
                },
                valid: false
                },
            description:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Description'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 10
                },
                valid: false               
            },
            quantity:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Quantity'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false ,
                touched: false
            }
            },
            isValidForm: false
        }

        checkValidity(value,rules)
        {
             let isValid=true;
             if(rules.required)
             {
                  isValid=value.trim()!=='' && isValid;
             }
             if(rules.minLength)
             {
                 isValid=value.length>=rules.minLength && isValid;
             }
             return isValid;
        }

        inputChangeHandler=(event,inputIdentifier)=>{
            //console.log(event.target.value);
            const updatedProduct={...this.state.Product};
            const updatedElement={...updatedProduct[inputIdentifier]};
            if(inputIdentifier=='name' && isNaN(event.target.value))
            {updatedElement.value=event.target.value;}
            else
            if((inputIdentifier=='price' ||inputIdentifier=='quantity')&& !isNaN(event.target.value))
            {updatedElement.value=event.target.value;}
            else if(inputIdentifier=='description')
            {updatedElement.value=event.target.value;}
            updatedElement.touched=true;
            updatedElement.valid=this.checkValidity(updatedElement.value,updatedElement.validation);
            updatedProduct[inputIdentifier]=updatedElement;
            let isValidForm=true;
            for(let inputIdentifier in updatedProduct)
            {
                 isValidForm=updatedProduct[inputIdentifier].valid && isValidForm;
            }
            this.setState({Product: updatedProduct,isValidForm: isValidForm});
            console.log(updatedElement);           
        }
        productSaveHandler=(event)=>
        { 
            if(!this.state.isValidForm)
            {
                event.preventDefault();
            }
            else
            alert('Valid Form');
                      
        }

        render () {
            const formElementsArray = [];
            for (let key in this.state.Product) {
                formElementsArray.push({
                    id: key,
                    config: this.state.Product[key]
                });
            }
            let form = (
                <form onSubmit={(event)=>this.productSaveHandler(event)}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                         />
                    ))}
                    {<Button btnType="Success">SAVE</Button> }
                </form>
            );
            // if ( this.state.loading ) {
            //     form = <Spinner />;
            // }
            return (
                <div className={classes.Product}>
                    <h4>Enter Product Details</h4>
                    {form}
                </div>
            );
        }

      
    }


export default Product;