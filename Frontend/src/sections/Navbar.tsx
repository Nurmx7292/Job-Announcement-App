import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { PiDevToLogoFill } from "react-icons/pi";

export const Navbar:React.FC = (props) => {
  const navRoutes = [
    {
      name:"Post a job",
      route:"/post"
    },{
      name:"About",
      route:"/about"
    },
    {
      name:"Sign in",
      route:"/sign-in"
    }
    ,{
      name:"Log in",
      route: "/login"
    } 
  ]

  return (
    <div className='navbar'>
      <PiDevToLogoFill className="size-20"/>
      <div className='flex justify-around gap-5'>
        {
          navRoutes.map(x=>{
            if(!x.name.includes("in"))return <NavLink to={x.route} className={({isActive})=>{
              if(isActive) return "p-5 underline"
              return "p-5"
            }}>{x.name}</NavLink>
            return <Link  to={x.route} className='p-5 bg-black bg-opacity-60 font-medium rounded-2xl bold text-white'>{x.name}</Link>
          })
        }
      </div>
    </div>
  )
}