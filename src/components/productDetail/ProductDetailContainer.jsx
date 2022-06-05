import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GET_PRODUCT_BY_ID, CLEAN_UP_DETAILS } from '../../redux/actions'
import ProductAdd from '../cart/ProductAdd'
const { REACT_APP_CLOUDINARY_RES } = process.env


export default function ProductDetailContainer() {

    const { product } = useSelector((store) => store.clientReducer)
    const { id } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GET_PRODUCT_BY_ID(id))
        return () => {
            dispatch(CLEAN_UP_DETAILS())
        }
    }, [dispatch, id])
    return (
        <div className="productDetail">
            <img src={REACT_APP_CLOUDINARY_RES + product[0]?.images[0].imageName} alt={product[0]?.imageAlt} className="productDetail--img" />
            <div className="productDetail--container">
                <h2 className="productDetail__productName">{product[0]?.productName}</h2>
                <p className="">{product[0]?.productDescription}</p>
                <p className="">${product[0]?.productPrice.toLocaleString('de-DE')}</p>
                <div className='productDetail--container-btn'>
                    <ProductAdd price={product[0]?.productPrice} stock={product[0]?.productPrice} product={product[0]} />
                </div>
            </div>
        </div>
    )
}
