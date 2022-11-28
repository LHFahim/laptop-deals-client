const { useState, useEffect } = require("react");

const useVerified = (email) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedLoading, setIsVerifiedLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://buy-sell-server-sooty.vercel.app/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsVerified(data.isVerified);
          setIsVerifiedLoading(false);
        });
    }
  }, [email, isVerified]);
  return [isVerified, isVerifiedLoading];
};

export default useVerified;
