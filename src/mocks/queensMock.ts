import { Types } from "mongoose";

export const queensMock = [
  {
    name: "Sasha Velour",
    age: 29,
    rank: "1",
    season: 9,
    hometown: "Brooklyn, NY",
    image: "sasha.png",
    user: "646fa7714d45f035f1b50db1",
  },
  {
    name: "Nina West",
    age: 39,
    rank: "6",
    season: 11,
    hometown: "Columbus, OH",
    image: "nina.png",
    user: "646fa7714d45f035f1b50db1",
  },
];

export const queensMockWithID = [
  {
    name: "Sasha Velour",
    age: 29,
    rank: 1,
    season: 9,
    hometown: "Brooklyn, NY",
    image: "sasha.png",
    user: "646fa7714d45f035f1b50db1",
    _id: new Types.ObjectId().toString(),
  },
  {
    name: "Nina West",
    age: 39,
    rank: 6,
    season: 11,
    hometown: "Columbus, OH",
    image: "nina.png",
    user: "646fa7714d45f035f1b50db1",
    _id: new Types.ObjectId().toString(),
  },
];
