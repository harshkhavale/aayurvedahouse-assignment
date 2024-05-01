"use client"
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";

interface PraiseOptionProps {
  text: string;
  handleClick: (text: string) => void;
  isPraised: boolean;
}

const PraiseOption: React.FC<PraiseOptionProps> = ({ text, handleClick, isPraised }) => {
  return (
    <p
      className={`bg-gray-200 cursor-pointer rounded-3xl p-2 flex justify-center font-bold text-center text-xs items-center ${
        isPraised ? "bg-green-300 border-2 border-green-500" : ""
      }`}
      onClick={() => handleClick(text)}
    >
      {text}
    </p>
  );
};

export default function Home() {
  const [modal, setModal] = useState(true);
  const [safety, setSafety] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [recommendation, setRecommendation] = useState(true);
  const [praise, setPraise] = useState<string[]>([]);

  const handleToggle = () => {
    setModal(!modal);
  };

  const handleSafetyChange = (rating: number) => {
    setSafety(rating);
  };

  const handleCommunicationChange = (rating: number) => {
    setCommunication(rating);
  };

  const handleRecommendationChange = (value: boolean) => {
    setRecommendation(value);
  };

  const handlePraiseClick = (selectedPraise: string) => {
    if (praise.includes(selectedPraise)) {
      setPraise(praise.filter((item) => item !== selectedPraise));
    } else {
      setPraise([...praise, selectedPraise]);
    }
  };

  return (
    <main className="flex items-center justify-center p-8">
      {modal && (
        <form className="flex flex-col gap-6">
          <CloseIcon onClick={handleToggle} className="cursor-pointer text-right absolute right-8 top-4" />
          <p className="font-bold text-xl">Leave a review</p>

          <div className="safe flex flex-col gap-2">
            <p className="font-bold">Safety</p>
            <span className="text-sm">How safe did you feel with Trausti?</span>
            <div>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`cursor-pointer ${index < safety ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleSafetyChange(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="communication flex flex-col gap-2">
            <p className="font-bold">Communication</p>
            <span className="text-sm">How easily did you communicate with Trausti?</span>
            <div>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`cursor-pointer ${index < communication ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleCommunicationChange(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="recommendation flex flex-col gap-2">
            <p className="font-bold">Would you recommend Trausti?</p>
            <span className=" text-sm">Would you recommend Trausti to others?.</span>
            <div className="flex gap-4">
              <div className="flex gap-2" onClick={() => handleRecommendationChange(false)}>
                <ThumbDownIcon className={`cursor-pointer ${recommendation ? "text-gray-400" : "text-green-400"}`} />
                <p>No</p>
              </div>
              <div className="flex gap-2" onClick={() => handleRecommendationChange(true)}>
                <ThumbUpIcon className={`cursor-pointer ${!recommendation ? "text-gray-400" : "text-green-400"}`} />
                <p>Yes</p>
              </div>
            </div>
          </div>

          <div className="praise flex flex-col gap-2">
            <p className="font-bold">Praise</p>
            <span className=" text-sm">What did you like most about Trausti?</span>
            <div className="flex gap-4">
              <PraiseOption text="Service" handleClick={handlePraiseClick} isPraised={praise.includes("Service")} />
              <PraiseOption text="Quality" handleClick={handlePraiseClick} isPraised={praise.includes("Quality")} />
              <PraiseOption text="Great Experience" handleClick={handlePraiseClick} isPraised={praise.includes("Great Experience")} />
            </div>
          </div>
          <div className=" flex w-full my-4">
            <button type='button' onClick={()=>handleToggle} className=" border-2 w-full font-bold p-1 border-green-500 bg-green-300">submit</button>
          </div>
        </form>
      )}
    </main>
  );
}
