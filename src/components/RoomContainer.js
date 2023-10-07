import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { WithConsumer } from "../context";
import Spinner from "../components/Spinner";

const RoomContainer = ({ context }) => {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
};

export default WithConsumer(RoomContainer);
