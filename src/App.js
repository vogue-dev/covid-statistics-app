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

	render() {
		const { data, isFetching, isLanguageRus } = this.state;

		return (
			<div className="wrapper">
				<header>
					<div className="container">
						<div className="info">
							{isLanguageRus === false ? 'Only actual information' : 'Только актуальная информация'}
						</div>
						<div className="logo">COVID STAT</div>
						<div className="language">
							<button onClick={this.onChangeLanguage}>
								Language: {isLanguageRus ? 'translate to English' : 'перевести на русский'}
							</button>
						</div>
					</div>
				</header>
				<nav>
					<div className="container">
						<div className="buttons">
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
										<th>{isLanguageRus ? 'Всего случаев' : 'TotalConfirmed'}</th>
										<th>{isLanguageRus ? 'Новых случаев' : 'NewConfirmed'}</th>
										<th>{isLanguageRus ? 'Новых смертей' : 'NewDeaths'}</th>
										<th>{isLanguageRus ? 'Всего смертей' : 'TotalDeaths'}</th>
										<th>{isLanguageRus ? 'Выздоровели сегодня' : 'NewRecovered'}</th>
										<th>{isLanguageRus ? 'Всего вылечившихся' : 'TotalRecovered'}</th>
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
