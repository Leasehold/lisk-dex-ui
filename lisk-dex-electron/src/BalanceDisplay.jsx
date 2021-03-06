import React from 'react';
import userContext from './context';
import { formatThousands } from './Utils';
import './App.css';

export default class BalanceDisplay extends React.Component {
  static contextType = userContext;

  interval = undefined;

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div style={{ color: '#FFFFFF', marginBottom: '10px' }}>
          Wallet address:
          {' '}
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {this.props.walletAddress}
          </span>
        </div>
        <div style={{ color: '#FFFFFF', marginBottom: '10px' }}>
          Balance:
          {' '}
          <span style={{ fontWeight: 'bold' }}>
            {this.props.balance == null ? 'Loading...' : `${formatThousands(Math.round((this.props.balance * 100) / this.props.whole) / 100)} ${this.props.asset.toUpperCase()}`}
          </span>
        </div>
      </div>
    );
  }
}
