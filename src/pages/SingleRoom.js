import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";

const SingleRoom = () => {
  const { getRoom } = useContext(RoomContext);
  const { slug } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchedRoom = getRoom(slug);
    setRoom(fetchedRoom);
  }, [slug, getRoom]);

  if (!room) {
    return (
      <div className="error">
        <h3>No such room could be found...</h3>
        <Link to="/room" className="btn-primary">
          Back to Room
        </Link>
      </div>
    );
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;
  const [mainImg, ...defaultImg] = images;
  return (
    <>
      <StyledHero img={mainImg}>
        <Banner title={`${name} room`}>
          <Link to="/room" className="btn-primary">
            Back to Room
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((item, index) => {
            return <img key={index} src={item} alt={name} />;
          })}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>price:${price}</h6>
            <h6>size:{size} SQFT</h6>
            <h6>
              Max Capacity:
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}{" "}
            </h6>
            <h6>{pets ? "Pets Allowed" : "No Pets Aloowed"}</h6>
            <h6>
              {breakfast
                ? "Free Breakfast Included "
                : " No FreeBreakFast Breakfast"}
            </h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((item, index) => {
            return <li key={index}>- {item}</li>;
          })}
        </ul>
      </section>
    </>
  );
};

export default SingleRoom;

// Absolutely, let's break it down in a practical and easy-to-understand way:

// Imagine you're building a web page for a hotel booking site. You have a page that shows the details of a single room when a user clicks on it. The URL for each room page might look something like this: `/room/some-room-slug`.

// Now, let's explain the code step by step:

// 1. **Use of `useEffect`**:
//    - `useEffect` is like a special function in React that runs at specific times. It's often used for tasks like fetching data when the page loads.
//    - In your code, it's saying, "Hey React, please do something when these things change: `slug` and `getRoom`."

// 2. **`slug` and `getRoom`**:
//    - `slug` is like a unique ID for each room. For example, `some-room-slug` might represent a particular room.
//    - `getRoom` is a function that knows how to fetch the details of a room using its `slug`. Think of it as a function that can get you all the information about a room if you give it the room's `slug`.

// 3. **Fetching Room Data**:
//    - Inside the `useEffect`, there's a line that goes like this: `const fetchedRoom = getRoom(slug);`
//    - This line says, "Go ahead, use the `getRoom` function to get all the information about the room with the `slug` that's in the URL right now."
//    - It's as if you're asking the hotel database for all the details about the room with the current `slug` from the URL.

// 4. **Updating the Room**:
//    - Then, there's another line: `setRoom(fetchedRoom);`
//    - This line says, "Okay, React, now that I have all the information about the room, please update the `room` variable so we know all about it."
//    - It's like taking the information you got from the hotel database and storing it in your web page.

// 5. **Dependency Array**:
//    - The square brackets `[slug, getRoom]` at the end of `useEffect` are like a list of things that should make React run this code again.
//    - So, if the `slug` in the URL changes (if you click on a different room), or if the `getRoom` function changes (if it gets updated somehow), React will run this code again to make sure the displayed room matches the new `slug` or `getRoom` function.

// 6. **Conditional Rendering**:
//    - Finally, there's a check: `if (!room) {...}`
//    - This part checks if there's actually a room to show. If `room` is still `null`, it means the data is being fetched or there's an issue.
//    - In that case, it displays a message like "No such room could be found..." and a button to go back to the room list.

// So, in practical terms, this code is making sure that when you click on a room's link, it loads the correct room's details and displays them on the page. If there's a delay in fetching the data, it shows a loading message. If the room doesn't exist, it shows an error message. Once the room data is ready, it displays the room details on the page.
