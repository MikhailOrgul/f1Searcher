const fs = require('fs');
const path = require('path');
const http = require('http');

const port = 3000, host = 'localhost';

const getMimeType = (ext) => {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.png':
            return 'image/png';
        case '.json':
            return 'application/json';    
        default:
            return 'application/octet-stream';
    }
};

const generateDriversTable = async () => {
    async function driversTable() {
        const dataPath = path.join(__dirname, 'dataDrivers.JSON');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        let table = ""
        data.forEach(driver => {
            table += `
            <tr>
                <td>${driver.number}</td>
                <td>${driver.name}</td>
                <td>${driver.team}</td>
                <td>${driver.wins}</td>
                <td>${driver.year}</td>
            </tr>`
        });
        return table
    }
    
    let driversTableHeader = () => {
        let tableHeader = `
        <tr>
            <th data-column="number" data-order="asc">#</th>
            <th data-column="Name" data-order="asc">Имя</th>
            <th data-column="Team" data-order="asc">Команда</th>
            <th data-column="Wins" data-order="asc">Побед за сезон</th>
            <th data-column="Year" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }
    
    const tableBody = await driversTable();
    const tableHeader = driversTableHeader();

    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${tableHeader}
                </thead>
                <tbody id="driversTableBody">
                    ${tableBody}
                </tbody>
            </table>`
}

const generateTeamsTable = async () => {
    async function teamsTable (){
        
        const dataPath = path.join(__dirname, 'dataTeams.JSON');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        let table =""
        data.forEach(team => {
            table += `
            <tr>
                <td>${team.sumOfCC}</td>
                <td>${team.teamName}</td>
                <td>${team.nameFirstDriver}</td>
                <td>${team.nameSecondDriver}</td>
                <td>${team.year}</td>
            </tr>`
        });
        return table
    }
    
    let teamsHeaderTable = () => {
        let tableHeader = `
        <tr>
            <th data-column="CountOfCC" data-order="asc">Количество КК</th>
            <th data-column="NameTeam" data-order="asc">Название</th>
            <th data-column="firstDriver" data-order="asc">Первый пилот</th>
            <th data-column="secondDriver" data-order="asc">Второй пилот</th>
            <th data-column="yearTeam" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }
    
    const teamsHeader = teamsHeaderTable()
    const teamsBody = await teamsTable()

    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${teamsHeader}
                </thead>
                <tbody id="driversTableBody">
                    ${teamsBody}
                </tbody>
            </table>`
    
}

async function searchDrivers(req) {
    
    function parsePostSearchData(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', (err) => {
                reject(err);
            });
        });
    }    
    
    let driversTableHeader = () => {
        let tableHeader = `
        <tr>
            <th data-column="number" data-order="asc">#</th>
            <th data-column="Name" data-order="asc">Имя</th>
            <th data-column="Team" data-order="asc">Команда</th>
            <th data-column="Wins" data-order="asc">Побед за сезон</th>
            <th data-column="Year" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }
    
    const dataPath = path.join(__dirname, 'dataDrivers.JSON');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const searchedDrivers = async (req) => {
        const searchData = await parsePostSearchData(req);
        let table = ""
        data.forEach(driver => {
            if(
                driver.name.toLowerCase().includes(searchData) ||
                driver.team.toLowerCase().includes(searchData) ||
                driver.wins.toString() === searchData ||
                driver.year.toString() === searchData
            ){
                console.log(`Найденный гонщик:${driver}`)
                table += `
                <tr>
                    <td>${driver.number}</td>
                    <td>${driver.name}</td>
                    <td>${driver.team}</td>
                    <td>${driver.wins}</td>
                    <td>${driver.year}</td>
                </tr>`
            }
            });
        if (!table) {
            return `<tr><td colspan="5">Ничего не найдено.</td></tr>`;
        }
        return table
    }
    

    const header = driversTableHeader()
    const foundDrivers = await searchedDrivers(req)
    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${header}
                </thead>
                <tbody id="driversTableBody">
                    ${foundDrivers}
                </tbody>
            </table>`
}

const searchTeamTotal = async (req) => {
    
    function parsePostSearchData(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', (err) => {
                reject(err);
            });
        });
    } 
    
    const dataPath = path.join(__dirname, 'dataTeams.JSON');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let searcherTeam = async (req) => {
        let table = ""
        const searchData = await parsePostSearchData(req)
        data.forEach(team => {
            if(
                team.teamName.toLowerCase().includes(searchData) ||
                team.nameFirstDriver.toLowerCase().includes(searchData) ||
                team.nameSecondDriver.toLowerCase().includes(searchData) ||
                team.sumOfCC.toString() === searchData ||
                team.year.toString() === searchData
            ){
                table += `
                <tr>
                    <td>${team.sumOfCC}</td>
                    <td>${team.teamName}</td>
                    <td>${team.nameFirstDriver}</td>
                    <td>${team.nameSecondDriver}</td>
                    <td>${team.year}</td>
                </tr>`
            }
        });
        if (!table) {
            return `<tr><td colspan="5">Ничего не найдено.</td></tr>`;
        }
        return table
    }
    let teamHeaderSearch = () => {
        let tableHeader = `
        <tr>
            <th data-column="CountOfCC" data-order="asc">Количество КК</th>
            <th data-column="NameTeam" data-order="asc">Название</th>
            <th data-column="firstDriver" data-order="asc">Первый пилот</th>
            <th data-column="secondDriver" data-order="asc">Второй пилот</th>
            <th data-column="yearTeam" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }
    const teamHeaderForSearch = teamHeaderSearch()
    const teamBodyFromSearch = await searcherTeam(req)
    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${teamHeaderForSearch}
                </thead>
                <tbody id="driversTableBody">
                    ${teamBodyFromSearch}
                </tbody>
            </table>`
}

const filterDriverTotal = async (req) => {
    
    function parsePostFilterData(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                try {
                    const parsedData = JSON.parse(body); // Парсим JSON
                    resolve(parsedData);
                } catch (err) {
                    reject(err);
                }
            });
            req.on('error', (err) => {
                reject(err);
            });
        });
    }
    
    let driversTableHeader = () => {
        let tableHeader = `
        <tr>
            <th data-column="number" data-order="asc">#</th>
            <th data-column="Name" data-order="asc">Имя</th>
            <th data-column="Team" data-order="asc">Команда</th>
            <th data-column="Wins" data-order="asc">Побед за сезон</th>
            <th data-column="Year" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }

    const dataPath = path.join(__dirname, 'dataDrivers.JSON');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const filterBodyDrivers = async (req) => {
        let table = ""
        const filterParams = await parsePostFilterData(req) 
        data.forEach(driver => {
            if(
                driver.name.toLowerCase().includes(filterParams.driverName) &&
                driver.team.toLowerCase().includes(filterParams.dataTeam) &&
                (Number(driver.wins) >= Number(filterParams.dataWinsFrom) && Number(driver.wins) <= Number(filterParams.dataWinsTo)) &&
                (Number(driver.year) >= Number(filterParams.dataYearFrom) && Number(driver.year) <= Number(filterParams.dataYearTo))
            ){
                console.log(`Найденный гонщик:${driver}`)
                table += `
                <tr>
                    <td>${driver.number}</td>
                    <td>${driver.name}</td>
                    <td>${driver.team}</td>
                    <td>${driver.wins}</td>
                    <td>${driver.year}</td>
                </tr>`
            }
            });
        if (!table) {
            return `<tr><td colspan="5">Ничего не найдено.</td></tr>`;
        }
        return table
    }
    const driverHeaderFilter = driversTableHeader()
    const driverBodyFilter = await filterBodyDrivers(req)
    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${driverHeaderFilter}
                </thead>
                <tbody id="driversTableBody">
                    ${driverBodyFilter}
                </tbody>
            </table>`
}

const filterTeamTotal = async (req) => {
    
    function parsePostFilterData(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                try {
                    const parsedData = JSON.parse(body); // Парсим JSON
                    resolve(parsedData);
                } catch (err) {
                    reject(err);
                }
            });
            req.on('error', (err) => {
                reject(err);
            });
        });
    }
    
    let teamHeaderFilter = () => {
        let tableHeader = `
        <tr>
            <th data-column="CountOfCC" data-order="asc">Количество КК</th>
            <th data-column="NameTeam" data-order="asc">Название</th>
            <th data-column="firstDriver" data-order="asc">Первый пилот</th>
            <th data-column="secondDriver" data-order="asc">Второй пилот</th>
            <th data-column="yearTeam" data-order="asc">Год</th>
        </tr>`
        return tableHeader
    }
    let table = ""
    const dataPath = path.join(__dirname, 'dataTeams.JSON');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const filterBodyTeams = async (req) => {
        const filterParams = await parsePostFilterData(req)
        data.forEach(team => {
            if(
                team.teamName.toLowerCase().includes(filterParams.teamName) &&
                team.nameFirstDriver.toLowerCase().includes(filterParams.firstDriverName) &&
                team.nameSecondDriver.toLowerCase().includes(filterParams.secondDriverName) &&
                (Number(team.sumOfCC) >= Number(filterParams.sumOfCCFrom) && Number(team.sumOfCC) <= Number(filterParams.sumOfCCTo)) &&
                (Number(team.year) >= Number(filterParams.yearsFrom) && Number(team.year) <= Number(filterParams.yearsTo))
            ){
                table += `
                <tr>
                    <td>${team.sumOfCC}</td>
                    <td>${team.teamName}</td>
                    <td>${team.nameFirstDriver}</td>
                    <td>${team.nameSecondDriver}</td>
                    <td>${team.year}</td>
                </tr>`
            }
        });
        if (!table) {
            return `<tr><td colspan="5">Ничего не найдено.</td></tr>`;
        }
        return table
    }
    const header = teamHeaderFilter()
    const filterBodyTeam = await filterBodyTeams(req)
    return `<table class="chamDriversTable" border="1" id="mainTable">
                <thead id="driversTableId">
                    ${header}
                </thead>
                <tbody id="driversTableBody">
                    ${filterBodyTeam}
                </tbody>
            </table>`
    
}


const createResponse = async (req, res) => {
    console.log(`Входящий запрос: ${req.url}`);

    if (req.url === '/') {
        res.writeHead(302, { Location: '/main' });
        res.end();
        return;
    }
    
    if (req.url === '/index.html') {
        res.writeHead(302, { Location: '/main' });
        res.end();
        return;
    }

    let filePath;
    switch (req.url) {
        case '/main':
            filePath = 'index.html';
            break;
        case '/search':
            filePath = 'index2.html';
            break;
        case '/style.css':
            filePath = 'style.css';
            break;
        case '/script.js':
            filePath = 'script.js';
            break;
        case '/dataDrivers.JSON':
            filePath = 'dataDrivers.JSON';
            break;   
        case '/dataTeams.JSON':
            filePath = 'dataTeams.JSON';
            break;   
        case "/logof1.png":
            filePath = 'logof1.png';
            break
        case "/filter":
            filePath = 'index3.html';
            break
        case '/api/driversTable':
            console.log('Обрабатывается запрос к /api/driversTable');
            try {
                const tableHtml = await generateDriversTable();
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return;
        case '/api/teamsTable':
            console.log('Обрабатывается запрос к /api/teamsTable');
            try {
                const tableHtml = await generateTeamsTable();
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return;    
        case '/searchDriver':
            console.log('Обрабатывается запрос к /api/searchDriver');
            try {
                const tableHtml = await searchDrivers(req);
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return; 
        case '/searchTeam':
            console.log('Обрабатывается запрос к /searchTeam');
            try {
                const tableHtml = await searchTeamTotal(req);
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return; 
        case '/filterDrivers':
            console.log('Обрабатывается запрос к /filterDrivers');
            try {
                const tableHtml = await filterDriverTotal(req);
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return; 
        case '/filterTeams':
            console.log('Обрабатывается запрос к /filterTeams');
            try {
                const tableHtml = await filterTeamTotal(req);
                console.log('HTML таблицы успешно создан');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(tableHtml);
            } catch (error) {
                console.error('Ошибка генерации таблицы:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при генерации таблицы');
            }
            return; 
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
            return;
    }
    
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.error(`Ошибка: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Беда');
            return;
        }

        const extname = path.extname(filePath);
        const mimeType = getMimeType(extname);

        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
};

http
    .createServer()
    .on("request", createResponse)
    .listen(port, host, () => console.log(`Server running at http://${host}:${port}`));
