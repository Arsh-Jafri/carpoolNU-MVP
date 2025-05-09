import React, { useState } from 'react';
import { matchList } from '../sample_carpool_data.ts';
import { ThumbsUp, ThumbsDown, MapPin } from 'lucide-react';

const iconBoxStyle =
  'flex items-center justify-center w-16 h-16 rounded-xl border border-gray-200 bg-white transition-colors hover:bg-blue-50 cursor-pointer mx-2';

const iconStyle = 'w-8 h-8 text-blue-600';

const CarpoolMatcher: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches] = useState(matchList);

  const handleAccept = () => {
    console.log('Accepted match with:', matches[currentIndex]);
    moveToNextMatch();
  };

  const handleReject = () => {
    console.log('Rejected match with:', matches[currentIndex]);
    moveToNextMatch();
  };

  const moveToNextMatch = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (matches.length === 0 || currentIndex >= matches.length) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700">No more matches!</h2>
          <p className="text-gray-500 mt-2">Check back later for new carpool opportunities.</p>
        </div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center w-full">
          <div className="w-full">
            <div className="mb-2">
              <span className="block text-5xl font-black text-gray-900 leading-tight">
                {currentMatch.firstName} {currentMatch.lastName}
              </span>
              <span className="block text-2xl text-gray-700 mt-2 mb-6 font-normal">
                {currentMatch.employer}
              </span>
            </div>

            <div className="mb-6">
              <div className="mb-4">
                <div className="font-bold text-xl text-gray-900">From:</div>
                <div className="text-xl text-gray-900 mt-1">{currentMatch.startLocation}</div>
                <div className="text-gray-400 text-lg mt-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {currentMatch.startDistanceDelta} miles
                </div>
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">To:</div>
                <div className="text-xl text-gray-900 mt-1">{currentMatch.endLocation}</div>
                <div className="text-gray-400 text-lg mt-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {currentMatch.endDistanceDelta} miles
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={handleAccept}
              className={iconBoxStyle}
              aria-label="Approve match"
            >
              <ThumbsUp className={iconStyle} />
            </button>
            <button
              onClick={handleReject}
              className={iconBoxStyle}
              aria-label="Reject match"
            >
              <ThumbsDown className={iconStyle} />
            </button>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-500">
          {currentIndex + 1} of {matches.length}
        </div>
      </div>
    </div>
  );
};

export default CarpoolMatcher; 