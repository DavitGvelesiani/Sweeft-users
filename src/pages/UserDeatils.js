import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserDetails(){
    const params = useParams();
    console.log(params.userId);

    const [userdata, setUserdata] = useState([]);

    const [userFriends, setUserFriends] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevY, setPrevY] = useState(0);
    let usersRef = useRef({});

    let loadingRef = useRef(null);
    let prevYRef = useRef({});
    let pageRef = useRef({});
    usersRef.current = userFriends;
    pageRef.current = page;

    prevYRef.current = prevY;

    useEffect(() => {
        getUserInfo();
        getUserFriends();
        setPage(pageRef.current + 1);

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(loadingRef.current);
    }, []);

    const getUserInfo = async () => {
        const response = await fetch(
            `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.userId}`
        );

        if (!response.ok) {
        throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        setUserdata(responseData);

    }
    
    const handleObserver = (entities, observer) => {
    
        const y = entities[0].boundingClientRect.y;
    
        if (prevYRef.current > y) {
          getUserFriends();
          setPage(pageRef.current + 1);
        } else {
          console.log("conditional is false");
        }
        console.log("currenty: ", y, "prevY: ", prevY);
        setPrevY(y);
      };

    const getUserFriends = async () => {
        const response = await fetch(
            `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.userId}/friends/${pageRef.current}/30`
        );

        if (!response.ok) {
        throw new Error('Something went wrong!');
        }

        const loadedUsers = [];
        const responseData = await response.json();
        loadedUsers.push(...responseData.list);
        
        setUserFriends([...usersRef.current, ...loadedUsers]);
    }

    
    
    return (
        <React.Fragment>
            <div>
                <img src={userdata.imageUrl}/>
                <div>
                    <h2>info</h2>
                    <h1>{userdata.prefix} {userdata.name} {userdata.lastName}</h1>
                    <p>{userdata.title}</p>
                    <p>Email: {userdata.email}</p>
                    <p>Ip Adress: {userdata.ip}</p>
                    <p>Job Area: {userdata.jobArea}</p>
                    <p>Job Type: {userdata.jobType}</p>
                </div>
            </div>
            <div>
                {userFriends.map((user) => (
                    <Link to={`/${user.id}`} key={user.id}>                       
                        <img src={user.imageUrl} height="150px" width="200px" />
                        <h2>{user.prefix} {user.name} {user.lastName}</h2>
                        <p>{user.title}</p>
                    </Link>
                    
                ))}
            </div>
             <div
                ref={loadingRef}
                style={{ height: "100px", margin: "25px", background: "violet" }}
            >
                <span style={{ display: loading ? "block" : "none" }}>Loading...</span>
            </div> 
        </React.Fragment>
    );

}

export default UserDetails;