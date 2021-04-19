const names = document.querySelector('[data-search]');
const submit = document.querySelector('[data-submit]');
const stats = document.getElementById('container1');
const seasonsName = document.getElementById('nameof');
submit.disabled = true;

submit.addEventListener('click', button => {
    const nameSearch = names.value;
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

        const [{ games_played, season, min, reb, ast, stl, blk, turnover, pf, pts, fg_pct, fg3_pct, ft_pct }] = data;

        document.querySelector('#gp > h3').innerHTML = games_played;
        document.querySelector('#season > h3').innerHTML = season;
        document.querySelector('#min > h3').innerHTML = min;
        document.querySelector('#reb > h3').innerHTML = reb;
        document.querySelector('#ast > h3').innerHTML = ast;
        document.querySelector('#stl > h3').innerHTML = stl;
        document.querySelector('#blk > h3').innerHTML = blk;
        document.querySelector('#turnover > h3').innerHTML = turnover;
        document.querySelector('#pf > h3').innerHTML = pf;
        document.querySelector('#pts > h3').innerHTML = pts;
        document.querySelector('#fg_pct > h3').innerHTML = fg_pct;
        document.querySelector('#fg3_pct > h3').innerHTML = fg3_pct;
        document.querySelector('#ft_pct > h3').innerHTML = ft_pct;

    } catch (error) {
        console.log(error)
    }
}

const getPlayerInfo = async newurl => {
    try {
        const response = await fetch(newurl);
        const { data } = await response.json();

        const [{ first_name, id, last_name, position, height_feet, height_inches, weight_pounds, team: { full_name } }] = data;

        document.getElementById('name').textContent = `${first_name} ${last_name} |`;
        document.getElementById('position').textContent = `Position: ${position} |`;
        document.getElementById('height_feet').textContent = `Height: ${height_feet} ' ${height_inches} |`;
        document.getElementById('weight_pounds').textContent = `Weight: ${weight_pounds} lbs |`;
        document.getElementById('full_name').textContent = `Team: ${full_name}`;

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