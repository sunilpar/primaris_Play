import React, { useState, useEffect } from "react";
import subService from "@/backend/sub";
import { Link } from "react-router-dom";
type Props = {
  islogged: boolean;
  ch_id: string;
};

function Subscriberbtn({ islogged, ch_id }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [issubbed, setIssubbed] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        if (islogged) {
          const response = await subService.ifSubbed(ch_id);
          setIssubbed(response);
        }
      } catch (error) {
        console.error("Error while fetching videos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [loading]);

  async function addsub() {
    if (islogged) {
      setLoading(true);
      const response = await subService.addSub(ch_id);
    }
  }
  async function rmsub() {
    if (islogged) {
      setLoading(true);
      const response = await subService.rmsub(ch_id);
    }
  }
  return (
    <>
      {islogged && (
        <>
          {issubbed ? (
            <div className="subbtn  ml-[19.4px] mt-[14.2px] ">
              <button
                onClick={rmsub}
                className="rounded-xl text-black bg-[#c4ab88] p-1.5 font-bold ring-2 "
              >
                Subscribed
              </button>
            </div>
          ) : (
            <div className="subbtn  ml-[19.4px] mt-[14.2px] ">
              <button
                onClick={addsub}
                className="rounded-xl text-black bg-amber-50 p-1.5 font-semibold"
              >
                Subscribe
              </button>
            </div>
          )}
        </>
      )}
      {!islogged && (
        <div className="subbtn  ml-[19.4px] mt-[14.2px] ">
          <Link to={"/login"}>
            <button className="rounded-xl text-black bg-amber-50 p-1.5 font-semibold">
              Subscribe
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Subscriberbtn;
