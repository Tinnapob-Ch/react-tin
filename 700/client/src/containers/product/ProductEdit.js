import React, { Component } from "react"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductForm from "../../components/product/ProductForm";
import { connect } from "react-redux"
import { productCreate, productUpdate, productFetch } from "../../actions"

class ProductEdit extends Component {

    componentDidMount() {
        // console.log(this.props.match);
        if (this.props.match.params.id) {
            this.props.productFetch(this.props.match.params.id)
        }
    }

    render() {

        const { formValues, match, productCreate, productUpdate, products } = this.props;
        console.log(products);
        return (
            <div>
                <Header />
                <div className="container col-md-5">
                    {match.path.indexOf("add") > 0 && (
                        <div>
                            <h2>เพิ่ม</h2>
                            {products.saved && (
                                <div className="atert alert-secondary title" role={alert}>
                                {products.msg}
                                </div>
                            )}
                            <ProductForm onProductSubmit={() => productCreate(formValues)} />
                        </div>
                    )}
                    {match.path.indexOf("edit") > 0 && (
                        <div>
                            <h2>แก้ไข</h2>
                            {products.saved && (
                                <div className="atert alert-secondary title" role={alert}>
                                {products.msg}
                                </div>
                            )}
                            <ProductForm onProductSubmit={() => productUpdate(products.id, formValues)} />
                        </div>
                    )}
                </div>
                <Footer company = "KU" email = "tinnapob.c@ku.th"/>
            </div>
        )
    }
}

function mapStateToProps({ form, products }) {
    return { formValues: form.productForm ? form.productForm.values : null, products }
}

export default connect(mapStateToProps, { productFetch, productCreate, productUpdate })(ProductEdit);