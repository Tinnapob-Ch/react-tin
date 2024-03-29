import React,{ Component} from "react";
import Calculator from "./Calculator"
import ProductList from "../product/ProductList";
import axios from "axios";

class Monitor extends Component {
    constructor(props) {
        super(props);
        this.state = {totalPrice : 0,orders: [], confirm : 0};
        this.addOrder = this.addOrder.bind(this)
        this.delOrder = this.delOrder.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
        this.comfirmOrder = this.comfirmOrder.bind(this)
    }

    addOrder(product){
        let findOrder = this.state.orders.find(order => order.product.id == product.id);
        if(findOrder){
            findOrder.quantity++;
        } else {
            this.state.orders.push({product: product,quantity : 1})
        }
        const totalPrice = this.state.totalPrice + parseInt(product.unitPrice)
        this.setState({totalPrice: totalPrice, orders: this.state.orders,confirm : 0});
    }

    delOrder(product){
        let findOrder = this.state.orders.find(order => order.product.id == product.id);
        let resultOrder = this.state.orders.filter(order => order.product.id != product.id)
        const totalPrice = this.state.totalPrice - (findOrder.quantity * parseInt(findOrder.product.unitPrice));
        this.setState({totalPrice : totalPrice , orders : resultOrder,confirm : 0});
    }

    comfirmOrder(){
        const {totalPrice,orders} = this.state;
        if(orders && orders.length > 0){
            axios.post(process.env.REACT_APP_API_URL + "/orders",{orderedDate : new Date(), totalPrice,orders})
            .then(res => {
                this.setState({totalPrice : 0, orders : [],confirm : 1 })
            })
        }else{
            this.setState({totalPrice : 0, orders : [],confirm : 2 })
        }
    }

    cancelOrder(){
        this.setState({totalPrice : 0, orders : [],confirm : 0})
    }

    checkconfirm(){
        if(this.state.confirm == 2){
            return (<div className="alert alert-danger title text-right" role="alert">
                         เลือกสินค้าก่อนค่ะ
                    </div>)
        }
        else if(this.state.confirm == 1){
            return (<div className="alert alert-success title text-right" role="alert">
            บันทึกรายการสั่งซื้อเรียบร้อยจร้าาาาา
            </div>)
        }
    }

     render(){
        return (
            <div className="container-fluid">
                {this.checkconfirm()}
                <div className="row">
                    <div className="col-md-9">
                        <ProductList products ={this.props.products} onAddOrder={this.addOrder}/>
                    </div>
                    <div className="col-md-3">
                        <Calculator totalPrice={this.state.totalPrice} orders = {this.state.orders} onDelOrders={this.delOrder} oncomfirmOrder={this.comfirmOrder} onCancelOrder={this.cancelOrder}/>
                    </div>
                </div>
            </div> 
        )

    }
}

export default Monitor;