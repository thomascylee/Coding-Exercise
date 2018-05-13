$(document).ready(() => {
    let forex = new Forex();
    forex
        .getRates()
        .done(() => {
            // iterate each currency  
            for (let currency in forex.rates){
                let curr = `<td>${currency}</td>`;
                let oldRates = forex.rates[currency];
                let newRates = forex.rates[currency] + 10.0002;  // adding 10.0002 to each values of those currencies

                let item1 = `<td>${oldRates}</td>`
                let item2 = `<td>${newRates}</td>`
                let tr = `<tbody>${curr}${item1}${item2}</tbody>`
                $('table').append(tr);

                // adding red border
                if (currency === 'HKD'){
                    $('tr').last().addClass('redBorder');
                } 

                if (forex.isEven(oldRates) || forex.isLastDigitEven(oldRates)){
                    $('tr').last().find('td').eq(1).addClass('redBorder');
                }
                
                if (forex.isEven(newRates) || forex.isLastDigitEven(newRates)){
                    $('tr').last().find('td').eq(2).addClass('redBorder');
                }
            }
        })

})

class Forex {
    constructor() {
        let rates;
    }

    // using AJAX to make GET request
    getRates() {
        return $.get("http://api.fixer.io/latest?base=USD")
            .done(data => {
                this.rates = Object.assign({}, data.rates);
            })
            .fail(err => {throw new Error(err)})
    }

    // Odd and Even number are only defined for integer
    isEven(number){
        return number % 2 === 0 ? true : false;
    }

    // Only check the last digit including decimal places 
    isLastDigitEven(number){
        while (number % 1 != 0){
            number *= 10;
        }

        return number % 2 === 0 ? true : false;
    }
}