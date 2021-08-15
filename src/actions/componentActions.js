import axios from "axios";
import { GET_AVAILABLE_COMPONENTS, GET_AVAILABLE_ARTICLES } from "./types";
import { setLoading } from './commonActions';
import { getError } from './errorActions';

export const getAvailableComponents = (productID, selectedArticles, productModelEditionID) => dispatch => {
    
   // console.log('getAvailableComponents');
    const componentData = {
        "productConfiguration" : {
            "product" : {
                "id" : productID
            },
            "articles" : selectedArticles,
            "productModelEdition" : {
                "id" : productModelEditionID
            }
        }
    }
    
    dispatch(setLoading());
    axios
        .post("/prodconf_ProductConfigurationApiService/retrieveAvailableComponents", componentData)
        .then(res => 
            dispatch({
                type: GET_AVAILABLE_COMPONENTS,
                payload: res.data,
                productID : JSON.parse(res.config.data).productConfiguration.product.id,
                product_model_editionID : JSON.parse(res.config.data).productConfiguration.productModelEdition.id
            })
        )
        .catch(err => 
            dispatch(getError(err))
        );
  };

  export const getAvailableArticles = (productID, componentId, selectedArticles, productModelEdtionId) => dispatch => {
    const articleData = {
        "productConfiguration" : {
            "product" : {
                "id" : productID
            },
            "articles" : selectedArticles,
            "productModelEdition" : {
                "id" : productModelEdtionId
            }
        },
            "componentId": componentId
    }
    
    dispatch(setLoading());
    axios
        .post("/prodconf_ProductConfigurationApiService/retrieveAvailableArticlesByComponent", articleData)
        .then(res => 
            dispatch({
                type: GET_AVAILABLE_ARTICLES,
                payload: res.data,
                product_model_editionID : JSON.parse(res.config.data).productConfiguration.productModelEdition.id
            })
        )
        .catch(err => 
            dispatch(getError(err))
        );
  };