import React from "react";
import { Component } from "react";
import items from "./data";
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  componentDidMount() {
    //THIS.GET DATA
    //IT TAKES ARGUMENTS FROM DATA (ITEM)
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }
  // IT SENDS PARAMETERS AND LOOP THROUGHT THE ITEMS
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRoom
    );
  };
  filterRoom = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;
    //ALL THE ROOMS
    let tempRooms = [...rooms];
    //TRANSFORM THE VALUE
    capacity = parseInt(capacity);
    price = parseInt(price);
    //FILTER BY TYPE
    if (type !== "all") {
      tempRooms = tempRooms.filter((item) => item.type === type);
    }
    //FILTER BY CAPACITY
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((item) => item.capacity >= capacity);
    }
    //FILTER BY PRICE
    tempRooms = tempRooms.filter((item) => item.price <= price);
    //FILTER BY SIZE
    tempRooms = tempRooms.filter(
      (item) => item.size >= minSize && item.size <= maxSize
    );
    //FILTER BY BREAKFAST
    if (breakfast) {
      tempRooms = tempRooms.filter((item) => item.breakfast === true);
    }
    //FILTER BY PETS
    if (pets) {
      tempRooms = tempRooms.filter((item) => item.pets === true);
    }
    //CHANGE THE STATE
    this.setState({
      sortedRooms: tempRooms,
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function WithConsumer(Component) {
  return function ConsumerWraper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomContext, RoomConsumer };
