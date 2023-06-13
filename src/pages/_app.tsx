import { TSAccountProtectionProvider } from '@transmitsecurity/riskid-reactjs-ts';
import type { AppProps } from 'next/app';
import { Config } from '@/utils';
import React from 'react';
import Image from 'next/image';
import FormComponent from './FormComponent';
import '../App.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TSAccountProtectionProvider clientId={Config.transmitClientId}>
      <div className="App">
        <header className="App-header">
          <h2>DRS & Amazon-Verified-Permissions</h2>
          <div style={{ display: 'flex' }}>
            <Image
              src="/transmit-logo.png"
              alt="Transmit Logo"
              className="dark:invert"
              width={105}
              height={28}
              priority
            />
            <div style={{ width: '10px' }} />
            <Image
              src="/verified-permissions-logo.png"
              alt="Amazon Verified-Permissions Logo"
              className="dark:invert"
              width={30}
              height={30}
              priority
            />
          </div>
          <p>Set user and then trigger action</p>
          <FormComponent />
        </header>
      </div>
    </TSAccountProtectionProvider>
  );
}
