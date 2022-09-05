import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { useState } from "react"
import { useEffect } from "react";
import { getAuthorizationHeader, userRequest } from "../../redux/requestMethods";

export default function FeaturedInfo() {

    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(()=>{
        const getIncome = async ()=>{
            try {
                const res = await userRequest.get("orders/income", {headers: {token: getAuthorizationHeader()}});
                console.log(res.data)
                
                res.data.sort((a, b) => a._id - b._id);
                setIncome(res.data);
                setPerc((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (err) {
                console.log(err);
            }
        }
        console.log(income)
        getIncome();
        
    }, [])

  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">${income[1]?.total}</span>
                <span className="featuredMoneyRate">%{Math.floor(perc)}{" "} 
                {perc < 0 ?(
                    <ArrowDownward className="featuredIcon negative"/>
                ): <ArrowUpward className="featuredIcon"/>}
                </span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$4,415</span>
                <span className="featuredMoneyRate">-1.4 <ArrowDownward className="featuredIcon negative"/></span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">+2.4 <ArrowUpward className="featuredIcon"/></span>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
    </div>
  )
}
