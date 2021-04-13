//const api_url = 'https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=237';
const api_url = 'https://www.balldontlie.io/api/v1/players?search=';
const api_url1 = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=';
const names = document.querySelector('[data-search]');
const submit = document.querySelector('[data-submit]');
const divs = document.getElementsByClassName('stats');
const test1 = document.getElementById('test1');

submit.addEventListener('click', button => {
    const nameSearch = names.value;
    const newurl = api_url + nameSearch;
    console.log(nameSearch);
    console.log(newurl);
    getPlayerInfo(newurl);
})

async function getSeasonAverages(player_id) {
    var html1 = ''
    try {
        console.log(player_id)
        const seasonsURL = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + player_id;
        console.log(seasonsURL)
        const response = await fetch(seasonsURL)
        const { data } = await response.json();
        document.querySelector('#gp > h3').innerHTML = data[0].games_played;
        //document.querySelector('#player_id > h3').innerHTML = data[0].player_id;
        document.querySelector('#season > h3').innerHTML = data[0].season;
        document.querySelector('#min > h3').innerHTML = data[0].min;
        //document.querySelector('#fgm > h3').innerHTML = data[0].fgm;
        //document.querySelector('#fga > h3').innerHTML = data[0].fga;
        //document.querySelector('#fg3a > h3').innerHTML = data[0].fg3a;        
        //document.querySelector('#fg3m > h3').innerHTML = data[0].fg3m;
        //document.querySelector('#ftm > h3').innerHTML = data[0].ftm;
        //document.querySelector('#fta > h3').innerHTML = data[0].fta;
       // document.querySelector('#oreb > h3').innerHTML = data[0].oreb;
       // document.querySelector('#dreb > h3').innerHTML = data[0].dreb;
        document.querySelector('#reb > h3').innerHTML = data[0].reb;
        document.querySelector('#ast > h3').innerHTML = data[0].ast;
        document.querySelector('#stl > h3').innerHTML = data[0].stl;
        document.querySelector('#blk > h3').innerHTML = data[0].blk;
        document.querySelector('#turnover > h3').innerHTML = data[0].turnover;
        document.querySelector('#pf > h3').innerHTML = data[0].pf;
        document.querySelector('#pts > h3').innerHTML = data[0].pts;
        document.querySelector('#fg_pct > h3').innerHTML = data[0].fg_pct;
        document.querySelector('#fg3_pct > h3').innerHTML = data[0].fg3_pct;
        document.querySelector('#ft_pct > h3').innerHTML = data[0].ft_pct;


    } catch (error) {
        console.log(error)
    }
}

async function getPlayerInfo(newurl) {
    try {
        const response = await fetch(newurl);
        //console.log(response);
        const data = await response.json();
        //console.log(data);

        document.getElementById('name').textContent = `${data.data[0].first_name} ${data.data[0].last_name}`;
        //document.getElementById('surname').textContent = data.data[0].last_name;
        document.getElementById('position').textContent = `Position: ${data.data[0].position}`;
        document.getElementById('height_feet').textContent = `Height: ${data.data[0].height_feet} ${data.data[0].height_inches}`;
        //document.getElementById('height_inches').textContent = data.data[0].height_inches;
        document.getElementById('weight_pounds').textContent = `Weight: ${data.data[0].weight_pounds}`;
        document.getElementById('full_name').textContent = `Team: ${data.data[0].team.full_name}`;
        const player_id = data.data[0].id;
        getSeasonAverages(player_id)
    } catch (error) {
        console.log(error)
    }
}

