import React from 'react';
import './PriceHistoryChart.css';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const PriceTooltip = ({ active, payload, label }) => {
	if (!active || !payload) {
		return null;
	}
	return (
		<div className="price-tooltip">
			<p className="time"><b>Chain time:</b> {`${label}`}</p>
			<p className="price"><b>Price:</b> {`${payload[0].value}`}</p>
			<p className="volume"><b>Volume:</b> {`${payload[0].payload.volume}`}</p>
		</div>
	);
};

class PriceHistoryChart extends React.PureComponent {
	render() {
		let width;
		let height;
		if (this.props.windowWidth > 1599) {
			width = 700;
			height = 400;
		} else if (this.props.windowWidth > 1499) {
			width = 600;
			height = 400;
		} else if (this.props.windowWidth > 1049) {
			width = 380;
			height = 340;
		} else if (this.props.windowWidth > 949) {
			width = 340;
			height = 280;
		} else if (this.props.windowWidth > 729) {
			width = 700;
			height = 250;
		} else if (this.props.windowWidth > 469) {
			width = 400;
			height = 250;
		} else if (this.props.windowWidth > 399) {
			width = 350;
			height = 250;
		} else {
			width = 300;
			height = 200;
		}
		return (
			<div style={{position: 'relative'}}>
	      <LineChart
	        width={width}
	        height={height}
	        data={this.props.data}
					style={{position: 'relative', zIndex: 110}}
	      >
	        <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
	        <XAxis dataKey="timestamp" />
	        <YAxis />
	        <Tooltip content={<PriceTooltip />} />
	        <Line type="monotone" dataKey="price" stroke="#009900" strokeWidth={2} activeDot={{ r: 4 }} dot={null} />
	      </LineChart>

				<BarChart width={width - 53} height={height/5} data={this.props.data} style={{position: 'absolute', bottom: '39px', left: '57px', zIndex: 100}}>
	        <Bar dataKey="volume" fill="#999999" />
	      </BarChart>
			</div>
    );
	}
}

export default PriceHistoryChart;
