import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <>
      <div><Header isRender={ false } namePage="Profile" /></div>
      <div><Footer /></div>
    </>
  );
}
