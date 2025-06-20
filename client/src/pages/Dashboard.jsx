import React from 'react';
import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import DashProfile from '../components/DashProfile';


export default function Dashboard() {

  return (
    <div className='flex flex-col sm:flex-row gap-2 w-full min-h-screen '> 
       <DashProfile/>
    </div>
  )
}
