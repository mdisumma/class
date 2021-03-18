var DateTime = luxon.DateTime;
//GET CALL
const getData = async () => {
    let { data } = await axios.get('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}')
    return data
}


//PARCE DATA
document.addEventListener('DOMContentLoaded', async () => {
    const results = await getData()
    console.log(results);

    //LABEL
    const casesResult = results.data[0].newCases
    const dateResult = results.data[0].date
    // console.log(`data from luxton:${DateTime.fromISO(dateResult).toFormat('DD')}`);


    for (const value of results.data) {
        const day = DateTime.fromISO(value.date).toFormat('d')
        const months = DateTime.fromISO(value.date).toFormat('LLLL')
        const year = DateTime.fromISO(value.date).toFormat('y')

        const printHTML = document.querySelector('#coronadata');

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
        //human writable sequenze
        const inputDay = dateInput.substring(0, 2)
        console.log(inputDay)
        const inputMonth = dateInput.substring(3, 5)
        console.log(inputMonth)
        const inputYear = dateInput.substring(6, 10)
        console.log(inputYear)
        console.log(`date format: ${inputYear}-${inputMonth}-${inputDay}`);
        const isoData = `${inputYear}-${inputMonth}-${inputDay}`
        for (i = 0; i < results.data.length; i++) {
            if (results.data[i].date == isoData) {
                const caseResult = results.data[i].newCases
                const printDataSearch = document.querySelector('#result');
                printDataSearch.innerHTML = `<p>Result date:${dateInput} cases:${caseResult}</p>`
            }
        }
    });
});


