import React from 'react';
import './PriceHistoryChart.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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
		let topMargin = 20;
		let rightMargin = 40;
		let bottomMargin = 20;
		if (this.props.windowWidth > 1599) {
			width = 700;
			height = 400;
		} else if (this.props.windowWidth > 1499) {
			width = 600;
			height = 400;
		} else if (this.props.windowWidth > 1049) {
			width = 380;
			height = 340;
			topMargin = 120;
		} else if (this.props.windowWidth > 949) {
			width = 340;
			height = 280;
			topMargin = 120;
		} else if (this.props.windowWidth > 729) {
			width = 700;
			height = 250;
			topMargin = 60;
			rightMargin = 50;
		} else if (this.props.windowWidth > 469) {
			width = 400;
			height = 250;
			topMargin = 60;
			rightMargin = 50;
		} else if (this.props.windowWidth > 399) {
			width = 350;
			height = 250;
			topMargin = 60;
			rightMargin = 50;
		} else {
			width = 300;
			height = 200;
			topMargin = 100;
			rightMargin = 50;
			bottomMargin = 0;
		}
		return (
      <LineChart
        width={width}
        height={height}
        data={this.props.data}
        margin={{
          top: topMargin, right: rightMargin, left: 0, bottom: bottomMargin,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip content={<PriceTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#00AA00" activeDot={{ r: 8 }} dot={null} />
      </LineChart>
    );
	}
}

export default PriceHistoryChart;
