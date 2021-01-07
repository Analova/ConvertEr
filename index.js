const axios=require("axios") ;

const FIXER_API_KEY = `["API_KEY"]`;
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;

const REST_COUNTRIES_API = `https://restcountries.eu/rest/v2/currency`;

//**************************// Fetch Data about currencies
const getExchangeRate = async(fromCurrency,toCurrency) => {
  // const response = await axios.get(FIXER_API);

  // console.log(response.data);

  try{
 const {data:{rates}} = await axios.get(FIXER_API);
   
  const euro=1/rates[fromCurrencty]

  const exchangeRate= euro * rates[toCurrency]

  return exchangeRate
  
//  console.log(exchangeRate)
  }
  catch(error){
  throw new Error(`Unable to get currency ${fromCurrency} to ${toCurrency}`)
  }

};

getExchangeRate("USD", "EUR");

//***********************// Fetch Data about countries
const getCountries= async(currencyCode)=>{
//    const resposne=  await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`)
// console.log(resposne.data)

try{
 const {data}=  await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`)
     //data.map((country)=>country.name)
    return  data.map(({name})=>name)
}catch(error){
  throw new Error(`Unable to get countries that use ${currencyCode}`)
}
    
}

//getCountries("AUD")

const converCurrency= async(fromCurrency,toCurrency,amount)=>{
  fromCurrency=fromCurrency.toUpperCase();
  toCurrency=toCurrency.toUpperCase();

  const [exchangeRate,countries]=await Promise.all([
   getExchangeRate(fromCurrency,toCurrency),
    getCountries(toCurrency),
   
  ])

const convertedAmount=(amount +exchangeRate).toFixed(2)

console.log(countries)

  return(
`${amount}${fromCurrency} is worth ${convertedAmount} ${toCurrency}
  You can spend these in the following countries:${countries}`
  ) 

   
 
}

converCurrency("AUD","USD",20)
.then((result)=>console.log(result))
.catch((error)=>console.log(error))



