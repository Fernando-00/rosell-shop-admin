import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"

import WidgetSm from "../../components/widgetSmall/WidgetSm";
import WidgetLg from "../../components/widgetLarge/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { getAuthorizationHeader, userRequest } from "../../redux/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../redux/userRedux"
import { useLocation } from "react-router-dom";


export default function Home() {
  const user = useSelector((state)=> state.persistedReducer.user.currentUser);
  const [userStats, setUserStats] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state)

  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  []
  );

  useEffect(()=>{
    const getStats = async ()=>{
      if (user){
        try {
          const res = await userRequest.get("/users/stats", {headers: {token: getAuthorizationHeader()}});
          console.log(res)
          res.data.map((item)=>
            setUserStats(prev=>[
              ...prev,
              {name:MONTHS[item._id-1], "Active User":item.total},
            ])
          );
        } catch (err) {
          console.log("Token has expired...")
          console.log("Dispatching Logout...")
          dispatch(logout());
        }
      }
      
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
        <FeaturedInfo/>
        <Chart data={userStats} title="User Analytics" gird dataKey="Active User"/>
        <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div>
    </div>
  )
}
