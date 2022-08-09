const submitButton = document.getElementById("submit-button")
const appType = document.getElementById("select-app")
const id = document.getElementById("id")
const parent_id = document.getElementById("parent-id")
const replace_id = document.getElementById("replace-id")
const resultText = document.getElementById("result")
const mockDataContainer = document.getElementById("mock-data")
const label = document.getElementById("label")

//Mock data
let appList = [
	{
		appType: "JuuriHakemus",
		id: 1,
		parent_id: null,
		replace_id: null,
		name: "Venables"
	},
	{
		appType: "JuuriHakemus",
		id: 2,
		parent_id: null,
		replace_id: null,
		name: "Takos"
	},
	{
		appType: "JuuriHakemus",
		id: 3,
		parent_id: null,
		replace_id: null,
		name: "Powter"
	},
	{
		appType: "JuuriHakemus",
		id: 4,
		parent_id: null,
		replace_id: null,
		name: "Wedmore"
	},
	{
		appType: "JuuriHakemus",
		id: 5,
		parent_id: null,
		replace_id: null,
		name: "Murrie"
	},
	{
		appType: "KesittelyHakemus",
		id: 11,
		parent_id: 1,
		replace_id: null,
		name: "Venables"
	},
	{
		appType: "KesittelyHakemus",
		id: 12,
		parent_id: 3,
		replace_id: null,
		name: "Powter"
	},
	{
		appType: "KorjausHakemus",
		id: 6,
		parent_id: null,
		replace_id: 4,
		name: "Wedmore"
	},
	{
		appType: "KorjausHakemus",
		id: 7,
		parent_id: null,
		replace_id: 5,
		name: "Murrie"
	}
]

//The found data template
const renderResult = result => {
	let htmlResult = `
    <div class="card">
        <div class="card-content">
            <div class="content">
                <table class="table has-text-centered">
                    <tr>
                        <th>hakemuksen tyyppi</th>
                        <th>id </th>
                        <th>parent_id </th>
                        <th>replace_id </th>
                        <th>nimi </th>
                    </tr>
                    <tr>
                        <th>${result.appType}</th>
                        <th>${result.id}</th>
                        <th>${result.parent_id}</th>
                        <th>${result.replace_id}</th>
                        <th>${result.name}</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
	resultText.innerHTML = htmlResult
}

//Showing error message if no data found
const errorResult = () => {
	let errorMessage = `
    <article class="message is-danger">
        <div class="message-body">
            Tietoja ei löytynyt
        </div>
    </article>`
	resultText.innerHTML = errorMessage
}

//Selecting data from data object
const appSelector = () => {
	try {
		if (appType.value === "JuuriHakemus") {
			//find the Juurihakemus by id
			let result = appList.find(
				item =>
					item.id === parseInt(id.value) && item.appType === "JuuriHakemus"
			)

			renderResult(result)
		} else if (
			//Checking if the application exist in the data array
			appList.findIndex(i => i.parent_id === parseInt(parent_id.value)) !== -1
		) {
			//Find the that juurihakemus wher pk is the Kesittelyhakemus fk
			let result = appList.find(
				item =>
					item.id === parseInt(parent_id.value) &&
					item.appType === "JuuriHakemus"
			)

			renderResult(result)
		} else if (
			//Checking if the application exist in the data array
			appList.findIndex(i => i.replace_id === parseInt(replace_id.value)) !== -1
		) {
			//Find the that juurihakemus wher pk is the Kesittelyhakemus fk
			let result = appList.find(
				item =>
					item.id === parseInt(replace_id.value) &&
					item.appType === "JuuriHakemus"
			)

			renderResult(result)
		} else {
			errorResult()
		}
	} catch (e) {
		console.log(`Error occured ${e}`)
		errorResult()
	}
}

//Submitting the button
const onSubmit = e => {
	e.preventDefault()
	appSelector()
}

//Mock data showed on paged
const dataJSON = JSON.stringify(appList)
mockDataContainer.innerHTML = dataJSON

//Eventlistener for submit button
submitButton.addEventListener("click", onSubmit)
//Rendering inputs based on select
appType.addEventListener("change", function () {
	if (appType.value == "JuuriHakemus") {
		id.classList.remove("--hide")
		parent_id.classList.add("--hide")
		replace_id.classList.add("--hide")
		label.innerText = "Id"
	}
	if (appType.value == "KesittelyHakemus") {
		parent_id.classList.remove("--hide")
		id.classList.add("--hide")
		replace_id.classList.add("--hide")
		label.innerText = "Parent id"
	}
	if (appType.value == "KorjausHakemus") {
		replace_id.classList.remove("--hide")
		parent_id.classList.add("--hide")
		id.classList.add("--hide")
		label.innerText = "Replace id"
	}
})
