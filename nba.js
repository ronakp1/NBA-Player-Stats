const names = document.querySelector('[data-search]');
const submit = document.querySelector('[data-submit]');
const stats = document.getElementById('container1');
const seasonsName = document.getElementById('nameof');

submit.addEventListener('click', button => {
    const nameSearch = names.value;
    const newurl = `https://www.balldontlie.io/api/v1/players?search=${nameSearch};`
    //stats.style.display = block;
    stats.classList.remove('hide');
    seasonsName.classList.remove('hide');
    getPlayerInfo(newurl);
    const bar = document.getElementById('results');
    bar.classList.add('hide');
})

async function getSeasonAverages(player_id) {
    try {
        const seasonsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player_id}`;
        const response = await fetch(seasonsURL)
        const { data } = await response.json();
        //const docSelec = document.querySelector;
        document.querySelector('#gp > h3').innerHTML = data[0].games_played;
        document.querySelector('#season > h3').innerHTML = data[0].season;
        document.querySelector('#min > h3').innerHTML = data[0].min;
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
        const data = await response.json();

        document.getElementById('name').textContent = `${data.data[0].first_name} ${data.data[0].last_name} |`;
        document.getElementById('position').textContent = `Position: ${data.data[0].position} |`;
        document.getElementById('height_feet').textContent = `Height: ${data.data[0].height_feet} ' ${data.data[0].height_inches} |`;
        document.getElementById('weight_pounds').textContent = `Weight: ${data.data[0].weight_pounds} lbs |`;
        document.getElementById('full_name').textContent = `Team: ${data.data[0].team.full_name}`;
        const player_id = data.data[0].id;
        getSeasonAverages(player_id)
    } catch (error) {
        console.log(error)
    }
}


const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

async function getListOfPlayers() {
    try {
        const playerName = names.value;
        const response = await fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&search=${playerName}`);
        const data = await response.json();
        const bar = document.getElementById('results');
        if (playerName.length > 2) {
            for (let player of data.data) {
                const dropDown = document.createElement("a");
                if (player.id <= 493 || player.id >= 666604) {
                    bar.classList.remove('hide');
                   dropDown.classList.add('dropdown');

                    dropDown.innerHTML = `${player.first_name} ${player.last_name} - ${player.team.abbreviation}`;

                    dropDown.addEventListener('click', () => {
                        bar.classList.add('hide');
                        names.value = `${player.first_name} ${player.last_name}`;
                        
                    })
                    bar.appendChild(dropDown);
                }
            }
        }
        if (playerName.length == 0 && playerName.length < 3) {
            //console.log("test");
            const test2 = document.querySelectorAll('a').forEach(e =>
                e.remove());

        }
    } catch (error) {
        console.log(error)
    }
}

names.addEventListener('input', debounce(getListOfPlayers, 100));