function loadCharts(persons) {
	google.charts.load('current', {'packages': ['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		const data = new google.visualization.DataTable();
		data.addColumn('date', 'Meetdag');

		const days = {};

		for (let i = 0; i < persons.length; i++) {
			const person = persons[i];
			data.addColumn('number', person.name);
			for (const weighin of person.weighins) {
				const weighinDate = new Date(Date.parse(weighin.date));
				weighinDate.setHours(0);
				weighinDate.setMinutes(0);
				weighinDate.setSeconds(0);
				weighinDate.setMilliseconds(0);
				const dateString = "" + weighinDate.getFullYear() + (weighinDate.getMonth().toString(10).length < 2 ? '0' + weighinDate.getMonth() : weighinDate.getMonth()) + weighinDate.getDate();
				if (!days.hasOwnProperty(dateString)) {
					days[dateString] = {};
					days[dateString]["date"] = weighinDate;
				}
				days[dateString][i] = {
					v: weighin.weight,
					f: `${weighin.weight}${weighin.comment && weighin.comment.length > 0 ? `\nOpmerking: ${weighin.comment}` : ""}`
				};
			}
		}

		const ddd = [];
		for (const key in days) {
			if (key.length === 8) {
				console.log(key, days[key]);
				ddd.push(key);
			} else {
				console.log('wtf', key);
			}
		}

		ddd.sort();

		// ddd.sort((a, b) => {
		// 	const dA = parseInt(a.split("-")[0], 10);
		// 	const dB = parseInt(b.split("-")[0], 10);
		// 	const mA = parseInt(a.split("-")[1], 10);
		// 	const mB = parseInt(b.split("-")[1], 10);
		//
		// 	const c = mA - mB;
		// 	if (c === 0) {
		// 		return dA - dB;
		// 	}
		// 	return c;
		// });

		for (const day of ddd) {
			const dict = days[day];
			const date = dict["date"];
			let row = [date];
			for (let i = 0; i < persons.length; i++) {
				row.push(dict.hasOwnProperty(i) ? dict[i] : null);
			}

			data.addRows([
				row
			])
		}

		// Set chart options
		const options = {
			curveType: 'function',
			legend: {position: 'bottom'},
			interpolateNulls: true,
			height: 400,
			hAxis: {
				format: 'd MMMM'
			},
			vAxis: {
				format: '##KG'
			}
		};

		// Instantiate and draw our chart, passing in some options.
		const chart = new google.visualization.LineChart(document.getElementById('chart_container'));
		chart.draw(data, options);
	}
}
