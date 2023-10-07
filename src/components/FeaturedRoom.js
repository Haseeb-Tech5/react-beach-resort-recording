import React, { Component } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
import Room from "./Room";
import Spinner from "./Spinner";

export default class FeaturedRoom extends Component {
  static contextType = RoomContext;

  render() {
    let { loading, featuredRooms: rooms } = this.context;
    rooms = rooms.map((room) => {
      return <Room key={room.id} room={room} />;
    });

    return (
      <section className="featured-rooms">
        <Title title="Featured Rooms" />
        <div className="featured-rooms-center">
          {/* BEACUSE LOADING IS FALSE SO IT SHOWS DATA ABOUT ROOM AND WHEN LOADING
          IS TRUE IT SHOWS SPINNER */}
          {loading ? <Spinner /> : rooms}
        </div>
      </section>
    );
  }
}
