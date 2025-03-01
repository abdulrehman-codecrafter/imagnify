"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/moongoose";
import User from "../database/models/user.modal";
import { handleError } from "../utils";

// CREATE
export async function createUser(user) {
  try {
    await connectToDatabase();

    console.log("Creating User", user);

    const newUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId }, // Find existing user by Clerk ID
      user,
      { upsert: true, new: true } // Create if not found
    );

    console.log("User created/updated:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId, user) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      return { message: "User not found", success: false };
    }

    await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return { message: "User deleted successfully", success: true };
  } catch (error) {
    handleError(error);
  }
}

// UPDATE USER CREDITS
export async function updateCredits(userId, creditFee) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}