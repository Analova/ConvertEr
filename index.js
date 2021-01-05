import axios from "axios";

const FIXER_API_KEY = `[APY_KEY]`;
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;

const REST_COUNTRIES_API = `https://restcountries.eu/rest/v2/currency`;

//Fetch Data about currencies
const getExchangeRate = async(fromCurrencty,toCurrency) => {
  // const response = await axios.get(FIXER_API);

  // console.log(response.data);
 const {data:{rates}} = await axios.get(FIXER_API);
   
  const euro=1/rates[fromCurrencty]

  const exchangeRate= euro * rates[toCurrency]

  return exchangeRate
  
//  console.log(exchangeRate)
};

getExchangeRate("USD", "EUR");

//Fetch Data about countries
const getCountries= async(currencyCode)=>{
//    const resposne=  await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`)
// console.log(resposne.data)

  const {data}=  await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`)
     //data.map((country)=>country.name)
    return  data.map(({name})=>name) 
}

getCountries("AUD")



