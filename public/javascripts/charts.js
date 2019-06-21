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
			for (let j = 0; j < person.weighins.length; j++) {
				const weighin = person.weighins[j];
				const weighinDate = new Date(Date.parse(weighin.date));
				weighinDate.setHours(0);
				weighinDate.setMinutes(0);
				weighinDate.setSeconds(0);
				weighinDate.setMilliseconds(0);
				const dateString = weighinDate.getDate() + "-" + weighinDate.getMonth();
				if (!days.hasOwnProperty(dateString)) {
					days[dateString] = {};
					days[dateString]["date"] = weighinDate;
				}
				days[dateString][i] = weighin.weight;
			}
		}

		for (const key in days) {
			if (key.match(/\d{1,2}-\d{1,2}/g).length > 0) {
				const dict = days[key];
				const date = dict["date"];
				let row = [date];
				for (let i = 0; i < persons.length; i++) {
					row.push(dict.hasOwnProperty(i) ? dict[i] : null);
				}

				data.addRows([
					row
				])
			}
		}
		// var today = new Date(Date.now());
		// var tomorrow = new Date(Date.now());
		// tomorrow.setDate(28);
		// data.addRows([
		// 	[today, 3, 8],
		// 	[tomorrow, undefined, 5],
		// 	[tomorrow, 6, undefined],
		// ]);

		// Set chart options
		const options = {
			curveType: 'function',
			legend: {position: 'bottom'},
			interpolateNulls: true,
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
