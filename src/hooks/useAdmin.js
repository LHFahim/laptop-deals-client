const { useState, useEffect } = require("react");

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://laptop-deals-server.vercel.app/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsAdmin(data.isAdmin);
          setIsAdminLoading(false);
        });
    }
  }, [email, isAdmin]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
