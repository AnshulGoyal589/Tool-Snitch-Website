"use client"

import { useEffect, useState } from "react"
import { api } from "@/api/api";
import Link from 'next/link';
import { getUserSession } from "@/utils/auth";
interface appointment {
    date: Date,
    time: string,
    _id: string
}
interface order {
    appointmentDetails: appointment,
    createdAt: Date,
    createdBy: string,
    device: string,
    issue: string,
    message: string,
    shopId: string,
    shopName: string,
    status: string,
    address:string,
    __v: number,
    _id: string,
    price:number,
    cancelled:boolean
}
export default function OrderHistory() {
    const [orders, setOrders] = useState<order[] | null>(null)
    const [error,setError]=useState<string |null>(null);
    const [notifyMe,setNotifyMe]=useState<boolean>(false);
    const [reviewed,setReviewed]=useState<boolean>(false);
    // console.log(orders);
    // console.log(error)
    useEffect(() => {
        async function getOrders() {
            try{
            const cogI = await getUserSession();
            const response = await api.get(`/order-history/${cogI}`);
            setOrders(response.data);}
            catch(err:any){
                setError(err.message);
            }
        }
        getOrders();
    }, [])
    useEffect(()=>{
        async function fetchNotif(){
        try{
          console.log("Howdy there")
          const cognitoId=await getUserSession();
          const response=await api.get(`/is-to-be-notified/${cognitoId}`)
          setNotifyMe(response.data)
        }
        catch(err){
          setNotifyMe(false);
        }}
        fetchNotif();
    },[])
    useEffect(()=>{
        async function disableReview(){
            if(reviewed){
                setReviewed(false);
                try{
                    const cognitoId=await getUserSession();
                    const response=await api.post(`/update-to-be-notified/${cognitoId}`)
                    setNotifyMe(response.data);
                }
                catch(err){
                    setNotifyMe(true);
                    console.log(err)
                }
            }
        }
        disableReview()
    },[reviewed])
    if(!orders && !error){
        return (
        <>
        <h1 className="fetch">Fetching Order History...</h1>
        </>)
    }
    return (
        <div className="orders-con bg-[rgb(250,250,250)] h-screen">
        <hr />
        {notifyMe?(
            <div style={{
                width:"100%",
                textAlign:"center",
                backgroundColor:"red",
                height:"6vh",
                color:"white",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
              }}>I have reviewed the cancellations &nbsp;
                <button onClick={()=>{setReviewed(true)}} 
                style={{border:"1px solid white",borderRadius:"6px",padding:"0.4%",backgroundColor:"white",color:"red"}}>
                    CONFIRM</button>
            </div>
        ):null}
    {orders ? orders.map((element) => {
        if(element.cancelled){
            return (
                <Link href={`/orders/${element._id}`}>
                <div  key={element._id}  className="order w-[80vw] ml-[10vw] h-[250px] mt-[60px] mb-[-20px] rounded-lg shadow-[0px_0px_10px_rgb(255,0,0)]  bg-white flex hover:scale-[1.02] transition-transform duration-150">
                <div className="shop flex-1 border-b-2 border-l-2 border-t-2 border-[goldenrod] rounded-tl-lg rounded-bl-lg flex items-center justify-center flex-col text-center text-gray-600">
                    <h1 className="text-black text-2xl uppercase font-bold">{element.shopName}</h1>
                    {element.address}
                </div>
                <div className="main-body flex-[2.3] grid grid-rows-[2fr_1fr] grid-cols-[1fr_2fr]">
                    <div className="device bg-[rgb(196,148,29)] flex justify-center items-center text-white text-lg font-semibold flex-col capitalize">
                        <span className="text-sm font-semibold">Device Name:</span>
                        <p>{element.device}</p>
                    </div>
                    <div className="issue flex justify-center items-center text-center text-lg flex-col capitalize text-red-500">
                        <p className="text-red">
                             The appointment has been cancelled due to temporary closure of {element.shopName}
                        </p>
                    </div>
                    <div className="details col-span-2 bg-[rgb(40,40,40)] flex justify-center items-center flex-col">
                        <p className="text-gray-300 text-sm">Appointment Timings:</p>
                        <p className="text-white text-lg">
                            {element.appointmentDetails.time}, {new Date(element.appointmentDetails.date).toDateString()}
                        </p>
                    </div>
                </div>
                <div className="status flex-[0.7] flex flex-col">
                    <div className="price flex-1 bg-gray-400 text-white font-bold text-2xl flex flex-col justify-center items-center">
                        <span className="text-sm">Price Amount:</span> ₹{element.price}
                    </div>
                    <div className="completed flex-1 text-[goldenrod] border border-gray-300 uppercase flex flex-col justify-center items-center font-bold text-xl text-center">
                        <span className="capitalize text-sm mb-[-4]">Appointment Status:</span>
                        {element.status}
                    </div>
                </div>
            </div>
            </Link>
            )
        }
        return (
            <Link href={`/orders/${element._id}`}>
            <div  key={element._id}  className="order w-[80vw] ml-[10vw] h-[250px] mt-[60px] mb-[-20px] rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)]  bg-white flex hover:scale-[1.02] transition-transform duration-150">
                
                <div className="shop flex-1 border-b-2 border-l-2 border-t-2 border-[goldenrod] rounded-tl-lg rounded-bl-lg flex items-center justify-center flex-col text-center text-gray-600">
                    <h1 className="text-black text-2xl uppercase font-bold">{element.shopName}</h1>
                    {element.address}
                </div>
                <div className="main-body flex-[2.3] grid grid-rows-[2fr_1fr] grid-cols-[1fr_2fr]">
                    <div className="device bg-[rgb(196,148,29)] flex justify-center items-center text-white text-lg font-semibold flex-col capitalize">
                        <span className="text-sm font-semibold">Device Name:</span>
                        <p>{element.device}</p>
                    </div>
                    <div className="issue flex justify-center items-center text-center text-lg flex-col capitalize">
                        <p className="text-gray-600 text-sm mb-3 p-2 w-[40%] border-b border-[goldenrod]">Reported Issues:</p>
                        <ul>
                            {element.issue.split(',').map((e, index) => (
                                <li key={index}>{e}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="details col-span-2 bg-[rgb(40,40,40)] flex justify-center items-center flex-col">
                        <p className="text-gray-300 text-sm">Appointment Timings:</p>
                        <p className="text-white text-lg">
                            {element.appointmentDetails.time}, {new Date(element.appointmentDetails.date).toDateString()}
                        </p>
                    </div>
                </div>
                <div className="status flex-[0.7] flex flex-col">
                    <div className="price flex-1 bg-gray-400 text-white font-bold text-2xl flex flex-col justify-center items-center">
                        <span className="text-sm">Price Amount:</span> ₹{element.price}
                    </div>
                    <div className="completed flex-1 text-[goldenrod] border border-gray-300 uppercase flex flex-col justify-center items-center font-bold text-xl text-center">
                        <span className="capitalize text-sm mb-[-4]">Appointment Status:</span>
                        {element.status}
                    </div>
                </div>
            </div>
            </Link>
        );
    }) : (
        <div>Error fetching Order-History, please try again later</div>
    )}
</div>

    )
}
// const OrderSchema = new mongoose.Schema({
//     message: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     createdBy: { type: String , required:true },
//     device: { type: String, required: true },
//     issue: { type: String, required: true },
//     status: { type: String, default : 'pending' },
//     appointmentDetails: {
//       type: {
//         date: { type: Date , required:true },
//         time: { type: String , required : true }
//       }
//     }
//   });
// <div className="orders-con">
        //     <hr />
        //     {orders?orders.map((element)=>{
        //         return (
        //                     <div className="order">
        //                     <div className="shop">
        //                         <h1>{element.shopName}</h1>
        //                         {element.address}
        //                     </div>
        //                     <div className="main-body">
        //                         <div className="device">
        //                             <span> Device Name:</span>
        //                             <p>
        //                                 {element.device}
        //                             </p>
        //                         </div>
        //                         <div className="issue">
        //                             <p>Reported Issues:</p>
        //                             <ul>
        //                                 {element.issue.split(',').map((e)=>{
        //                                     return (<li>{e}</li>)
        //                                 })}
        //                             </ul>
        //                         </div>
        //                         <div className="details">
        //                             <p> Appointment Timings:</p>
        //                             <p>
        //                                 {element.appointmentDetails.time}, {new Date(element.appointmentDetails.date).toDateString()}
        //                             </p>
        //                         </div>
        //                     </div>
        //                     <div className="status">
        //                         <div className="price">
        //                             <span>Price Amount:</span>
        //                             ₹{element.price}
        //                         </div>
        //                         <div className="completed">
        //                             <span>Appointment Status:</span>
        //                             <br />
        //                             {element.status}
        //                         </div>
        //                     </div>
        //                 </div>)
        //     }):
        //     <>
        //     Error fetching Order-History, please try again later
        //     </>}
        // </div>