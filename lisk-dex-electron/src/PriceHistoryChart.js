
import React from 'react';
// import PropTypes from 'prop-types';

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from 'react-stockcharts';
import { LineSeries, BarSeries } from 'react-stockcharts/lib/series';
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
	CurrentCoordinate,
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

class PriceHistoryChart extends React.Component {
	render() {
		let { type, width, data: initialData, ratio } = this.props;
    let xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.timestamp));

    if (!initialData || !initialData.length) {
      return '';
    }

    let {
      data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		let xExtents = [
			xAccessor(last(data)),
			xAccessor(data[Math.max(data.length - 100, 0)])
		];

		return (
			<ChartCanvas height={400}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName={this.props.market}
					data={data}
          pointsPerPxThreshold={1}
          displayXAccessor={displayXAccessor}
					xAccessor={xAccessor}
					xScale={xScale}
					xExtents={xExtents}>

				<Chart id={1} yExtents={d => d.price}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6} stroke="#FFFFFF" tickStroke="#FFFFFF" />
					<YAxis axisAt="left" orient="left" ticks={5} tickStroke="#FFFFFF" />

          <LineSeries yAccessor={d => d.price} stroke="#FFFFFF" />

          <MouseCoordinateX
						at="bottom"
						orient="bottom"
					  stroke="#FFFFFF"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						stroke="#FFFFFF"
						displayFormat={format(".2f")} />

					<CurrentCoordinate yAccessor={xAccessor} fill="#FFFFFF" />
					<CurrentCoordinate yAccessor={d => d.price} fill="#FFFFFF" />
				</Chart>

				<Chart id={2} yExtents={d => d.volume} height={100} origin={(w, h) => [0, h - 100]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} tickStroke="#FFFFFF" />
					<BarSeries
						yAccessor={d => d.volume}
						fill="#FFFFFF" />
				</Chart>

				<CrossHairCursor stroke="#FFFFFF" />
			</ChartCanvas>
		);
	}
}

PriceHistoryChart = fitWidth(PriceHistoryChart);

export default PriceHistoryChart;
