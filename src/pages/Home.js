
import { useRef, useEffect, useState } from "react";

function Home(){

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevY, setPrevY] = useState(0);
    let usersRef = useRef({});

    let loadingRef = useRef(null);
    let prevYRef = useRef({});
    let pageRef = useRef({});
    usersRef.current = users;
    pageRef.current = page;

    prevYRef.current = prevY;

    useEffect(() => {
        getUsers();
        setPage(pageRef.current + 1);

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(loadingRef.current);
    }, []);

    const handleObserver = (entities, observer) => {
    
        const y = entities[0].boundingClientRect.y;
    
        if (prevYRef.current > y) {
          getUsers();
          setPage(pageRef.current + 1);
        } else {
          console.log("conditional is false");
        }
        console.log("currenty: ", y, "prevY: ", prevY);
        setPrevY(y);
      };

    const getUsers = async () => {
        const response = await fetch(
            `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageRef.current}/20`
        );

        if (!response.ok) {
        throw new Error('Something went wrong!');
        }

        const loadedUsers = [];
        const responseData = await response.json();
        loadedUsers.push(...responseData.list);
        
        setUsers([...usersRef.current, ...loadedUsers]);
    }


    return (
        <div>
        
    </div>
    );

}

export default Home;