import React, {useEffect, useState} from 'react';

function Administrator() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/administrator');
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Administrator</div>
      {admin && (
        <>
          <p>Admin ID: {admin.admin[0].name}</p>
          <p>Number of products: {admin.products.length}</p>
        </>
      )}
    </>
  )
}

export default Administrator;