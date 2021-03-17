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
        const humanData = DateTime.fromISO(value.date).toFormat('DDD')

        const printHTML = document.querySelector('#coronadata');

        printHTML.innerHTML += `
        <ul>
        <li>${humanData}</li>
        <li>Cases: ${value.newCases} </li>
        </ul>`;
    }
    const searchValue = document.querySelector('#button').addEventListener('click', function (event) {
        event.preventDefault()
        const dateInput = document.querySelector('#search').value;
        console.log(`date input: ${dateInput}`)
        for (i = 0; i < results.data.length; i++) {
            if (results.data[i].date == dateInput) {
                const caseResult = results.data[i].newCases
                const printDataSearch = document.querySelector('#result');
                printDataSearch.innerHTML = `<p>${dateInput} ${caseResult}</p>`
            }
        }
    });
});


