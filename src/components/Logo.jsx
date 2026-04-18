import React from 'react';
import logoProfileTrans from '../assets/logoProfile-transparent.png';

export default function Logo({ width = 50, height = 50, theme = 'dark' }) {
    return (
        <div
            style={{
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={logoProfileTrans}
                alt="Logo"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
            />
        </div>
    );
}
