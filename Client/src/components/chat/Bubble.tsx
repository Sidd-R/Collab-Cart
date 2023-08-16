import * as React from "react";

type BubbleProps = {
  username?: string;
  value: string;
  isYou?: boolean;
};

const Bubble: React.FC<BubbleProps> = ({ username, value, isYou }) => {
  return (
    <>
      {isYou ? (
        <div className="flex justify-end">
          <div className="max-w-[70%] bg-blue-500 text-white rounded-lg p-2 mb-2 text-sm">
            {value}
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div className="flex flex-col max-w-[70%]">
            <h6 className="text-xs font-semibold mb-1 text-gray-500">{username}</h6>
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3 mb-2 text-sm">
              <p>{value}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bubble;
