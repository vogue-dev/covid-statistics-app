import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isFetching: true,
			isLanguageRus: true, // false = eng // true = rus
		};
	}

	componentDidMount() {
		const gettingData = async () => {
			await fetch('https://api.covid19api.com/summary').then((response) =>
				response.json().then((response) =>
					this.setState({
						data: response,
						isFetching: false,
					})
				)
			);

			// console.log(this.state.data.Countries[139]);
		};
		gettingData();
	}

	onChangeLanguage = () => {
		this.setState({ isLanguageRus: !this.state.isLanguageRus });
	};

	onSearch = () => {};

	sortBy = () => {};

	render() {
		const { data, isFetching, isLanguageRus } = this.state;

		return (
			<div className="wrapper">
				<header>
					<div className="container">
						<div className="info">
							{isLanguageRus === false ? 'The most recent data!' : 'Самые свежие данные!'}
						</div>
						<div className="logo">COVID STAT</div>
						<div className="language">
							<button onClick={this.onChangeLanguage}>
								Language: {isLanguageRus ? 'English' : 'Русский'}
							</button>
						</div>
					</div>
				</header>
				<nav>
					<div className="container">
						<div className="buttons">
							<div className="search">
								{isLanguageRus ? 'Поиск по стране:' : 'Search by country: '}
								<input></input>
							</div>
							<button>{isLanguageRus ? 'Таблица' : 'Table'}</button>
							<button>{isLanguageRus ? 'На карте' : 'Map'}</button>
							{/* <button>NewConfirmed & TotalConfirmed</button>
							<button>NewDeaths & TotalDeaths</button>
							<button>NewRecovered & TotalRecovered</button> */}
						</div>
					</div>
				</nav>
				<main>
					<div className="container">
						<section>
							<table cellSpacing="0" border="1">
								<tbody>
									<tr>
										<th>{isLanguageRus ? 'Страна' : 'Country'}</th>
										<th>{isLanguageRus ? 'Всего случаев' : 'Total Confirmed'}</th>
										<th>{isLanguageRus ? 'Новых случаев' : 'New Confirmed'}</th>
										<th>{isLanguageRus ? 'Новых смертей' : 'New Deaths'}</th>
										<th>{isLanguageRus ? 'Всего смертей' : 'Total Deaths'}</th>
										<th>{isLanguageRus ? 'Выздоровели сегодня' : 'New Recovered'}</th>
										<th>{isLanguageRus ? 'Всего вылечившихся' : 'Total Recovered'}</th>
									</tr>
									{isFetching ? (
										<tr>
											<td>Country43434</td>
											<td>555</td>
											<td>41233</td>
											<td>41233</td>
											<td>41233</td>
											<td>41233</td>
											<td>41233</td>
										</tr>
									) : (
										data.Countries &&
										data.Countries.map((eachCountry) => (
											<tr>
												<td>{eachCountry.Country}</td>
												<td>{eachCountry.TotalConfirmed}</td>
												<td>{eachCountry.NewConfirmed}</td>
												<td>{eachCountry.NewDeaths}</td>
												<td>{eachCountry.TotalDeaths}</td>
												<td>{eachCountry.NewRecovered}</td>
												<td>{eachCountry.TotalRecovered}</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</section>
					</div>
				</main>
				<footer>
					<div className="container">
						<div className="center">made by vogue-dev</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
