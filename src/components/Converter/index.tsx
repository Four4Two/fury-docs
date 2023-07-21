import React, { useState } from 'react';
import { ethers } from 'ethers';
import bech32 from 'bech32';
import classes from './styles.module.css';

function furyToEthAddress(furyAddress: string) {
  return ethers.utils.getAddress(
    ethers.utils.hexlify(bech32.fromWords(bech32.decode(furyAddress).words))
  );
}

function ethToFuryAddress(ethereumAddress: string) {
  return bech32.encode(
    'fury',
    bech32.toWords(
      ethers.utils.arrayify(ethers.utils.getAddress(ethereumAddress))
    )
  );
}

export default function Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    try {
      if (input.startsWith('fury')) {
        setOutput(furyToEthAddress(input));
      } else {
        setOutput(ethToFuryAddress(input));
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(output).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  return (
    <div>
      <div className={classes.inputContainer}>
        <div>
          <input
            className={classes.addrinput}
            type="text"
            placeholder="Enter 0x or Fury address"
            onChange={handleChange}
            value={input}
          />
          <button
            className={classes.inputbtn}
            disabled={
              input.startsWith('0x') || input.startsWith('fury') ? false : true
            }
            onClick={handleSubmit}
          >
            Convert
          </button>
        </div>
        <div>
          <input
            className={classes.addrinput}
            type="text"
            readOnly
            placeholder="Derived address results"
            value={output}
          />
          <button
            className={classes.inputbtn}
            disabled={!output.length}
            onClick={handleCopy}
          >
            {' '}
            Copy{' '}
          </button>
        </div>
        {errorMsg.length ? (
          <div className={classes.errorMsg}>
            <svg
              className={classes.errorMsgText}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p className={classes.errorMsgText}>{errorMsg}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
