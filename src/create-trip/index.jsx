import React from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, selectBudgetoption, SelectTravelList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/aimodel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { useGoogleLogin } from '@react-oauth/google';
  




function CreateTrip() {
    const [place, setplace] = useState();
    const [formdata, setFormdata] = useState([]);
    const [dialog, setdialog] = useState(false);
    const handleInputChange = (name, value) => {  // this is the event handler

        if (name == 'noofdays' && value > 5) {
            console.log("please enter a value below 5")
            return;
        }
        setFormdata({ ...formdata, [name]: value })

    }
    useEffect(() => {
        console.log(formdata)
    }, [formdata]);

    const login = useGoogleLogin({
        onSuccess: (coderesp) => console.log(coderesp),
        onError:(error)=>console.log(error)
      });


    const ongeneratetrip = async () => {//this is a method 
        // here we have to check whether the user is already sign in or not 
        const user = localStorage.getItem('user');
        if (!user) {
            setdialog(true);
            return;
        }

        if (formdata?.noofdays > 5 && !formdata?.location || !formdata?.budget || !formdata?.traveller) {
            toast("please fill all the details ")
            return;
        }
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formdata?.location?.label)
            .replace('{totaldays}', formdata?.noofdays)
            .replace('{traveller}', formdata?.traveller)
            .replace('{budget}', formdata?.budget)
            .replace('{totaldays}', formdata?.noofdays)


        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());


    }

    const getuserprofile=()=>{
      axios.get('https://www.googleapis.com/oauth2/v1/userinfo?acess_token')
    }



    return (
        <div className='sm:px-10 md:px-32 lr:px-56 xl:px-10 px-5 mt-10' >
            <h2 className='font-bold text-3xl '>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

            <div className='mt-20 flex flex-col gap-9'>
                <div>
                    <h2 className='text-xl my-3 font-md'> What is destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setplace(v); handleInputChange('location', v) }// onchange is an event so for this it will take a javascript function 
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-md '>How many days are you planning your trip?</h2>
                    <Input placeholder={"ex.3"} type="number"
                        onChange={(e) => handleInputChange('noofdays', e.target.value)}
                    />
                </div>

            </div>

            <div>
                <h2 className='text-xl my-3 font-md'> What is Your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {selectBudgetoption.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                        ${formdata?.budget == item.title && 'shadow-xl border-black'}
                        `}>
                            <h2 className='text-4xl'> {item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>

                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-md'> Who do you plan on traveling with on your next adventure?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveller', item.people)} // here onestep down i have used a condition inside a classname this is some new stuff that i have learned and the way to write the condition is {` ${whatever the condition in this case the condition is fordate?.traveller==items.peopl&&'shadow-xl karana hai'}`}
                            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                        ${formdata?.traveller == item.people && 'shadow-xl border-black'}
                        `}>
                            <h2 className='text-4xl'> {item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>

                        </div>
                    ))}
                </div>
            </div>
            <div className='my-10 justify-end flex'><Button onClick={ongeneratetrip} >generate trip</Button></div>

            <Dialog open={dialog} >
                
                <DialogContent>
                    <DialogHeader>
                        
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            <img src='/logo.svg'/>
                            <h2 className='font-bold mt-7 text-lg'> sign in with google account </h2>
                            <p>sign in to the app with the google authentication security</p>
                            <Button className='mt-5 w-full' onClick={login}>signin with google account 🚀 </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>

    )
}

export default CreateTrip
// now this is the time ot integrate he ai model 
