import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Task from "./models/Task";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('tasks');
  } catch (error) {
    console.error('Collections were not present, skipping drop');
  }

  const [vaderUser, legolasUser, benUser] =  await User.create(
    {
      username: "Darth Vader",
      password: "1234",
      token: crypto.randomUUID(),
    },
    {
      username: "Legolas",
      password: "1111",
      token: crypto.randomUUID(),
    },
    {
      username: "Ben Stiller",
      password: "4321",
      token: crypto.randomUUID(),
    },
  );

  await Task.create(
    {
      user: vaderUser._id,
      title: "Become stronger",
      description: "Sleeeeeeeep",
      status: "new"
    },
    {
      user: legolasUser._id,
      title: "Clear the quiver",
      status: "new"
    },
    {
      user: benUser._id,
      title: "Rewatch Night at the Museum",
      status: "new"
    },
  );

  await db.close();
};

run().catch(console.error);