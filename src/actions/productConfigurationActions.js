import axios from "axios";
import { SAVE_PRODUCT_CONFIGURATION, UPDATE_PRODUCT_CONFIGURATION, GET_ALL_PRODUCT_CONFIGURATIONS, DELETE_PRODUCT_CONFIGURATION } from "./types";
import { setLoading } from './commonActions';
import { getError } from './errorActions';
import isEmpty from "../reducers/is_empty";
import { saveQuoteConfigarationToLocalStorage } from '../common/SaveDataToLocalStorage';

export const getProductConfigurationByProduct = productId => dispatch => {
    return axios
        .get(`/prodconf_ProductConfigurationApiService/initProductConfigurationByProduct?productId=${productId}`)
        .then(res => {
            localStorage.setItem('savedProductModelEditionID', res.data.payLoad.productModelEditionId);
        })
        .catch(err =>
            dispatch(getError(err))
        );
};

export const saveProductConfiguration = (customerID, productID, selectedArticles, productModelEditionID) => dispatch => {
    let productConfigurationData;
    if (!isEmpty(customerID)) {
        productConfigurationData = {
            "productConfiguration": {
                "product": {
                    "id": productID
                },
                "articles": selectedArticles,
                "customer": {
                    "id": customerID
                }, "productModelEdition": {
                    "id": productModelEditionID
                },

            }
        }
    } else {
        productConfigurationData = {
            "productConfiguration": {
                "productModelEdition": {
                    "id": productModelEditionID
                },
                "product": {
                    "id": productID
                },
                "articles": selectedArticles
            }
        }
    }

    axios
        .post("/prodconf_ProductConfigurationApiService/validateProductConfiguration", productConfigurationData)
        .then(res => {
            dispatch({
                type: SAVE_PRODUCT_CONFIGURATION,
                payload: res.data
            })
        //     let datas = res.data.payLoad;
        //     datas["quantity"] =1;
        //    saveQuoteConfigarationToLocalStorage(datas);

           
      
         }
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const getAllProductConfigurations = () => dispatch => {
    dispatch(setLoading());
    axios
        .get('/prodconf_ProductConfigurationApiService/retrieveProductConfigurations')
        .then(res =>
            dispatch({
                type: GET_ALL_PRODUCT_CONFIGURATIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const getSingleProductConfiguration = prodConfigID => dispatch => {
    axios
        .get(`/prodconf_ProductConfigurationApiService/retrieveProductConfiguration?productConfigurationId=${prodConfigID}`)
        .then(res => {
            if (res.data && res.data.success === true && res.data.payLoad && res.data.payLoad.articles && res.data.payLoad.productModelEdition) {
                let savedArticles = res.data.payLoad.articles.map(article => article.id);
                //let array = [];
                //savedArticles.map(single => array.push(single.id));

                localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
                localStorage.setItem('savedProductModelEditionID', res.data.payLoad.productModelEdition.id);
                localStorage.setItem('productID', res.data.payLoad.product.id);
            }
        })
        .catch(err =>
            dispatch(getError(err))
        );
};

export const updateProductConfiguration = (prodConfigId, customerID, productID, selectedArticles, productModelEditionID) => dispatch => {
    let productConfigurationData;
    if (!isEmpty(customerID)) {
        productConfigurationData = {
            "productConfiguration": {
                "id": prodConfigId,
                "product": {
                    "id": productID
                },
                "articles": selectedArticles,
                "customer": {
                    "id": customerID
                },
                "productModelEdition": {
                    "id": productModelEditionID
                }
            }
        }
    } else {
        productConfigurationData = {
            "productConfiguration": {
                "id": prodConfigId,
                "product": {
                    "id": productID
                },
                "articles": selectedArticles,
                "productModelEdition": {
                    "id": productModelEditionID
                }
            }
        }
    }
    axios
        .post("/prodconf_ProductConfigurationApiService/updateProductConfiguration", productConfigurationData)
        .then(res =>
            dispatch({
                type: UPDATE_PRODUCT_CONFIGURATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const deleteProductConfiguration = prodConfigID => dispatch => {
    axios
        .get(`/prodconf_ProductConfigurationApiService/deleteProductConfiguration?productConfigurationId=${prodConfigID}`)
        .then(res =>
            dispatch({
                type: DELETE_PRODUCT_CONFIGURATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const validateProductConfiguration = prodConfigID => dispatch => {
    axios
        .get(`/prodconf_ProductConfigurationApiService/validateProductConfiguration`)
        .then(res =>
          // console.log(res)
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

 