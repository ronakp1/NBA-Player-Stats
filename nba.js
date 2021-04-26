const names = document.querySelector('[data-search]');
const submit = document.querySelector('[data-submit]');
const seasonsName = document.getElementById('nameof');
const stats = document.getElementById('container1');

submit.disabled = true;

submit.addEventListener('click', button => {
    const nameSearch = names.value; //stores the searched name
    const newurl = `https://www.balldontlie.io/api/v1/players?search=${nameSearch};`
    stats.classList.remove('hide'); 
    seasonsName.classList.remove('hide');
    getPlayerInfo(newurl);
    const bar = document.getElementById('results');
    bar.classList.add('hide');
})

const getSeasonAverages = async player_id => {
    try {
        const seasonsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player_id}`;
        const response = await fetch(seasonsURL)
        const { data } = await response.json();

        const currentArray = { games_played, season, min, reb, ast, stl, blk, turnover, pf, pts, fg_pct, fg3_pct, ft_pct } = data;

        const keysToIterate = ["games_played", "season", "min", "reb", "ast", "stl", "blk", "turnover", "pf", "pts", "fg_pct", "fg3_pct", "ft_pct"];

        const values = Object.keys(currentArray[0]).filter(a => keysToIterate.includes(a)).map(a => currentArray[0][a]);

        let i = 0;
        keysToIterate.forEach(key => {
            stats1 = document.createElement('div');
            stats1.classList.add('stats');
            stats.appendChild(stats1);

            eh4 = document.createElement('h4');
            eh4.innerHTML = key;
            eh3 = document.createElement('h3');
            eh3.innerHTML = values[i];
            i++;

            stats1.appendChild(eh4);
            stats1.appendChild(eh3);
        })

    } catch (error) {
        console.log(error)
    }
}

const getPlayerInfo = async newurl => {
    try {
        const response = await fetch(newurl);
        const { data } = await response.json();

        const [{ first_name, id, last_name, position, height_feet, height_inches, weight_pounds, team: { full_name } }] = data;

        const pName = document.getElementById('name');
        const pPosition = document.getElementById('position');
        const height = document.getElementById('height_feet');
        const weight = document.getElementById('weight_pounds');
        const pFull_name = document.getElementById('full_name');

        pName.textContent = `${first_name} ${last_name} |`;
        pPosition.textContent = `Position: ${position} |`;
        height.textContent = `Height: ${height_feet} ' ${height_inches} |`;
        weight.textContent = `Weight: ${weight_pounds} lbs |`;
        pFull_name.textContent = `Team: ${full_name}`;

        getSeasonAverages(id)
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

const getListOfPlayers = async () => {
    try {
        const playerName = names.value;
        const response = await fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&search=${playerName}`);
        const { data } = await response.json();

        const bar = document.getElementById('results');
        document.querySelectorAll('a').forEach(e =>
            e.remove());
        if (playerName.length > 2 && playerName.length != 0) {
            for (let player of data) {
                const dropDown = document.createElement("a");
                if (player.id <= 493 || player.id >= 666604) {
                    bar.classList.remove('hide');
                    dropDown.classList.add('dropdown');

                    dropDown.innerHTML = `${player.first_name} ${player.last_name} - ${player.team.abbreviation}`;
                    submit.disabled = true;

                    dropDown.addEventListener('click', () => {
                        bar.classList.add('hide');
                        document.querySelectorAll('a').forEach(e =>
                            e.remove());
                        names.value = `${player.first_name} ${player.last_name}`;
                        submit.disabled = false;
                    })
                    bar.appendChild(dropDown);
                }
            }
        }
        if (playerName.length == 0 && playerName.length < 3) {
            document.querySelectorAll('a').forEach(e =>
                e.remove());

        }
    } catch (error) {
        console.log(error)
    }
}

names.addEventListener('input', debounce(getListOfPlayers, 500));
document.addEventListener('click', event => {
    const test2 = document.querySelectorAll('a').forEach(e =>
        e.remove());
})