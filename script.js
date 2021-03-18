var DateTime = luxon.DateTime;


//date method
//https://www.w3schools.com/js/js_date_formats.asp
var todayDate = new Date();
console.log(`today date from method: ${todayDate}`)

//GET CALL
const getData = async () => {
    let { data } = await axios.get('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}')
    return data
}

const actualDate = document.querySelector('#current-date');
actualDate.innerHTML = DateTime.now("MMM dd y");


//PARCE DATA
document.addEventListener('DOMContentLoaded', async () => {
    const results = await getData()
    console.log(results);

    //LABEL
    // const casesResult = results.data[0].newCases
    // const dateResult = results.data[0].date
    // console.log(`data from luxton:${DateTime.fromISO(dateResult).toFormat('DD')}`);


    for (const value of results.data) {
        const day = DateTime.fromISO(value.date).toFormat('d')
        const months = DateTime.fromISO(value.date).toFormat('LLLL')
        const year = DateTime.fromISO(value.date).toFormat('y')
        // const humanData= DateTime.fromISO(value.date).toFormat('DDD')
        const printHTML = document.querySelector('#coronadata');
        // time format (sorted from newest to old)

        printHTML.innerHTML += `
        <ul>
        <li class="day">${day}</li>
        <li class="months">${months}</li>
        <li class="year">${year}</li><hr>
        <li class="cases">Cases: ${value.newCases} </li>
        </ul>`;
    }
    document.querySelector('#button').addEventListener('click', function (event) {
        event.preventDefault()
        const dateInput = document.querySelector('#search').value;
        console.log(`date input: ${dateInput}`);
        //recognises the input from the user and stores the value to then retrieve the requested data

        //human writable sequenze
        const inputDay = dateInput.substring(0, 2);
        console.log(`inputDay: ${inputDay}`)
        const inputMonth = dateInput.substring(3, 5)
        console.log(`inputMonth: ${inputMonth}`)
        const inputYear = dateInput.substring(6, 10)
        console.log(`inputYear: ${inputYear}`)
        console.log(`date format: ${inputYear}-${inputMonth}-${inputDay}`);
        const isoData = `${inputYear}-${inputMonth}-${inputDay}`
        //substring allow us to extract the characters of a string between 2 indices (0,2)-(3,5) (6,10) and return it as a new sub string.
        //the reason for this is to format the dates in a recognisable manner (dd/mm/yyyy) instead of (yyyy/mm/dd)
        //this follows the heuristic rules as it is recognisible to the users


        for (i = 0; i < results.data.length; i++) {
            if (results.data[i].date == isoData) {
                const caseResult = results.data[i].newCases
                const printDataSearch = document.querySelector('#result');
                printDataSearch.innerHTML = `<p>Result date:${dateInput} cases:${caseResult}</p>`
            }
        }
    });
});


