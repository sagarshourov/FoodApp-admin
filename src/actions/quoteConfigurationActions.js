import axios from "axios";
import { SAVE_PRODUCT_CONFIGURATION, GET_SINGLE_QUOTE, GET_ALL_QUOTES, GET_AVAILABLE_ARTICLES, INTQUOTE, UPDATE_PRODUCT_CONFIGURATION, GET_ALL_PRODUCT_CONFIGURATIONS, DELETE_PRODUCT_CONFIGURATION } from "./types";
import { setLoading } from './commonActions';
import { getError } from './errorActions';
import isEmpty from "../reducers/is_empty";

export const initQuote = productId => dispatch => {
    dispatch(setLoading());
    //console.log('initQuote');
    return axios
        .get(`/prodconf_QuoteApiService/initQuote`)
        .then(res => {
            // console.log('initQuote');
            // console.log(res);
            // localStorage.setItem('savedProductModelEditionID', res.data.payLoad.productModelEditionId);

            dispatch({
                type: INTQUOTE,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(getError(err))
        );
};

export const saveProductConfiguration = (customerID, productID, selectedArticles) => dispatch => {
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
                }
            }
        }
    } else {
        productConfigurationData = {
            "productConfiguration": {
                "product": {
                    "id": productID
                },
                "articles": selectedArticles
            }
        }
    }

    axios
        .post("/prodconf_ProductConfigurationApiService/createProductConfiguration", productConfigurationData)
        .then(res =>
            dispatch({
                type: SAVE_PRODUCT_CONFIGURATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};

export const getAllQuoteConfigurations = () => dispatch => {
    dispatch(setLoading());
    axios
        .get('/prodconf_QuoteApiService/retrieveQuotes')
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

export const getSingleQuoteConfiguration = QuoteID => dispatch => {


    //console.log('getSingleQuoteConfiguration');
    dispatch(setLoading());

    axios
        .get(`/prodconf_QuoteApiService/retrieveQuote?quoteId=${QuoteID}`)
        .then(res => {
            dispatch({
                type: GET_SINGLE_QUOTE,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(getError(err))
        );


};

export const createQuote = (productConfigurationData) => dispatch => {
   // let productConfigurationData;

  //  console.log(productConfigurationData);

    axios
        .post("/prodconf_QuoteApiService/createQuote", productConfigurationData)
        .then(res =>
            dispatch({
                type: SAVE_PRODUCT_CONFIGURATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};
export const updateQuote = (productConfigurationData) => dispatch => {
    // let productConfigurationData;
 
   //  console.log(productConfigurationData);
 
     axios
         .post("/prodconf_QuoteApiService/updateQuote", productConfigurationData)
         .then(res =>
             dispatch({
                 type: SAVE_PRODUCT_CONFIGURATION,
                 payload: res.data
             })
         )
         .catch(err =>
             dispatch(getError(err))
         );
 };

export const updateQuoteConfiguration = (quoteId, status, data) => dispatch => {
    var QuoteConfigurationData;
    //console.log(data.quoteStatus);

    //if (!isEmpty(customerID)) {
    QuoteConfigurationData = {
        "quote": {
            "id": data.id,
            "quoteNumber": "20191217-002",
            "termsOfPayment": {
                "id": "00000000-1111-2222-3333-000000001111",
                "caption": "2 % Skonto",
                "termsOnQuote": "2 % Skonto"
            },
            "termsOfDelivery": {
                "id": "00000000-1111-2222-3333-000000001114",
                "caption": "Ab Werk",
                "termsOnQuote": "Lieferung: Ab Werk"
            },
            "customer": {
                "id": "266630d9-310e-df6b-ed99-60a9865d962e",
                "contactPerson": {
                    "id": "PN55"
                }
            },
            "positions": "",
            "quotePositions": data.quotePositions,
            "quoteStatusKeyWord": status,
            "price": "20.33€"
        }


    }
    // } else {
    //     QuoteConfigurationData = {
    //         "productConfiguration": {
    //             "id": prodConfigId,
    //             "product": {
    //                 "id": productID
    //             },
    //             "articles": selectedArticles,
    //             "productModelEdition": {
    //                 "id": productModelEditionID
    //             }
    //         }
    //     }
    // }
    axios
        .post("/prodconf_QuoteApiService/updateQuote", QuoteConfigurationData)
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

export const deleteQuoteConfiguration = quoteId => dispatch => {
    axios
        .get(`/prodconf_QuoteApiService/deleteQuote?quoteId=${quoteId}`)
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

