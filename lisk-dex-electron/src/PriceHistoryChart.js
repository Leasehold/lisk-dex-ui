
import React from 'react';
// import PropTypes from 'prop-types';

import { scaleTime } from 'd3-scale';
import { utcMinute } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';

class PriceHistoryChart extends React.Component {
	render() {
		let { type, width, data, ratio } = this.props;

    let startTime = Date.now();
    let interval = 1000 * 60;

    // TODO 222 render no data view if data is empty array
    data = [
      {
        absoluteChange: "",
        close: 1025,
        date: new Date(startTime),
        dividend: "",
        high: 1050,
        low: 1000,
        open: 1000,
        percentChange: "",
        split: "",
        volume: 31409100
      }
    ];
    for (let i = 1; i < 101; i++) {
      let open = data[i - 1].close;
      let low = open - Math.random() * 99;
      let high = open + Math.random() * 99;
      let close;
      if (Math.random() < .5) {
        close = Math.min(open + Math.random() * 99, high);
      } else {
        close = Math.max(open - Math.random() * 99, low);
      }
      data.push({
        absoluteChange: "",
        date: new Date(startTime + i * interval),
        dividend: "",
        high,
        low,
        open,
        close,
        percentChange: "",
        split: "",
        volume: Math.random() * 100000000
      });
    }

		let xAccessor = d => d.date;
		let xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 100] || data[0])
		];
		return (
			<ChartCanvas height={400}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					xScale={scaleTime()}
					xExtents={xExtents}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6} stroke="#FFFFFF" tickStroke="#FFFFFF" />
					<YAxis axisAt="left" orient="left" ticks={5} tickStroke="#FFFFFF" />
					<CandlestickSeries
            width={timeIntervalBarWidth(utcMinute)}
            stroke={d => d.close > d.open ? "#289913" : "#AA0D0D"}
						wickStroke={d => d.close > d.open ? "#289913" : "#AA0D0D"}
						fill={d => d.close > d.open ? "#289913" : "#AA0D0D"}
          />
				</Chart>
			</ChartCanvas>
		);
	}
}

PriceHistoryChart = fitWidth(PriceHistoryChart);

export default PriceHistoryChart;
