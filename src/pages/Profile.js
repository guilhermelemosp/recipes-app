import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileComponent from '../components/Profile';

export default function Profile() {
  return (
    <>
      <div><Header isRender={ false } namePage="Profile" /></div>
      <div><ProfileComponent /></div>
      <div><Footer /></div>
    </>
  );
}
