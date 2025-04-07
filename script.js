let tableSettingsDriver = async () => {
    const filterVisiDrivers = document.getElementById('driverFilter')
    const filterVisiTeams = document.getElementById('teamsFilter')
    
    if(filterVisiDrivers && filterVisiTeams){
        filterVisiDrivers.style.visibility = 'visible'
        filterVisiTeams.style.visibility = 'hidden'
    }
    
    const tableElem = document.getElementById('mainTable')
    const driversButtonElem = document.getElementById('driversButton')
    const teamButtonElem = document.getElementById('teamsButton')
    
    if(tableElem && driversButtonElem){
        driversButtonElem.style.borderColor = "unset"
        tableElem.style.backgroundColor = "#AC3B61"
        driversButtonElem.style.backgroundColor = "#AC3B61"
        driversButtonElem.style.color = "#FFD700"
        teamButtonElem.style.backgroundColor = "#bab2b5"
        teamButtonElem.style.color = "unset"
        teamButtonElem.style.borderColor = "#AC3B61"
    }
}

let tableSettingTeams = async () => {
    const filterVisiDrivers = document.getElementById('driverFilter')
    const filterVisiTeams = document.getElementById('teamsFilter')
    if (filterVisiDrivers && filterVisiTeams){
        filterVisiTeams.style.visibility = 'visible'
        filterVisiDrivers.style.visibility = 'hidden'
    }

    const tableElem = document.getElementById('mainTable')
    const teamButtonElem = document.getElementById('teamsButton')
    const driversButtonElem = document.getElementById('driversButton')
    
    if(tableElem && driversButtonElem){
        teamButtonElem.style.borderColor = "unset"
        tableElem.style.backgroundColor = "#123c69"
        teamButtonElem.style.backgroundColor = "#123c69"
        driversButtonElem.style.backgroundColor = "#bab2b5"
        teamButtonElem.style.color = "#FFD700"
        driversButtonElem.style.color = "unset"
        driversButtonElem.style.borderColor = "#123c69"
    }
}

let summaryDrivers = async () => {
    fetch('/api/driversTable')
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainTable').innerHTML = html;
            tableSettingsDriver()
        })
        .catch(err => console.error("Ошибка в выводе таблицы в клиентской части:", err))
}

let summaryTeams = async () => {
    fetch('/api/teamsTable')
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainTable').innerHTML = html;
            tableSettingTeams()
        })
        .catch(err => console.error("Ошибка в выводе таблицы в клиентской части:", err))
}

let openSearchWindow = () => {
    const button = document.getElementById('searchButton')
    button.addEventListener("click", func = () => {
        window.location.href = "/search"
    })
}

let returnFromSearch = () => {
    const button = document.getElementById('returnButton')
    button.addEventListener("click", func = () => {
        window.location.href = "/main"
    })
}

let returnFromFilter = () => {
    const button = document.getElementById('returnButtonFromTeam')
    button.addEventListener("click", func = () => {
        window.location.href = "/main"
    })
}

let openFilterWindow = () => {
    const button = document.getElementById('openFilterButton')
    button.addEventListener("click", func = () => {
        window.location.href = "/filter"
    })
}

let searchDriver = () => {
    const button = document.getElementById('driverSeachButton')
    button.addEventListener("click", func = () => {
        const searchData = document.getElementById('inputFieldDriverSearch').value.trim().toLowerCase()
        fetch('/searchDriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: searchData,
        })
            .then(response => response.text())
            .then(html => {
                document.getElementById('mainTable').innerHTML = html;
                tableSettingsDriver()
            })
            .catch(err => console.error("Ошибка в выводе таблицы найденных в клиентской части:", err));
    })
}

let searchTeams = () => {
    const button = document.getElementById('teamSeachButton')
    button.addEventListener("click", func = () => {
        const searchData = document.getElementById('inputFieldTeamSearch').value.trim().toLowerCase()
        fetch('/searchTeam', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: searchData,
        })
            .then(response => response.text())
            .then(html => {
                document.getElementById('mainTable').innerHTML = html;
                tableSettingTeams()
            })
            .catch(err => console.error("Ошибка в выводе таблицы найденных в клиентской части:", err));
    })
}

async function driverFiler() {
    const button = document.getElementById('filterButtonDriver')
    button.addEventListener("click", func = () => {
        
        const filterDataDriverName = document.getElementById('inputNameDriverFilter').value.trim().toLowerCase()

        const filterDataTeam = document.getElementById('inputComandNameFilter').value.trim().toLowerCase()

        const filterDataWinsFrom = document.getElementById('inputWinsFilterFrom').value.trim().toLowerCase() != ""
            ? document.getElementById('inputWinsFilterFrom').value.trim().toLowerCase() : 0;
        const filterDataWinsTo = document.getElementById('inputWinsFilterTo').value.trim().toLowerCase() != ""
            ? document.getElementById('inputWinsFilterTo').value.trim().toLowerCase() : 30;

        const filterDataYearFrom = document.getElementById('inputYearFilterFrom').value.trim().toLowerCase() != "" 
            ? document.getElementById('inputYearFilterFrom').value.trim().toLowerCase() : "1950";
        const filterDataYearTo = document.getElementById('inputYearFilterTo').value.trim().toLowerCase() != ""
            ? document.getElementById('inputYearFilterTo').value.trim().toLowerCase() : "2024"
        
        const searchData = {
            driverName: filterDataDriverName,
            dataTeam: filterDataTeam,
            dataWinsFrom: filterDataWinsFrom,
            dataWinsTo: filterDataWinsTo,
            dataYearFrom: filterDataYearFrom,
            dataYearTo: filterDataYearTo
        }

        fetch('/filterDrivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        })
            .then(response => response.text())
            .then(html => {
                document.getElementById('mainTable').innerHTML = html;
            })
            .catch(err => console.error("Ошибка в выводе таблицы найденных в клиентской части:", err));
    })
}

async function teamFiler() {
    const button = document.getElementById('filterButtonTeam')
    button.addEventListener("click", func = () => {
    
        const filterDataTeamName = document.getElementById('inputNameTeamFilter').value.trim().toLowerCase()

        const filterDataFirstDriverTeam = document.getElementById('inputFirstDriverTeamFilter').value.trim().toLowerCase()

        const filterDataSecondDriverTeam = document.getElementById('inputSecondDriverTeamFilter').value.trim().toLowerCase()

        const filterDataTeamsYearFrom = document.getElementById('inputYearTeamFilterFrom').value.trim().toLowerCase() != ""
            ? document.getElementById('inputYearTeamFilterFrom').value.trim().toLowerCase() : 1950;
        const filterDataTeamsYearTo = document.getElementById('inputTeamYearFilterTo').value.trim().toLowerCase() != ""
            ? document.getElementById('inputTeamYearFilterTo').value.trim().toLowerCase() : 2024;

        const filterDataTeamCountOfCCFrom = document.getElementById('inputCountOfCCTeamFilterFrom').value.trim().toLowerCase() != "" 
            ? document.getElementById('inputCountOfCCTeamFilterFrom').value.trim().toLowerCase() : 0;
        const filterDataTeamCountOfCCTo = document.getElementById('inputCountOfCCTeamFilterTo').value.trim().toLowerCase() != ""
            ? document.getElementById('inputCountOfCCTeamFilterTo').value.trim().toLowerCase() : 50
        
        const searchData = {
            teamName: filterDataTeamName,
            firstDriverName: filterDataFirstDriverTeam,
            secondDriverName: filterDataSecondDriverTeam,
            yearsFrom: filterDataTeamsYearFrom,
            yearsTo: filterDataTeamsYearTo,
            sumOfCCFrom: filterDataTeamCountOfCCFrom,
            sumOfCCTo: filterDataTeamCountOfCCTo
        }

        fetch('/filterTeams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
        })
            .then(response => response.text())
            .then(html => {
                document.getElementById('mainTable').innerHTML = html;
            })
            .catch(err => console.error("Ошибка в выводе таблицы найденных в клиентской части:", err));
    })
}


document.addEventListener("DOMContentLoaded", summaryDrivers);
document.addEventListener("DOMContentLoaded", openFilterWindow);
document.addEventListener("DOMContentLoaded", returnFromSearch);
document.addEventListener("DOMContentLoaded", openSearchWindow);
document.addEventListener("DOMContentLoaded", searchDriver)
document.addEventListener("DOMContentLoaded", searchTeams)
document.addEventListener("DOMContentLoaded", driverFiler)
document.addEventListener("DOMContentLoaded", teamFiler)
document.addEventListener("DOMContentLoaded", returnFromFilter)
