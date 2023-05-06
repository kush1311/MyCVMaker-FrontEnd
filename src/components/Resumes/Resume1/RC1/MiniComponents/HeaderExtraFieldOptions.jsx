import { PlusIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { Context } from "../../../../GlobalContextApi/GlobalContextApi";

const P = () => {
  return (
    <span className='w-4 mr-1'>
      <PlusIcon />
    </span>
  );
};
const ExtraFields = [
  "Behance",
  "Discord",
  "Dribbble",
  "Email",
  "Facebook",
  "GitHub",
  "Google",
  "Instagram",
  "Line",
  "Linkedin",
  "Mastodon",
  "Medium",
  "Messenger",
  "Phone",
  "Paypal",
  "Pinterest",
  "Quora",
  "Reddit",
  "Signal",
  "Skype",
  "Slack",
  "Snapchat",
  "Spotify",
  "Stack-Overflow",
  "Strava",
  "Telegram",
  "Twitch",
  "Twitter",
  "Vimeo",
  "Whatsapp",
  "Wordpress",
  "Youtube",
];
export default function HeaderExtraField() {
  const api = useContext(Context);
  const clickHandler = (name) => {
    api.addHeaderExtraField(name);
  };
  return (
    <div>
     
      <div className='my-1 flex flex-wrap'>
        {ExtraFields.map((name) => {
          return (
            <button
              onClick={() => clickHandler(name)}
              className='flex mx-2 my-2 px-2 py-1 text-white rounded bg-blue-500 border-2 border-blue-900'>
              <P />
              <span className='my-auto'>{name}</span>
            </button>
          );
        })}
      </div>
      <p className="text-justify"> <strong> * Couldn't find your option ? Use custom link given below !</strong> </p>
      <button
        onClick={() => clickHandler("CustomLink")}
        className='flex mx-2 my-2 px-2 py-1 text-white rounded bg-blue-500 border-2 border-blue-900'>
        <P />
        <span className='my-auto'>Link</span>
      </button>
    </div>
  );
}
