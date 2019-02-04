// CALCULATE TOTAL COST USING REDUCE()
//reduce() iterates over the arraym does logic and then reduces to a single result

const outEl = document.querySelector("#output")
businesses.forEach(business => {
let totalOrders = business.orders.reduce((currentTotal, nextValue) => currentTotal += nextValue, 0)
totalOrders = totalOrders.toFixed(2)  

outEl.innerHTML += `
<h2>
    ${business.companyName}
    ($${totalOrders})
</h2>
<section>
    ${business.addressFullStreet}
</section>
<section>
    ${business.addressCity},
    ${business.addressStateCode}
    ${business.addressZipCode}
</section>
`;
outEl.innerHTML += "<hr/>";
});



//SEARCH FUNCTION FOR PURCHASING AGENTS
//key press event-allows user to simply press return key and execute the search.
//The charCode property returns the Unicode character code of the key that triggered the onkeypress event. The Unicode character code is the number of a character (e.g. the number "97" represents the letter "a").

document.querySelector("#companySearch").addEventListener("keypress", keyPressEvent => { 
    if (keyPressEvent.charCode === 13) {
        const foundBusiness = businesses.find(business => {
            let typedSearch = keyPressEvent.target.value.toUpperCase()
            let upperFirstName = business.purchasingAgent.nameFirst.toUpperCase()
            let upperLastName = business.purchasingAgent.nameLast.toUpperCase()
            if (upperFirstName.includes(typedSearch) || upperLastName.includes(typedSearch))
            
            return typedSearch
        }
        )
        outEl.innerHTML = 
            `
        <h2>${foundBusiness.purchasingAgent.nameFirst} ${foundBusiness.purchasingAgent.nameLast}</h2> 
        <section>${foundBusiness.addressFullStreet}</section>
        <section>
        ${foundBusiness.addressCity},
        ${foundBusiness.addressStateCode},
        ${foundBusiness.addressZipCode}
        </section>
        `
    }
})


//FILTER BY STATE
//filter method checks to see what items in the array meets the condition and places them in a new array

const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false 

    if (business.addressStateCode === "NY") {
        inNewYork = true
    }
    return inNewYork
})

const manufacturingBusinesses = businesses.filter(business => {
    let isManufacturer = false

    if (business.companyIndustry === "Manufacturing") {
        isManufacturer = true
    }
    return isManufacturer
})


//FILTER BY BUSINESS TYPE
manufacturingBusinesses.forEach(business => {
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
    ${business.addressFullStreet}
    </section>
    <section>
    ${business.addressCity}, ${business["addressStateCode"]} ${business.addressZipCode} 
    </section>
    `
    outEl.innerHTML += "<hr/>"
})

outEl.innerHTML += `<h1>Purchasing Agents</h1>`

//map() method used for transforming items in one array to a different structure and storing the new items in another array
const purchasingAgents = businesses.map(business => { 
   return agent = {
       "fullName": `${business.purchasingAgent.nameFirst} ${business.purchasingAgent.nameLast}`, //combining objects within objects with string interpolation 
       "company": business.companyName,
       "phoneNumber": business.phoneWork
    }
    })

purchasingAgents.forEach(agent => {
    outEl.innerHTML += `
    <h2>${agent.fullName}</h2>
    <h4>${agent.company}</h4>
    <h4>${agent.phoneNumber}</h4>
    `
    outEl.innerHTML += "<hr/>"
})